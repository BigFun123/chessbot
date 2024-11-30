const express = require('express');

const router = express.Router();

// POST route for chatbot
router.post('/chatbot', (req, res) => {
    const userMessage = req.body.message;

    // Process the user message and generate a response
    const botResponse = generateBotResponse(userMessage);

    res.json({ response: botResponse });
});

function generateBotResponse(message) {
    // Implement your chatbot logic here
    return `You said: ${message}`;
}

module.exports = router;