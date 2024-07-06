import * as esbuild from 'esbuild';
import commandLineArgs from 'command-line-args';
import { join } from 'path';

const optionsDef = [
    { name: 'cmd', alias: 'c', type: String },
    { name: 'outFile', alias: 'o', type: String },
    { name: 'srcFile', alias: 's', type: String },
    { name: 'help', alias: 'h', type: String },
];

const reactHarnessRoot = './react-harness/';
const reactHarnessBundlesRoot = join(reactHarnessRoot, '.bundles/');

const getCtx = (options) => {
    return esbuild.context({
        entryPoints: [options.srcFile],
        bundle: true,
        minify: false,
        sourcemap: true,
        loader: { '.js': 'jsx' },
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
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
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        outfile: join(reactHarnessBundlesRoot, 'app.js'),
    });
};

const main = async () => {
    const options = commandLineArgs(optionsDef);
    switch (options.cmd) {
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
