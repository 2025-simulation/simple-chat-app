document.addEventListener('DOMContentLoaded', function() {
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    const apiKey = CONFIG.DEEPSEEK_API_KEY;
    const apiUrl = CONFIG.API_URL;
    const modelName = CONFIG.MODEL_NAME;

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        addMessageToChat('user', message);
        
        userInput.value = '';

        const loadingElement = document.createElement('div');
        loadingElement.className = 'message bot-message';
        loadingElement.innerHTML = 'Thinking<span class="loading">...</span>';
        loadingElement.id = 'loading-message';
        chatHistory.appendChild(loadingElement);
        
        chatHistory.scrollTop = chatHistory.scrollHeight;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName,
                messages: [{ role: "user", content: message }],
                store: true
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) {
                chatHistory.removeChild(loadingMessage);
            }
            
            const botResponse = data.choices[0].message.content;
            addMessageToChat('bot', botResponse);
        })
        .catch(error => {
            console.error('Error:', error);
            
            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) {
                chatHistory.removeChild(loadingMessage);
            }
            
            addMessageToChat('bot', 'Sorry, something went wrong. Please try again. Error: ' + error.message);
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