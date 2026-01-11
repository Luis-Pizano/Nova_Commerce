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

// ================================ Catergorias APIs ==================================

app.post('/api/cargar_categorias',upload.single('imagen'), async (req, res) => {
    const {nombre,descripcion} = req.body;
    try {
        const file = req.file;
        await sql.connect(dbConfig);

        const request = new sql.Request();
        request.input('nombre',sql.VarChar(),nombre);
        request.input('descripcion',sql.VarChar(),descripcion);
        request.input('imagen',sql.VarBinary(sql.MAX),file.buffer);
        await request.query('INSERT INTO CATEGORIAS (NOMBRE, DESCRIPCION, IMAGEN) VALUES (@nombre, @descripcion, @imagen)');

        res.status(200).json({ Message: 'Categoria cargada exitosamente.' });
    } catch (error) {
        console.error(`Error al cargar categoria, Error: ${error}`);
    }
})

app.get('/api/obtener_categorias', async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query('SELECT * FROM CATEGORIAS');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener categorias, Error: ${error}`);
    }
})

// ================================ END Catergorias APIs ==================================

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})