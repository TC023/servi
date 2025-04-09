const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

/* CONEXIÓN A LA DB */
const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'servi',
    user: 'postgres',
    password: 'postgres',
    allowExitOnIdle: true
}
const db = pgp(cn);

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'hola desde el backend' });
});

app.get('/proyectos', (req, res) => {
    db.any('SELECT * FROM proyecto')
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
})

app.get('/carreras', (req, res) => {
    db.any('SELECT * FROM carrera')
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
})

app.get('/proyecto_carrera/:proyecto_id', (req, res) => {
    db.any('SELECT c.nombre FROM proyecto_carrera pc JOIN carrera c ON pc.carrera_id = c.carrera_id WHERE pc.proyecto_id = $1;', [req.params.proyecto_id])
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
})

app.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});
