const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//创建客户端对象
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Use environment variable for API key
});

//设置API
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        { role: "user", content: userMessage }
      ]
    });
    
    res.json({ 
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

app.use(express.static('public'));

//启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});