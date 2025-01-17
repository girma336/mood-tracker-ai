require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// GPT Endpoint
app.post("/api/mood-traker", async (req, res) => {
  const { moodScale, description } = req.body;

  const prompt = `
The user rated their mood as ${moodScale}/5 and described it as follows: "${description}". 
Based on this information, provide:
1. Insights to help the user understand their current emotional state.
2. Practical tips or actionable advice to improve their mood.
    `;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "o1-mini-2024-09-12",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // res.json(response.data);
    const insight = response.data;
    res.json({ insight });
  } catch (error) {
    console.error(
      "Error with OpenAI API:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: error.response?.data || "Unexpected error occurred",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
