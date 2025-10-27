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

app.get('/komik', async(req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (error) {
        res.send(Err);
    }
});

app.put('/komik/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);

        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }

        await komik.update(data);
        res.send({ message: 'Komik berhasil diupdate', komik });

    } catch (error) {
        res.status(500).send({ message: 'Terjadi kesalahan pada server', error });
    }
});