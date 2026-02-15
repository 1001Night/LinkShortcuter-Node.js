const express = require('express');
const pool = require('./config/db');
const createdirect = require('./createredirect')

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('http://localhost:8080');
})

app.get('/:key', async (req, res) => {
    try {
        const data = await createdirect.getDataLink(req.params.key);
        if (data && data.redirect) {
            res.redirect(data.redirect);
        } else {
            res.status(404).send('Ссылка не найдена');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.post('/api/links', express.json(), async (req, res) => {
    try {
        const link = await createdirect.generateRandomString()
        const { redirect, owner } = req.body;
        if (!redirect) {
            return res.status(400).json({
                error: 'Поля link и redirect обязательны'
            });
        }
        const newLink = await createdirect.addRedirect(link, redirect, owner);
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/delete/:link', async (req, res) => {
    try {
        const { link } = req.params;
        await pool.query('DELETE FROM links WHERE link = $1', [link]);
        res.json({ success: true, message: 'Запись удалена' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server started: http://0.0.0.0:${PORT}`);
})