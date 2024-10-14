// npm install express axios dotenv

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post('/api/ask-ai', async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt)
  try {
    const response = await axios.post(
      'https://api.sambanova.ai/v1/chat/completions',
      {
        model: 'Meta-Llama-3.1-405B-Instruct',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SAMBANOVA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices.map((choice) => choice.message.content).join('');
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
