const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
require('dotenv').config();

const app = express();

const PORT = 8080;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json())

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
    }
};

// ================================ Registro API ==================================

app.post('/api/registro', async (req, res) => {
    const { usuario, email, password } = req.body;
    try {

        await sql.connect(dbConfig);

        const request = new sql.Request();

        const passwordEncrypted = await bcrypt.hash(password, 10)

        request.input('usuario', sql.VarChar(), usuario);
        request.input('email', sql.VarChar(), email);
        request.input('password', sql.VarChar(), passwordEncrypted);

        await request.query('INSERT INTO CUENTAS (USUARIO, EMAIL, PASSWORD) VALUES (@usuario, @email, @password)');

        res.status(200).json({ Message: 'Resgistro exitoso.' });

    } catch (error) {
        console.error(`Error en el registro, Error: ${error}`)
    }

})

// ================================ Catergorias APIs ==================================

app.post('/api/cargar_categorias', upload.single('file'), async (req, res) => {
    const { nombre, descripcion } = req.body;
    const fileBuffer = req.file ? req.file.buffer : null;
    const mimeType = req.file ? req.file.mimetype : null;


    try {
        await sql.connect(dbConfig);

        const request = new sql.Request();
        request.input('nombre', sql.VarChar(), nombre);
        request.input('descripcion', sql.VarChar(), descripcion);
        request.input('imagen', sql.VarBinary(sql.MAX), fileBuffer);
        request.input('mime_type', sql.NVarChar(50), mimeType);

        await request.query('INSERT INTO CATEGORIAS (NOMBRE, DESCRIPCION, IMAGEN, MIME_TYPE) VALUES (@nombre, @descripcion, @imagen, @mime_type)');

        res.status(200).json({ Message: 'Categoria cargada exitosamente.' });
    } catch (error) {
        console.error(`Error al cargar categoria, Error: ${error}`);
    }
})

app.get('/api/obtener_categorias', async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query('SELECT * FROM CATEGORIAS');

        const categorias = result.recordset.map(img => ({
            ...img,IMAGEN: img.IMAGEN ? Buffer.from(img.IMAGEN).toString('base64') : null
        }));

        res.status(200).json(categorias);
    } catch (error) {
        console.error(`Error al obtener categorias, Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
});


// ================================ END Catergorias APIs ==================================

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})