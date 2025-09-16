const pool = require('./config/db');

async function addRedirect(link, redirect, owner, visited = 0) {
    try {
        const query = 'INSERT INTO links (link, redirect, owner, visited) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [link, redirect, owner, visited];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Ошибка создания записи:', error);
        throw error;
    }
}

async function generateRandomString(length = 5) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let isUnique = false;

    while (!isUnique) {
        result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }

        const checkQuery = 'SELECT EXISTS(SELECT 1 FROM links WHERE link = $1)';
        const checkResult = await pool.query(checkQuery, [result]);
        
        if (!checkResult.rows[0].exists) {
            isUnique = true;
        }
    }

    return result;
}

async function getDataLink(linkValue) {
    try {
        const result = await pool.query(
            'SELECT redirect, visited FROM links WHERE link = $1',
            [linkValue]
        );
        
        if (result.rows.length > 0) {
            const { redirect, visited } = result.rows[0];
            return { redirect, visited };
        } else {
            return null;
        }
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function addVisits(linkValue, currentVisits) {
    //a
}

module.exports = { addRedirect, getDataLink, generateRandomString };