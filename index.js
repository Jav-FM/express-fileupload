const express = require("express");
const app = express();
const expressFileUpload = require("express-fileupload");

app.listen(3000, () => {
  console.log("Server ON");
});

app.use(
  expressFileUpload({
    limits: {
      fileSize: 5000000,
    },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo supera el límite permitido (5MB)",
  })
);

app.get("/", (req, res) => {
  res.send(`
    <form method="POST" enctype="multipart/form-data">
    <input type="file" name="foto" required>
    <button> Upload </button>
    </form>
    `);
});
