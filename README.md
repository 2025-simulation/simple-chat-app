## Summary
api key调用测试
有纯前端版本和前后端分离版本

## 纯前端调用（web文件夹）：
1. 在config.js内输入deepseek官网api密钥
2. 如果调用官方模型，则保持api地址和模型名称不变
3. 浏览器打开index.html，即可开始对话

## 前后端分离调用（server文件夹）：
1. 在backend/.env文件内添加api密钥
2. 返回server文件夹，运行start.cmd批处理
3. 浏览器访问http://localhost:8080