document.addEventListener('DOMContentLoaded', function() {
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    //发送消息
    sendButton.addEventListener('click', sendMessage);

    //回车键发送消息，shift+回车换行
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        //添加到聊天历史记录
        addMessageToChat('user', message);
        
        //清空输入框
        userInput.value = '';

        const loadingElement = document.createElement('div');
        loadingElement.className = 'message bot-message';
        loadingElement.innerHTML = 'Thinking<span class="loading">...</span>';
        loadingElement.id = 'loading-message';
        chatHistory.appendChild(loadingElement);
        
        //滚动到底部
        chatHistory.scrollTop = chatHistory.scrollHeight;

        //将消息发送到服务器
        fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {

            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) {
                chatHistory.removeChild(loadingMessage);
            }
            
            addMessageToChat('bot', data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            
            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) {
                chatHistory.removeChild(loadingMessage);
            }
            
            //发生错误
            addMessageToChat('bot', 'Sorry, something went wrong. Please try again.');
        });
    }

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        
        
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});