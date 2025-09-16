# 🔗 LinkShortcuter-Node.js
NodeJS link shortcuter backend (Express, PostgreSQL)

---
## 📖 Описание
Этот проект я делал для себя, как первый учебный проект после изучения Express.  
Он представляет собой бэкенд для сокращателя ссылок, который хранит данные о созданных сокращённых ссылках в БД PostgreSQL.  
---

## ⚙️ Установка проекта

1. Клонировать репозиторий:
```bash
git clone https://github.com/username/LinkShortcuter-Node.js.git
cd LinkShortcuter-Node.js
```
2. Установить зависимости:
```bash
npm install
```
## 🗄 Установка и настройка PostgreSQL

Установить PostgreSQL:
[Официальный сайт](https://www.postgresql.org/download/)
Docker: docker pull postgres:13-trixie

1. Создать базу данных:
```sql
CREATE DATABASE anyname;
```

2. Создать таблицу (Имя links обязательно, но можно поменять в /config/db.js):
```sql
CREATE TABLE links (
    id SERIAL PRIMARY KEY
);
```

Создать пользователя и выдать права (опционально):
```sql
CREATE USER user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE anyname TO user;
```

## ▶️ Запуск проекта

1. Указать ваши настройки в .env 
```ini
DB_USER=user
DB_HOST=localhost
DB_NAME=anyname
DB_PASSWORD=PASSWORD
DB_PORT=5432
```
2. Запустить сервер:
```bash
npm start
```

## 🤺 Дополнительно

Сервер будет запущен на http://localhost:3000
Протестировать работу бэкенда можно командами:

1. Добавить ссылку: 
```bash
curl -X POST http://localhost:3000/api/links -H "Content-Type: application/json" -d "{\"redirect\":\"https://google.com\",\"owner\":\"test_user\"}"
```
2. Удалить ссылку:
```bash
curl -X DELETE http://localhost:3000/delete/{link}
```
