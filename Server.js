const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const puerto = 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// Archivo donde se guardarán los datos
const archivoJson = "datos.json";

app.post("/guardar", (req, res) => {

    // Leer datos enviados desde el formulario
    const nuevoRegistro = req.body;

    let registros = [];

    // Si el archivo existe, leerlo
    if (fs.existsSync(archivoJson)) {
        const contenido = fs.readFileSync(archivoJson, "utf8");
        try {
            registros = JSON.parse(contenido);
        } catch {
            registros = [];
        }
    }

    // Agregar nuevo registro
    registros.push(nuevoRegistro);

    // Guardar todo de nuevo en JSON
    fs.writeFileSync(archivoJson, JSON.stringify(registros, null, 2));

    res.json({ mensaje: "Datos guardados correctamente" });
});

app.listen(puerto, () => {
    console.log(`Servidor funcionando en http://localhost:${puerto}`);
});
