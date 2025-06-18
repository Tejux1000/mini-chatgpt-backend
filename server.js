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
    const apiRes = await fetch("https://mini-chatgpt-backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await apiRes.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
