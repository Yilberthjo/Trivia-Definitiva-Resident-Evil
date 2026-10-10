import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const SCORES_FILE = path.join(DATA_DIR, "scores.json");
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.warn("Could not initialize local data directory, fallback to in-memory:", err);
}
function loadScores() {
  try {
    if (fs.existsSync(SCORES_FILE)) {
      const data = fs.readFileSync(SCORES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading scores file:", err);
  }
  return [];
}
function saveScores(scores2) {
  try {
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores2, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving scores file:", err);
  }
}
let scores = loadScores();
const sseClients = [];
function broadcastScoreUpdate(newRecord) {
  const payload = JSON.stringify({ type: "NEW_SUBMISSION", record: newRecord });
  sseClients.forEach((client) => {
    try {
      client.write(`data: ${payload}

`);
    } catch {
    }
  });
}
async function startServer() {
  const app = express();
  const isDev = process.env.npm_lifecycle_event === "dev";
  const PORT = isDev ? 3e3 : parseInt(process.env.PORT || "3000", 10);
  const distPath = path.join(__dirname, "dist");
  const distExists = fs.existsSync(path.join(distPath, "index.html"));
  const isProduction = distExists && !isDev;
  app.use(express.json());
  app.get(["/healthz", "/_healthz", "/api/health", "/ping"], (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime(), time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.get("/api/scores", (req, res) => {
    res.json({ scores });
  });
  app.post("/api/scores", (req, res) => {
    const {
      username,
      score,
      totalAnswered,
      percentage,
      rank,
      rankTitle,
      gameMode,
      correctQuestionIds,
      incorrectQuestionDetails
    } = req.body;
    if (!username || typeof username !== "string" || !username.trim()) {
      res.status(400).json({ error: "Username is required" });
      return;
    }
    const newRecord = {
      id: `score_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      username: username.trim(),
      score: Number(score) || 0,
      totalAnswered: Number(totalAnswered) || 0,
      percentage: Number(percentage) || 0,
      rank: rank || "C",
      rankTitle: rankTitle || "Superviviente",
      gameMode: gameMode || "Marat\xF3n 100",
      correctQuestionIds: Array.isArray(correctQuestionIds) ? correctQuestionIds : [],
      incorrectQuestionDetails: Array.isArray(incorrectQuestionDetails) ? incorrectQuestionDetails : [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    scores.unshift(newRecord);
    if (scores.length > 200) {
      scores = scores.slice(0, 200);
    }
    saveScores(scores);
    broadcastScoreUpdate(newRecord);
    res.status(201).json({ success: true, record: newRecord });
  });
  app.get("/api/scores/live", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    res.write(`data: ${JSON.stringify({ type: "SNAPSHOT", scores })}

`);
    sseClients.push(res);
    req.on("close", () => {
      const idx = sseClients.indexOf(res);
      if (idx !== -1) {
        sseClients.splice(idx, 1);
      }
    });
  });
  app.delete("/api/scores/:id", (req, res) => {
    const { id } = req.params;
    scores = scores.filter((s) => s.id !== id);
    saveScores(scores);
    res.json({ success: true });
  });
  if (isProduction) {
    app.use(express.static(distPath, { index: "index.html" }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: false
        },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn("Vite middleware could not be loaded, using static if available:", err);
      if (distExists) {
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
          res.sendFile(path.join(distPath, "index.html"));
        });
      }
    }
  }
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Resident Evil Trivia Server running on http://0.0.0.0:${PORT} [${isProduction ? "PRODUCTION" : "DEV"}]`);
  });
  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
