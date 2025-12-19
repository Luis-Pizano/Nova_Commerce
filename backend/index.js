const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");

const app = express();

const PORT = 8080;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json())

const dbConfig = {
    user: 'ADMIN',
    password: '1234',
    server: 'localhost',
    database: 'NOVA_COMMERCE',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

app.post('/api/registro', async (req, res) => {
    const { usuario, email, password } = req.body;
    try {
        
        await sql.connect(dbConfig);

        const request = new sql.Request();

       const passwordEncrypted =await bcrypt.hash(password,10)

        request.input('usuario',sql.VarChar(),usuario);
        request.input('email',sql.VarChar(),email);
        request.input('password',sql.VarChar(),passwordEncrypted);

        await request.query('INSERT INTO CUENTAS (USUARIO, EMAIL, PASSWORD) VALUES (@usuario, @email, @password)');

        res.status(200).json({ Message: 'Resgistro exitoso.' });

    } catch (error) {
        console.error(`Error en el registro, Error: ${error}`)
    }



})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})