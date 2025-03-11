document.addEventListener('DOMContentLoaded', function() {
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);

    // Send message when Enter key is pressed (but allow Shift+Enter for new lines)
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat history
        addMessageToChat('user', message);
        
        // Clear input
        userInput.value = '';

        // Add loading indicator
        const loadingElement = document.createElement('div');
        loadingElement.className = 'message bot-message';
        loadingElement.innerHTML = 'Thinking<span class="loading">...</span>';
        loadingElement.id = 'loading-message';
        chatHistory.appendChild(loadingElement);
        
        // Scroll to bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Send message to server
        fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Remove loading indicator
            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) {
                chatHistory.removeChild(loadingMessage);
            }
            
            // Add bot response to chat history
            addMessageToChat('bot', data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Remove loading indicator
            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) {
                chatHistory.removeChild(loadingMessage);
            }
            
            // Add error message
            addMessageToChat('bot', 'Sorry, something went wrong. Please try again.');
        });
    }

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        
        // Scroll to bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});