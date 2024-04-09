require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const http = require('http');
const handleRequest = require('./routes/endpointRouter');
const dbConnection = require("./config/database");
const path = require("path");
const morgan = require("morgan");

// Middleware для обробки CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const imagesPath = path.join(__dirname, 'public', 'images', 'posters');
app.use('/images/posters', express.static(imagesPath));

// Використання middleware morgan для виводу логів
app.use(morgan('combined'));


// Підключення ендпойнтроутера
app.use(handleRequest);

const PORT = process.env.PORT;
const ipAddress = process.env.DB_IP;

// Запуск сервера
const server = http.createServer(app);

server.listen(PORT, ipAddress, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Обробка закриття сервера
process.on('SIGINT', () => {
    dbConnection.end();
    console.log('Сервер зупинено');
    server.close(() => {
        process.exit(0);
    });
});
