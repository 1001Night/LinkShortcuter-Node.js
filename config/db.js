const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function createColumns() {
    const client = await pool.connect();
    try {
        const tableName = 'links';
        const tableExists = await client.query(`
            SELECT EXISTS (
                SELECT 1 FROM information_schema.tables 
                WHERE table_name = $1 AND table_schema = 'public'
            )
        `, [tableName]);
        
        if (!tableExists.rows[0].exists) {
            await client.query(`
                CREATE TABLE ${tableName} (
                    id SERIAL PRIMARY KEY,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            `);
        }
        const columnsToAdd = [
            { name: 'link', type: 'TEXT' },
            { name: 'redirect', type: 'TEXT' },
            { name: 'owner', type: 'VARCHAR(255)' },
            { name: 'visited', type: 'INTEGER' }
        ];
        for (const column of columnsToAdd) {
            const columnExists = await client.query(`
                SELECT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = $1 AND column_name = $2
                )
            `, [tableName, column.name]);
            
            if (!columnExists.rows[0].exists) {
                await client.query(`ALTER TABLE ${tableName} ADD COLUMN ${column.name} ${column.type}`);
            }
        }
    } catch (error) {
        console.error('Ошибка:', error.message);
    } finally {
        client.release();
    }
}
createColumns();
module.exports = pool
