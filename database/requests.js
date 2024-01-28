// CONFIGURACIÓN:
require('dotenv').config();
const { statements } = require("./statements");
const mysql = require("mysql2/promise");

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};


// PETICIONES:
/*
* Consigue todos los adelantos de todos los videos
*/
async function getAllVideoPreviews() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.videoPreviews);
    console.log("All video previews request done");
    return rows;
}

/*
* Consigue toda la publicidad secundaria
*/
async function getAllAsideAds() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.asideAds);
    console.log("All aside ads request done");
    return rows;
}

/*
* Consigue todas las categorías
*/
async function getAllCategories() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.categories);
    console.log("All categories request done");
    return rows;
}

/*
* Consigue todos los artículos más recientes
*/
async function getAllLatestArticles() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.latestArticles);
    console.log("All latest articles request done");
    return rows;
}

/*
* Consigue todos los artículos Nintendo de lista
*/
async function getAllNintendoListArticles() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.nintendoListArticles);
    console.log("All Nintendo list articles request done");
    return rows;
}

/*
* Consigue el artículo Nintendo destacado
*/
async function getNintendoFeatureArticle() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.nintendoFeatureArticle);
    console.log("Nintendo feature article request done");
    return rows[0];
}

/*
* Consigue todos los artículos PlayStation de lista
*/
async function getAllPlaystationListArticles() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.playstationListArticles);
    console.log("All PlayStation list articles request done");
    return rows;
}

/*
* Consigue el artículo PlayStation destacado
*/
async function getPlaystationFeatureArticle() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.playstationFeatureArticle);
    console.log("PlayStation feature article request done");
    return rows[0];
}

/*
* Consigue todos los artículos esports destacados
*/
async function getAllEsportsFeatureArticles() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.esportsFeatureArticles);
    console.log("Esports feature articles request done");
    return rows;
}

/*
* Consigue todos los artículos del carrusel
*/
async function getAllCarouselArticles() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.carouselArticles);
    console.log("All carousel articles request done");
    return rows;
}

/*
* Consigue todos los artículos
*/
async function getAllArticles() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.articles);
    console.log("All articles request done");
    return rows;
}


/*
* Consigue un artículo en específico
*/
async function getArticleById(articleId) {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.articleById, [articleId]);
    console.log("Article by ID request done");
    return rows;
}

/*
* Consigue la publicidad principal
*/
async function getHeaderAd() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.headerAd);
    console.log("Header ad request done");
    return rows[0];
}

/*
* Consigue el logo
*/
async function getLogo() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.logo);
    console.log("Logo request done");
    return rows[0];
}

/*
* Conecta a la base de datos
*/
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Connected to the database. Running request...");
        return connection;
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}


// EXPORTACIÓN:
module.exports = {
    getLogo,
    getHeaderAd,
    getArticleById,
    getAllArticles,
    getAllCategories,
    getAllCarouselArticles,
    getAllEsportsFeatureArticles,
    getPlaystationFeatureArticle,
    getAllPlaystationListArticles,
    getNintendoFeatureArticle,
    getAllNintendoListArticles,
    getAllLatestArticles,
    getAllAsideAds,
    getAllVideoPreviews
};
