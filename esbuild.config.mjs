import esbuild from "esbuild";
import serve, { error, log } from "@btwiuse/serve";

const isDevServer = process.argv.includes("--dev");

esbuild
  .build({
    entryPoints: [
	    //"src/index.tsx"
	    "packages/apps/src/index.tsx"
    ],
    bundle: true,
    outfile: "www/bundle.js",
    loader: {
      ".md": "file",
      ".svg": "dataurl",
      ".png": "file",
      ".gif": "file",
      ".ttf": "file",
      ".woff": "file",
      ".woff2": "file",
      ".eot": "file",
    },
    minify: !isDevServer,
    sourcemap: true,
    //platform: 'node',
    incremental: isDevServer,
    target: ["chrome58", "firefox57", "safari11", "edge18"],
    inject: [
      //"import-meta-url.mjs"
      //"import-meta-url.js"
    ],
    define: {
      "import.meta": true,
      "import.meta.url": "'https://fuck.it'",
      "process.env.NODE_ENV": isDevServer ? '"development"' : '"production"',
      "process.env.WS_URL": '""',
    },
    watch: isDevServer && {
      onRebuild(err) {
        serve.update();
        err ? error("❌ Failed") : log("✅ Updated");
      },
    },
  })
  .catch(() => process.exit(1));

if (isDevServer) {
  serve.start({
    port: 5000,
    root: "./www",
    live: true,
  });
}
