import * as esbuild from 'esbuild';
import commandLineArgs from 'command-line-args';
import { join } from 'node:path';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const optionsDef = [
    { name: 'cmd', alias: 'c', type: String },
    { name: 'outFile', alias: 'o', type: String },
    { name: 'srcFile', alias: 's', type: String },
    { name: 'name', alias: 'n', type: String },
    { name: 'help', alias: 'h', type: String },
];

const ngHarnessRoot = './harness/angular/';
const ngHarnessBundlesRoot = join(ngHarnessRoot, '.bundles/');

const appTsxPath = join('.tools/esbuild/ng/templates', 'app.ts_template');
const ngAppRoot = join('mock-interviews', 'angular');

const createNgSnippet = (options) => {
    const appTemplate = readFileSync(appTsxPath, { encoding: 'utf8' });
    const snippetName = options.name;
    const snippetFolder = join(ngAppRoot, snippetName);
    mkdirSync(snippetFolder);
    writeFileSync(join(snippetFolder, 'app.ts'), appTemplate);
    writeFileSync(join(snippetFolder, 'app.css'), '');
};

const getCtx = (options) => {
    return esbuild.context({
        entryPoints: [options.srcFile],
        bundle: true,
        minify: false,
        sourcemap: true,
        // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        target: ['chrome98'],
        outfile: join(ngHarnessBundlesRoot, 'app.js'),
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
        servedir: ngHarnessRoot,
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
        outfile: join(ngHarnessBundlesRoot, 'app.js'),
    });
};

const main = async () => {
    const options = commandLineArgs(optionsDef);
    switch (options.cmd) {
        case 'create':
            createNgSnippet(options);
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
                usage:: ./.tools/esbuild/react/cli -cmd [cmd] --outFile [outfile] --srcFile [src file Path]

                [cmd] : build | watch | server | help

            `);
    }
};

main();
