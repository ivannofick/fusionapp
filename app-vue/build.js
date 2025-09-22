import esbuild from "esbuild";

esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    format: "esm",
    outfile: "dist/app-vue.js"
}).catch(() => process.exit(1));
