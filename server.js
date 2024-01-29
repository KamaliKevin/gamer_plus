// INSTANCIAS:
const express = require("express");
const { getLogo, getHeaderAd, getArticleById, getAllArticles, getAllCategories,
    getCarouselArticles, getEsportsFeatureArticles,
    getPlaystationFeatureArticle, getPlaystationListArticles,
    getNintendoFeatureArticle, getNintendoListArticles,
    getLatestArticles, getAsideAds, getSingleAd, getVideoPreviews,
    getEditor, getAuthorByArticleId, getFeatureArticleByCategory,
    getArticlesByCategory } = require("./database/requests");

const cors = require("cors");
const axios = require("axios");
const ejs = require("ejs");
const path = require("path");
const sharp = require("sharp");
require("./utils/functions");


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

        // Consultas a la base de datos MySQL:
        const logo = await getLogo();
        const headerAd = await getHeaderAd();
        const articles = await getAllArticles();
        const carouselArticles = await getCarouselArticles();
        const esportsFeatureArticles = await getEsportsFeatureArticles();
        const playstationFeatureArticle = await getPlaystationFeatureArticle();
        const playstationListArticles = await getPlaystationListArticles();
        const nintendoFeatureArticle = await getNintendoFeatureArticle();
        const nintendoListArticles = await getNintendoListArticles();
        const latestArticles = await getLatestArticles();
        const categories = await getAllCategories();
        const asideAds = await getAsideAds();
        const videoPreviews = await getVideoPreviews();
        const editor = await getEditor();

        // Devolver 'index' como vista con datos
        res.render("index", { externalData, logo, headerAd, articles, carouselArticles,
            esportsFeatureArticles, playstationFeatureArticle, playstationListArticles,
            nintendoFeatureArticle, nintendoListArticles, latestArticles,
            asideAds, videoPreviews, categories, editor });
    }
    catch (error) {
        console.error("Error in the main route:", error);
        res.status(500).send("Internal server error");
    }
});


app.get("/category/:categoryName", async (req, res) => {
   try {
       const categoryRef = req.params.categoryName.capitalize();
       const externalData = req.externalData;

       const logo = await getLogo();
       const headerAd = await getHeaderAd();
       const featureArticleByCategory = await getFeatureArticleByCategory(categoryRef);
       const articlesByCategory = await getArticlesByCategory(categoryRef);
       const latestArticles = await getLatestArticles();
       const categories = await getAllCategories();
       const asideAds = await getAsideAds();
       const editor = await getEditor();

       res.render("category", { externalData, logo, headerAd,
           featureArticleByCategory, articlesByCategory,
           latestArticles, categories, asideAds, editor });
   }
   catch (error) {
       console.error("Error in the category route:", error);
       res.status(500).send("Internal server error");
   }
});


app.get("/single/:articleId", async (req, res) => {
    try {
        const categoryRef = parseInt(req.params.articleId);
        const externalData = req.externalData;

        const logo = await getLogo();
        const headerAd = await getHeaderAd();
        const articleById = await getArticleById(categoryRef);
        const latestArticles = await getLatestArticles();
        const categories = await getAllCategories();
        const asideAds = await getAsideAds();
        const singleAd = await getSingleAd();
        const editor = await getEditor();
        const authorByArticleId = await getAuthorByArticleId(categoryRef);

        res.render("single", { externalData, logo, headerAd,
            articleById, singleAd, latestArticles,
            categories, asideAds, editor, authorByArticleId });
    }
    catch (error) {
        console.error("Error in the single route:", error);
        res.status(500).send("Internal server error");
    }
});


app.get("/images/:imageName", async (req, res) => {
    try {
        const imageRef = req.params.imageName;
        const { width, height } = req.query;

        const imagePath = path.join(__dirname, "/public/img/", imageRef);

        // Cargar la imagen:
        let image = sharp(imagePath);

        // Comprobar la referencia y si hay ancho y alto para ajustar las dimensiones de la imagen correspondientemente:
        if(parseInt(width) && parseInt(height)){
            image = image.resize(parseInt(width), parseInt(height));
        }
        else if(imageRef.includes("logo")){
            image = image.resize(236, 90);
        }
        else if(imageRef.includes("header_ad") || imageRef.includes("single-ad")){
            image = image.resize(565, 75);
        }
        else if (imageRef.includes("carousel") || imageRef.includes("nintendo_feature") || imageRef.includes("playstation_feature")) {
            image = image.resize(810, 629);
        }
        else if (imageRef.includes("esports_feature")) {
            image = image.resize(383, 630);
        }
        else if (imageRef.includes("nintendo-list") || imageRef.includes("playstation-list")) {
            image = image.resize(80, 80);
        }
        else if(imageRef.includes("author")){
            image = image.resize(64, 64);
        }
        else if(imageRef.includes("aside-ad")){
            image = image.resize(255, 311);
        }
        else if(imageRef.includes("video-thumbnail")){
            image = image.resize(720, 400);
        }

        res.setHeader("Content-Type", "image/jpeg");

        // Mandar la imagen redimensionada como respuesta:
        image.pipe(res);
    }
    catch (error) {
        console.error("Error serving the image:", error);
        res.status(500).send("Internal server error");
    }
});


// PUERTO:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});