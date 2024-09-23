import * as esbuild from 'esbuild';
import commandLineArgs from 'command-line-args';
import { join } from 'node:path';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const optionsDef = [
    { name: 'cmd', alias: 'c', type: String },
    { name: 'outFile', alias: 'o', type: String },
    { name: 'srcFile', alias: 's', type: String },
    { name: 'name', alias: 'n', type: String },
    { name: 'help', alias: 'h', type: String },
];

const pureJsHarnessRoot = './harness/pureJs/';
const pureJsHarnessBundlesRoot = join(pureJsHarnessRoot, '.bundles/');
const scriptTsPath = join(
    '.tools/esbuild/pureJs/templates',
    'script.ts_template'
);
const pureJsAppRoot = join('mock-interviews', 'pureJs');

const createPureJsSnippet = (options) => {
    const appTemplate = readFileSync(scriptTsPath, { encoding: 'utf8' });
    const snippetName = options.name;
    const snippetFolder = join(pureJsAppRoot, snippetName);
    mkdirSync(snippetFolder);
    writeFileSync(join(snippetFolder, 'script.ts'), appTemplate);
    writeFileSync(join(snippetFolder, 'styles.css'), '');
};

const getCtx = (options) => {
    return esbuild.context({
        entryPoints: [options.srcFile],
        bundle: true,
        minify: false,
        sourcemap: true,
        loader: { '.js': 'jsx' },
        // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        target: ['chrome98'],
        outfile: join(pureJsHarnessBundlesRoot, 'script.js'),
    });
};

const watch = async (options) => {
    const ctx = await getCtx(options);
    await ctx.watch();
};

const serve = async (options) => {
    const ctx = await getCtx(options);
    await ctx.serve({
        host: 'localhost',
        port: 8080,
        servedir: pureJsHarnessRoot,
    });
};

const build = async (options) => {
    return esbuild.build({
        entryPoints: [options.srcFile],
        bundle: true,
        minify: false,
        sourcemap: true,
        loader: {
            '.js': 'jsx',
            '.ts': 'tsx',
        },
        // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        target: ['chrome98'],
        outfile: join(pureJsHarnessBundlesRoot, 'script.js'),
    });
};

const main = async () => {
    const options = commandLineArgs(optionsDef);
    switch (options.cmd) {
        case 'create':
            createPureJsSnippet(options);
            break;
        case 'build':
            await build(options);
            break;
        case 'watch':
            await watch(options);
            break;
        case 'serve':
            await serve(options);
            break;
        default:
            console.log(`
                usage:: ./.tools/esbuild/pureJs/cli -cmd [cmd] --outFile [outfile] --srcFile [src file Path]

                [cmd] : build | watch | server | help

            `);
    }
};

main();
