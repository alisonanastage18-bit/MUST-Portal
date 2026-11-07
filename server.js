<<<<<<< HEAD
const path = require('path');
const express = require('express');
const pool = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login project.html'));
});

app.get('/account.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'account.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/style 2.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style 2.css'));
});

app.use((req, res) => {
    res.status(404).send('Page not found.');
});

app.use((error, req, res, next) => {
    console.error(`Request failed for ${req.method} ${req.path}:`, error);
    res.status(500).send('The portal could not complete your request. Please try again later.');
});

async function startServer() {
    await pool.execute(`CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(32) NOT NULL UNIQUE,
        surname VARCHAR(100) NOT NULL,
        other_names VARCHAR(150) NOT NULL,
        phone VARCHAR(32) NOT NULL,
        email VARCHAR(254) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);

    app.listen(port, () => {
        console.log(`MUST Portal is running at http://localhost:${port}`);
    });
}

startServer().catch(async (error) => {
    console.error('Could not start the MUST Portal:', error.message);

    try {
        await pool.end();
    } catch (closeError) {
        console.error('Could not close the MySQL connection pool:', closeError.message);
    }

    process.exitCode = 1;
=======
const express = require("express");
const path = require("path");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(applicationRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
>>>>>>> 6ae6f127c6e5ae16b9c8d37dca55a527e01f0f18
});
