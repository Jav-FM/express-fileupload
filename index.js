const express = require("express");
const app = express();
const expressFileUpload = require("express-fileupload");

app.listen(3000, () => {
  console.log("Server ON");
});

//Configuración de expressFileUpload
app.use(
  expressFileUpload({
    limits: {
      fileSize: 5000000,
    },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo supera el límite permitido (5MB)",
  })
);

// Se disponibiliza formulario para carga de imagenes
app.get("/", (req, res) => {
  res.send(`
    <form method="POST" enctype="multipart/form-data">
    <input type="file" name="foto" required>
    <button> Upload </button>
    </form>
    `);
});

// Ruta POST para carga del la imagen o archivo
app.post("/", (req, res) => {
  const { foto } = req.files;
  const { name } = foto;
  foto.mv(`${__dirname}/archivos/${name}`, (err) => {
    if (err) res.send("Error en la carga del archivo.");
    res.send("Archivo cargado con éxito.");
  });
});
