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
      ".md": "text",
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
      "process.env.WS_URL": '""',
      "process.env.NODE_ENV": isDevServer ? '"development"' : '"production"',
      "process.env.HUB_WS_URL": isDevServer ? '"ws://localhost:8000"' : '"wss://subshell.herokuapp.com"',
      "process.env.SUBSH_CMD": isDevServer ? '["subsh"]' : '["subsh-loop"]',
      "process.env.DENO_CMD": isDevServer ? '["deno", "repl"]' : '["subsh-deno"]',
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
