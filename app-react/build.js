import esbuild from "esbuild";

esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    format: "esm",
    outfile: "dist/app-react.js",
    loader: { ".js": "jsx" }
}).catch(() => process.exit(1));
