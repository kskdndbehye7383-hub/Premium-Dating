import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// For ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple file-based persistent DB for cross-computer prototype
const DB_FILE = path.join(process.cwd(), 'cards_db.json');
const USERS_DB_FILE = path.join(process.cwd(), 'premium_users.json');

let validCards: string[] = [];
let premiumUsers: string[] = [];

// Initialize DBs
if (fs.existsSync(DB_FILE)) {
  try {
    validCards = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (e) {
    validCards = [];
  }
}

if (fs.existsSync(USERS_DB_FILE)) {
  try {
    premiumUsers = JSON.parse(fs.readFileSync(USERS_DB_FILE, 'utf-8'));
  } catch (e) {
    premiumUsers = [];
  }
}

function saveDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(validCards));
}

function saveUsersDb() {
  fs.writeFileSync(USERS_DB_FILE, JSON.stringify(premiumUsers));
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = process.env.PORT || 3000;

  // --- RESTful API Routes ---

  // Admin: Get all valid cards
  app.get("/api/cards", (req, res) => {
    res.json(validCards);
  });

  // Admin: Bulk update valid cards
  app.post("/api/cards", (req, res) => {
    const { cards } = req.body;
    if (Array.isArray(cards)) {
      validCards = [...new Set(cards)]; // ensure unique
      saveDb();
      res.json({ success: true, count: validCards.length });
    } else {
      res.status(400).json({ error: "cards must be an array" });
    }
  });

  // User: Validate and consume a card
  app.post("/api/cards/validate", (req, res) => {
    const { cardNumber } = req.body;
    
    // Strict typing and validation check
    if (!cardNumber || typeof cardNumber !== 'string') {
      return res.json({ success: false });
    }

    const strictCardNumber = cardNumber.trim();
    
    // Find the EXACT match in the database
    const index = validCards.indexOf(strictCardNumber);
    
    if (index !== -1) {
      // Consume the exact matched card
      const consumedCard = validCards[index];
      validCards.splice(index, 1);
      saveDb();
      console.log(`[PAYMENT SUCCESS] Exactly matched and securely deleted card: ${consumedCard}`);
      res.json({ success: true });
    } else {
      console.log(`[PAYMENT FAILED] Card not found in database: ${strictCardNumber}`);
      res.json({ success: false });
    }
  });

  // User: Check premium status
  app.get("/api/users/:email/status", (req, res) => {
    const email = req.params.email;
    const isPremium = premiumUsers.includes(email);
    res.json({ isPremium });
  });

  // User: Upgrade to premium
  app.post("/api/users/upgrade", (req, res) => {
    const { email } = req.body;
    if (email && !premiumUsers.includes(email)) {
      premiumUsers.push(email);
      saveUsersDb();
    }
    res.json({ success: true });
  });

  // --- Vite Middleware (Development) / Static Files (Production) ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
