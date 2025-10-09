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

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: nextDir });
const nextHandler = nextApp.getRequestHandler();

await nextApp.prepare();

// ✅ Mount Next.js SSR di /app-next
app.use("/app-next", (req, res) => nextHandler(req, res));

// serve file static root
app.use(express.static(path.join(__dirname, "public")));

// serve microfrontend react
app.use("/app-react", express.static(path.join(__dirname, "../app-react/dist")));

// serve microfrontend vue
app.use("/app-vue", express.static(path.join(__dirname, "../app-vue/dist")));

// ✅ fallback ke index.html (Express v5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Root app running at http://localhost:${PORT}`);
});
