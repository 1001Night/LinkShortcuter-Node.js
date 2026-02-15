FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json .
RUN npm ci --only=production
COPY . .

EXPOSE 3000
ENV DB_USER=postgres
ENV DB_HOST=localhost
ENV DB_NAME=postgres
ENV DB_PASSWORD=PASSWORD
ENV DB_PORT=5432

ENTRYPOINT ["npm", "start"]