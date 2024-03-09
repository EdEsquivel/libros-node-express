const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());

const mongoUri = process.env.MONGODB_URI;

// Conexión a base de datos

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log("Error de conexion", error);
  });

const db = mongoose.connection;

db.on("error", console.error("Error de conexión"));

db.once("open", () => console.log("Conectado a MongoDB"));

const libroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
});

const Libro = mongoose.model("Libro", libroSchema);

const libros = [
  {
    id: 1,
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
  },
  {
    id: 2,
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
  },
  {
    id: 3,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
  },
];

// Ruta inicial
app.get("/", (req, res) => {
  res.send("Bienvenido a la App Libros");
});
// Ruta devolver listado de libros
app.get("/libros", (req, res) => {
  res.json(libros);
});

// Ruta devolver libro por id
app.get("/libros/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find((libro) => libro.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).send("Libro no encontrado");
  }
});

// Puerto de escucha
app.listen(3000, () => {
  console.log("El servidor está inicializado en http://localhost:3000/");
});
