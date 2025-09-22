import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9000;

// serve file static root
app.use(express.static(path.join(__dirname, "public")));

// serve microfrontend react
app.use("/app-react", express.static(path.join(__dirname, "../app-react/dist")));

// serve microfrontend vue
app.use("/app-vue", express.static(path.join(__dirname, "../app-vue/dist")));

// serve microfrontend nextjs
app.use("/app-next", express.static(path.join(__dirname, "../app-next/out")));

// fallback ke index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(PORT, () => {
    console.log(`Root app running at http://localhost:${PORT}`);
});
