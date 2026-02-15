# 🔗 LinkShortcuter-Node.js
NodeJS link shortcuter backend (Express, PostgreSQL)

---
## 📖 Описание
Этот проект я делал для себя, как первый учебный проект после изучения Express.  
Он представляет собой бэкенд для сокращателя ссылок, который хранит данные о созданных сокращённых ссылках в БД PostgreSQL.  
---

## ⚙️ Установка проекта (Docker) (Рекомендуется)
1. Скачать образ:
```bash
docker pull night1001/lscuter:latest
```
2. Запустить контейнер (сперва надо запустить БД):
```bash
docker run -d \
  -p 3000:3000 \
  -e DB_USER=postgres \
  -e DB_HOST=127.0.0.1 \
  -e DB_NAME=postgres \
  -e DB_PASSWORD=PASSWORD \
  night1001/lscuter:latest
```

## ⚙️ Ручная установка проекта (Git)

1. Клонировать репозиторий:
```bash
git clone https://github.com/username/LinkShortcuter-Node.js.git
cd LinkShortcuter-Node.js
```
2. Установить зависимости:
```bash
npm install
```
3. Указать ваши настройки в .env 
```ini
DB_USER=postgres
DB_HOST=127.0.0.1
DB_NAME=postgres
DB_PASSWORD=PASSWORD
DB_PORT=5432
```
4. Запустить сервер:
```bash
node index.js
```


## 🗄 Установка и настройка PostgreSQL

Установить PostgreSQL:
[Официальный сайт](https://www.postgresql.org/download/)

Docker: docker pull postgres:14.21-trixie

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

## 🤺 Дополнительно

docker-compose.yml:
```
services:
  app:
    image: night1001/lscuter:latest
    ports:
      - "3000:3000"
    environment:
      - DB_USER=postgres
      - DB_HOST=db
      - DB_NAME=postgres
      - DB_PASSWORD=PASSWORD
    depends_on:
      - db

  db:
    image: postgres:14.21-trixie
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD=PASSWORD
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Сервер будет запущен на http://0.0.0.0:3000
Протестировать работу бэкенда можно командами:

1. Добавить ссылку: 
```bash
curl -X POST http://0.0.0.0:3000/api/links -H "Content-Type: application/json" -d "{\"redirect\":\"https://google.com\",\"owner\":\"test_user\"}"
```
2. Удалить ссылку:
```bash
curl -X DELETE http://0.0.0.0:3000/delete/{link}
```
