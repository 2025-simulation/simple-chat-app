const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

//加载配置文件
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('DeepSeek Chat Backend Server is running');
});

//启动服务器
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});