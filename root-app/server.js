import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9000;

// === NEXT.JS SSR CONFIG ===
const nextDir = path.join(__dirname, "../app-next");
const requireFromNext = createRequire(path.join(nextDir, "package.json"));
const next = requireFromNext("next");

// Detect mode
const dev = process.env.NODE_ENV !== "production";

// 💡 Disable tracing in dev mode (Windows EPERM fix)
if (dev) {
  process.env.NEXT_DISABLE_TRACING = "1";
  console.log("🔧 Dev mode detected: Next.js tracing disabled to prevent EPERM errors.");
}

const nextApp = next({ dev, dir: nextDir });
const nextHandler = nextApp.getRequestHandler();

await nextApp.prepare();

// ✅ Mount Next.js SSR di /app-next
app.use("/app-next", (req, res) => nextHandler(req, res));

// Serve file static root
app.use(express.static(path.join(__dirname, "public")));

// Serve microfrontend React
app.use("/app-react", express.static(path.join(__dirname, "../app-react/dist")));

// Serve microfrontend Vue
app.use("/app-vue", express.static(path.join(__dirname, "../app-vue/dist")));

// ✅ Fallback ke index.html (Express v5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Root app running at http://localhost:${PORT}`);
  console.log(`🔹 Next.js is running in ${dev ? "development" : "production"} mode at /app-next`);
});
