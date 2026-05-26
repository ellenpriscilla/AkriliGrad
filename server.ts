import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Gemini AI Setup
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Mock Database (In-memory for "minimal" demo, can be replaced with MySQL/Firestore)
interface Order {
  id: string;
  name: string;
  date: string;
  size: string;
  customText: string;
  status: 'Pending' | 'Processed' | 'Completed';
  createdAt: string;
}

let orders: Order[] = [];

// API Routes
app.post("/api/generate-greeting", async (req, res) => {
  try {
    const { name } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a creative, short, and heartwarming graduation greeting for ${name}. Keep it under 20 words.`,
    });
    res.json({ greeting: response.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate AI greeting" });
  }
});

app.post("/api/orders", (req, res) => {
  const { name, date, size, customText } = req.body;
  const newOrder: Order = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    date,
    size,
    customText,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.get("/api/orders", (req, res) => {
  const password = req.headers['x-admin-password'];
  if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(orders);
});

app.patch("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex === -1) return res.status(404).json({ error: "Order not found" });
  
  orders[orderIndex].status = status;
  res.json(orders[orderIndex]);
});

// Vite Middleware for Development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
