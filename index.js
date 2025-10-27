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
    })

app.post('/komik', async(req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.status(201).json(komik);
    } catch (error) {
        res.send(err);
    }
});