const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.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}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await openaiRes.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "Error: " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
