const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
        temperature: 0.9
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
});

app.get("/", (_, res) => {
  res.send("LunaS GPT-4o Proxy is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
