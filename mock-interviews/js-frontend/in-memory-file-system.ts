/**
 * Implement a simple in-memory filesystem library in JavaScript that supports the following functionalities.

createDirectory(name) – Creates a new directory at the current path.
changeDirectory(path) – Changes the directory path.
addFile(name) – Adds a new file at the current path.
deleteFile(name) – Deletes the file with given name at the current path.
deleteDirectory(name) – Deletes the directory with given name at the given path.
getRootDirectory – Returns the root directory and all its nested childs.
getCurDirectory – Returns the items of current directory.
getCurDirectoryPath – Returns the path of the current directory.
 */

/**
 *
 * Design :
 *
 *   We need to come up with a data structure to store files.
 *   trees is the natural choice for storing directory structure
 *
 *  we can use a object / map
 *      root
 *    /      \
 *  dir-1    dir2
 *  /
 * file-1
 *
 *  leaf will be of type string
 *  dir is of type obj / map.
 *
 *  root: {
 *    dir1: {
 *       '__name__': 'dir1`,
 *       '.' : this,
 *       '..': root,
 *      ['file-1.txt']: 'content of file-1'
 *      dir2: {
 *       parent: dir1,
 *     }
 *   },
 * }
 *
 * need to come up with navigation :
 *
 *  - will need curWorking dir to be stored and upto date
 *  - we might need to navigate upward if the path contains ../
 *      - we will need to maintain parent information for easy navigation
 *
 *  - root is already created when directory structure is created.
 *  - cwd is root.
 *
 *  CreateDirectory :
 *    input : path
 *    validation: lets assume paths are valid and in case there is few
 *                folders in the path missing  we will auto create
 *    workflow:
 *          - resolve the path , cwd & path navigate and as we navigate if no dir create dir
 *
 *  resolve(path, createIfMissing): node/null
 *      - cwd is always node. take the path if it start with
 *      - startDir = cwd or root (if path start with /)
 *      - special cases
 *              `..`  startDir move one level
 *              `.` : starDir itself (no-op)
 *              `dirname/fileName` starDir[dirname/FileName]
 *
 */

interface IDirectory {
    ['__name__']: string;
    ['/']: IDirectory; // for easy navigation lets have root access as well from any dir
    ['.']: IDirectory;
    ['..']: IDirectory;
    [k: string]: IDirectory | string;
}

interface IFileSystem {
    createDirectory(path: string): void;
    deleteDirectory(path: string): void;
    changeDirectory(path: string): void;
    addFile(fileName: string, content: string): void;
    getFile(fileName: string): string | null;
    deleteFile(fileName: string): void;
    getRootDirectory(): IDirectory;
    getCurDirectory(): IDirectory;
    getCurDirectoryPath(): string;
}

const createDirectory = (
    name: string,
    parent: IDirectory | null,
    root?: IDirectory | null
): IDirectory => {
    return {
        ['__name__']: name,
        get ['.']() {
            return this;
        },
        get ['/']() {
            return root ? root : this;
        },
        ['..']: parent,
    } as IDirectory;
};

const getPath = (node: IDirectory): string => {
    const path = [];
    while (node) {
        path.unshift(node.__name__);
        node = node['..'];
    }
    return path.join('/');
};
class FileSystem implements IFileSystem {
    #root: IDirectory = createDirectory('root', null);
    #cwd: IDirectory = this.#root;

    /**
     * return IDirectory if path is dir & found
     * returns string if path is a filename & found
     * if not found null.
     */
    private resolvePath(
        path: string,
        createMissing: boolean
    ): IDirectory | string | null {
        const paths = path.split('/');
        let node: IDirectory = this.#cwd;
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i] || '/'; // if paths starts will `/` split will remove it hence add it
            if (!node[path]) {
                if (!createMissing) return null;
                // we need to create the missing paths.
                node[path] = createDirectory(path, node, this.#root);
            }
            if (typeof node[path] === 'string') {
                // making an assumption that we will not have dir & file with same name.
                // if node[path] is a string , we are at leaf.
                return node[path];
            }
            node = node[path] as IDirectory;
        }
        return node;
    }

    public createDirectory(path: string): void {
        this.resolvePath(path, true); // create if missing
    }

    public changeDirectory(path: string): void {
        const node = this.resolvePath(path, false); // create if missing
        if (node && typeof node === 'object') {
            this.#cwd = node;
        }
    }

    public deleteDirectory(path: string): void {
        const node = this.resolvePath(path, false);
        if (node && typeof node === 'object') {
            if (node.__name__ === 'root') {
                throw new Error('cannot delete root');
            }
            /**
             * if cwd was deleted then we will need to move
             */
            const nodePath = getPath(node);
            const cwdPath = getPath(this.#cwd);
            if (cwdPath === nodePath) {
                this.#cwd = this.#root;
            }
            delete node['..'][node.__name__];
        }
    }

    /**
     * Create a file at current working dir.
     */
    public addFile(fileName: string, content: string): void {
        if (this.#cwd[fileName]) {
            throw new Error('file or dir with name already exists');
        }
        this.#cwd[fileName] = content;
    }

    /**
     * get a file at current working dir.
     */
    public getFile(fileName: string): string | null {
        const res = this.#cwd[fileName];
        return typeof res === 'string' ? res : null;
    }

    deleteFile(fileName: string): void {
        delete this.#cwd[fileName];
    }

    public getRootDirectory(): IDirectory {
        /**
         * For now expose all the internals, but we should not do this ,
         * TODO: for sake of time
         */
        return this.#root;
    }

    public getCurDirectory(): IDirectory {
        return this.#cwd;
    }

    public getCurDirectoryPath(): string {
        return getPath(this.#cwd);
    }
}

const fs = new FileSystem();
fs.addFile('test.txt', '1234');
fs.createDirectory('./dir1/dir2');
fs.changeDirectory('./dir1/dir2');
fs.addFile('test-file-2', 'abcde');
console.log('current working directory', fs.getCurDirectoryPath());
console.log(fs.getRootDirectory());

fs.deleteFile('test-file-2');
console.log(fs.getRootDirectory());

console.log('current working directory', fs.getCurDirectoryPath());
fs.changeDirectory('/');
console.log('current working directory', fs.getCurDirectoryPath());

fs.deleteDirectory('/dir1');
console.log(fs.getRootDirectory());
