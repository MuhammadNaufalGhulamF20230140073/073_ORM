const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database sync error:', err);
    });