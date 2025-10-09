import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9000;

// Next.js config
const nextDir = path.join(__dirname, "../app-next");
const requireFromNext = createRequire(path.join(nextDir, "package.json"));
const next = requireFromNext("next");

const dev = process.env.NODE_ENV !== "production";

// Disable tracing di dev mode (Windows EPERM)
if (dev) {
  process.env.NEXT_DISABLE_TRACING = "1";
  console.log("🔧 Dev mode detected: tracing disabled.");
}

const nextApp = next({ dev, dir: nextDir });
const nextHandler = nextApp.getRequestHandler();

await nextApp.prepare();

// Mount Next.js di root, tanpa basePath
// Dev or Production: Next.js mount
app.all(/.*/, (req, res) => nextHandler(req, res));


// Static file / SPA fallback
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Root app running at http://localhost:${PORT}`);
  console.log(`🔹 Next.js running in ${dev ? "development" : "production"} mode`);
});
