require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/send-message', async (req, res) => {
    const { phone, email } = req.body;

    const message = `📩 Нова заявка:\n📞 Телефон: ${phone}\n✉️ Email: ${email}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        });

        if (!response.ok) throw new Error('Telegram API error');

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Помилка надсилання:', err);
        res.status(500).json({ error: 'Не вдалося надіслати повідомлення' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Сервер працює на http://localhost:${PORT}`);
});
