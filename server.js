// INSTANCIAS:
const express = require("express");
const { getLogo, getHeaderAd, getArticleById, getAllArticles, getAllCategories,
    getCarouselArticles, getEsportsFeatureArticles,
    getPlaystationFeatureArticle, getPlaystationListArticles,
    getNintendoFeatureArticle, getNintendoListArticles,
    getLatestArticles, getPopularArticles, getRelatedArticles,
    getAsideAds, getSingleAd, getVideoPreviews,
    getEditor, getAuthorByArticleId, getFeatureArticleByCategory,
    getArticlesByCategory, checkRecentVisit,
    recordArticleVisit, getViewsByArticle } = require("./database/requests");

const cors = require("cors");
const axios = require("axios");
const ejs = require("ejs");
const path = require("path");
const sharp = require("sharp");
require("./public/js/utils/functions");
const { DAY_OF_WEEK_TRANSLATIONS_ES } = require("./public/js/utils/constants");

const app = express();

app.locals.translations = DAY_OF_WEEK_TRANSLATIONS_ES;

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
        console.error("Error fetching external data and translations:", error.message);
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
        const popularArticles = await getPopularArticles();
        const categories = await getAllCategories();
        const asideAds = await getAsideAds();
        const videoPreviews = await getVideoPreviews();
        const editor = await getEditor();

        // Devolver 'index' como vista con datos
        res.render("index", { externalData, logo, headerAd, articles, carouselArticles,
            esportsFeatureArticles, playstationFeatureArticle, playstationListArticles,
            nintendoFeatureArticle, nintendoListArticles, latestArticles, popularArticles,
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
       const popularArticles = await getPopularArticles();
       const categories = await getAllCategories();
       const asideAds = await getAsideAds();
       const editor = await getEditor();

       res.render("category", { externalData, categoryRef, logo, headerAd,
           featureArticleByCategory, articlesByCategory,
           latestArticles, popularArticles, categories, asideAds, editor });
   }
   catch (error) {
       console.error("Error in the category route:", error);
       res.status(500).send("Internal server error");
   }
});


app.get("/single/:articleId", async (req, res) => {
    try {
        const articleRef = parseInt(req.params.articleId);
        const visitorIp = req.ip;
        const routeName = req.originalUrl;
        const externalData = req.externalData;


        // Comprobación de reciente visita de la misma IP:
        const recentVisit = await checkRecentVisit(visitorIp, articleRef);

        if (!recentVisit) {
            await recordArticleVisit(routeName, visitorIp, articleRef);
        }


        const logo = await getLogo();
        const headerAd = await getHeaderAd();
        const articleById = await getArticleById(articleRef);
        const latestArticles = await getLatestArticles();
        const popularArticles = await getPopularArticles();
        const relatedArticles = await getRelatedArticles(articleById.category_name, articleRef);
        const categories = await getAllCategories();
        const asideAds = await getAsideAds();
        const singleAd = await getSingleAd();
        const editor = await getEditor();
        const views = await getViewsByArticle(articleRef);
        const authorByArticleId = await getAuthorByArticleId(articleRef);

        res.render("single", { externalData, logo, headerAd,
            articleById, singleAd, latestArticles, popularArticles,
            relatedArticles, categories, asideAds, editor, authorByArticleId,
            views});
    }
    catch (error) {
        console.error("Error in the single route:", error);
        res.status(500).send("Internal server error");
    }
});

app.get("/privacy", async (req, res) => {
    try {
        const externalData = req.externalData;

        const logo = await getLogo();
        const headerAd = await getHeaderAd();
        const categories = await getAllCategories();
        const editor = await getEditor();

        res.render("privacy", {externalData, logo, headerAd, editor, categories});
    }
    catch (error) {
        console.error("Error serving the privacy route:", error);
        res.status(500).send("Internal server error");
    }
});

app.get("/contact", async (req, res) => {
    try {
        const externalData = req.externalData;

        const logo = await getLogo();
        const headerAd = await getHeaderAd();
        const categories = await getAllCategories();
        const editor = await getEditor();

        res.render("contact", {externalData, logo, headerAd, editor, categories});
    }
    catch (error) {
        console.error("Error serving the privacy route:", error);
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