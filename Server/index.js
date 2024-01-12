const express = require("express");
const cors = require("cors");
const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: "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"
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  
    const { prompt } = req.body;

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": prompt}],
      });
      res.send(chatCompletion.choices[0].message);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
