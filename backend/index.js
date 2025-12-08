const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const multer = require("multer");

const app = express();

const PORT = 8080;

const storage = multer.memoryStorage();
const upload = multer({storage});

app.use(cors());
app.use(express.json())

const multer = multer();


app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})