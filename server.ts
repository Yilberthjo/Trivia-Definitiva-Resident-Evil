import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ScoreRecord {
  id: string;
  username: string;
  score: number;
  totalAnswered: number;
  percentage: number;
  rank: string;
  rankTitle: string;
  gameMode: string;
  correctQuestionIds: number[];
  incorrectQuestionDetails: {
    questionId: number;
    questionTitle: string;
    selectedOptionText: string;
    correctOptionText: string;
    category: string;
  }[];
  createdAt: string;
}

const DATA_DIR = path.join(__dirname, 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');

// Ensure data folder exists safely without crashing on read-only environments
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('Could not initialize local data directory, fallback to in-memory:', err);
}

function loadScores(): ScoreRecord[] {
  try {
    if (fs.existsSync(SCORES_FILE)) {
      const data = fs.readFileSync(SCORES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading scores file:', err);
  }
  return [];
}

function saveScores(scores: ScoreRecord[]) {
  try {
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving scores file:', err);
  }
}

// In-memory scores initialized from disk
let scores: ScoreRecord[] = loadScores();

// Active SSE client connections for real-time updates
const sseClients: Response[] = [];

function broadcastScoreUpdate(newRecord: ScoreRecord) {
  const payload = JSON.stringify({ type: 'NEW_SUBMISSION', record: newRecord });
  sseClients.forEach((client) => {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch {
      // Ignore write errors to closed clients
    }
  });
}

async function startServer() {
  const app = express();
  const isDev = process.env.npm_lifecycle_event === 'dev';
  // In AI Studio (both dev and deployed containers), Nginx listens on 8080 and reverse-proxies to port 3000.
  // The Node server must bind to DEFAULT_APP_PORT (3000) to avoid EADDRINUSE collisions with Nginx.
  const PORT = process.env.DEFAULT_APP_PORT
    ? parseInt(process.env.DEFAULT_APP_PORT, 10)
    : process.env.PORT && process.env.PORT !== '8080'
      ? parseInt(process.env.PORT, 10)
      : 3000;
  const distPath = path.join(__dirname, 'dist');
  const distExists = fs.existsSync(path.join(distPath, 'index.html'));
  const isProduction = distExists && !isDev;

  app.use(express.json());

  // --- Health Check Endpoints (immediate 200 response for Cloud Run & probes) ---
  app.get(['/healthz', '/_healthz', '/api/health', '/ping'], (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() });
  });

  // --- API Endpoints ---
  app.get('/api/scores', (req: Request, res: Response) => {
    res.json({ scores });
  });

  // Submit a new score record
  app.post('/api/scores', (req: Request, res: Response) => {
    const {
      username,
      score,
      totalAnswered,
      percentage,
      rank,
      rankTitle,
      gameMode,
      correctQuestionIds,
      incorrectQuestionDetails,
    } = req.body;

    if (!username || typeof username !== 'string' || !username.trim()) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }

    const newRecord: ScoreRecord = {
      id: `score_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      username: username.trim(),
      score: Number(score) || 0,
      totalAnswered: Number(totalAnswered) || 0,
      percentage: Number(percentage) || 0,
      rank: rank || 'C',
      rankTitle: rankTitle || 'Superviviente',
      gameMode: gameMode || 'Maratón 100',
      correctQuestionIds: Array.isArray(correctQuestionIds) ? correctQuestionIds : [],
      incorrectQuestionDetails: Array.isArray(incorrectQuestionDetails) ? incorrectQuestionDetails : [],
      createdAt: new Date().toISOString(),
    };

    scores.unshift(newRecord);
    // Keep max 200 records in history
    if (scores.length > 200) {
      scores = scores.slice(0, 200);
    }
    saveScores(scores);

    // Notify all real-time connected clients
    broadcastScoreUpdate(newRecord);

    res.status(201).json({ success: true, record: newRecord });
  });

  // Real-time Server-Sent Events (SSE) Stream
  app.get('/api/scores/live', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Send initial snapshot
    res.write(`data: ${JSON.stringify({ type: 'SNAPSHOT', scores })}\n\n`);

    sseClients.push(res);

    req.on('close', () => {
      const idx = sseClients.indexOf(res);
      if (idx !== -1) {
        sseClients.splice(idx, 1);
      }
    });
  });

  // Delete score record by ID
  app.delete('/api/scores/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    scores = scores.filter((s) => s.id !== id);
    saveScores(scores);
    res.json({ success: true });
  });

  // --- Static & Frontend Integration ---
  if (isProduction) {
    app.use(express.static(distPath, { index: 'index.html' }));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: false,
        },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn('Vite middleware could not be loaded, using static if available:', err);
      if (distExists) {
        app.use(express.static(distPath));
        app.get('*', (req: Request, res: Response) => {
          res.sendFile(path.join(distPath, 'index.html'));
        });
      }
    }
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Resident Evil Trivia Server running on http://0.0.0.0:${PORT} [${isProduction ? 'PRODUCTION' : 'DEV'}]`);
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
