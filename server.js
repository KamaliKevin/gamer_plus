// INSTANCIAS:
const express = require("express");
const { getArticleById, getAllArticles, getAllCategories } = require("./database/requests");
const cors = require("cors");
const axios = require("axios");
const ejs = require("ejs");
const path = require("path");

const app = express();


// MIDDLEWARE:
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.static(path.join(__dirname, "public"))); // Hacer que el directorio 'public' sea el directorio estático
app.use(async (req, res, next) => {
    // Extraer datos de API para cada ruta
    try {
        const externalApiResponse = await axios.get("https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/London");

        // Se modifica "externalData" a la petición para hacerla accesible en rutas:
        req.externalData = externalApiResponse.data;

        next();
    }
    catch (error) {
        console.error("Error fetching external data:", error.message);
        next(error);
    }
});


// CONFIGURACIÓN:
app.set("view engine", "ejs"); // Usar EJS (Embedded JavaScript) como motor de plantillas



// RUTAS:
// TODO - Seguir trabajando en reflejar los datos desde la base de datos
app.get("/", async (req, res) => {
    try {
        // Acceso a "externalData" desde la petición
        const externalData = req.externalData;

        // Ejemplo de consulta a la base de datos MySQL
        const articles = await getAllArticles();
        const categories = await getAllCategories();

        // Devolver 'index' como vista con datos
        res.render("index", { externalData, articles, categories });
    }
    catch (error) {
        console.error("Error in the main route:", error);
        res.status(500).send("Internal server error");
    }
});


app.get("/category", async (req, res) => {
   try {
       const externalData = req.externalData;

       res.render("category", { externalData });
   }
   catch (error) {
       console.error("Error in the category route:", error);
       res.status(500).send("Internal server error");
   }
});


app.get("/single", async (req, res) => {
    try {
        const externalData = req.externalData;

        res.render("single", { externalData });
    }
    catch (error) {
        console.error("Error in the single route:", error);
        res.status(500).send("Internal server error");
    }
});

app.get("/single/:id", async (req, res) => {
    try {
        const externalData = req.externalData;

        const articleId = req.params.id;
        const article = await getArticleById(articleId);

        // res.json(article);
        res.render("single", { externalData, article });
    }
    catch (error) {
        console.error("Error in the single route:", error);
        res.status(500).send("Internal server error");
    }
});


// PUERTO:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});