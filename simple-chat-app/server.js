const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//创建客户端对象

// old OpenAI
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY // Use environment variable for API key
// });

// const client = new OpenAI({
//   apiKey: "volco_api",
//   baseURL: "https://open.volcengineapi.com/v1",
//   defaultHeaders: {
//     "X-Bot-Id": "volco_bot_id" // 从火山控制台获取
//   }
// });

const client = new OpenAI({
  apiKey: "9f918ea4-6d6f-491d-8c7d-df5dfdc8c87b",
  baseURL: "https://ark.cn-beijing.volces.com/api/v3/",
  defaultHeaders: {
    "X-Bot-Id": "ep-20250306145940-q4mwg" // 从火山控制台获取
  }
});


//设置API
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    const completion = await client.chat.completions.create({
      model: "deepseek-r1", // gpt-4o-mini
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
