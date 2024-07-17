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

const reactHarnessRoot = './harness/react/';
const reactHarnessBundlesRoot = join(reactHarnessRoot, '.bundles/');
const appTsxPath = join('.tools/esbuild/react/templates', 'app.tsx_template');
const reactAppRoot = join('mock-interviews', 'react');

const createReactSnippet = (options) => {
    const appTemplate = readFileSync(appTsxPath, { encoding: 'utf8' });
    const snippetName = options.name;
    const snippetFolder = join(reactAppRoot, snippetName);
    mkdirSync(snippetFolder);
    writeFileSync(join(snippetFolder, 'app.tsx'), appTemplate);
    writeFileSync(join(snippetFolder, 'app.css'), '');
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
        outfile: join(reactHarnessBundlesRoot, 'app.js'),
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
        servedir: reactHarnessRoot,
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
        outfile: join(reactHarnessBundlesRoot, 'app.js'),
    });
};

const main = async () => {
    const options = commandLineArgs(optionsDef);
    switch (options.cmd) {
        case 'create':
            createReactSnippet(options);
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
