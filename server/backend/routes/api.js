const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        //调用api
        const response = await axios.post(
            process.env.API_URL,
            {
                model: process.env.MODEL_NAME,
                messages: [{ role: "user", content: message }],
                store: true
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
                }
            }
        );

        //获取大模型返回的结果
        const botResponse = response.data.choices[0].message.content;
        
        //将模型返回的文字发送到前端
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error calling DeepSeek API:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to get response from AI',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;