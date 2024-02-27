// CONFIGURACIÓN:
require('dotenv').config();
const { statements } = require("./statements");
const mysql = require("mysql2/promise");

const pool = mysql.createPool(  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


// VARIABLES:
let dbConnection;


// PETICIONES:
/*
* Consigue la información de un autor según el ID del artículo
*/
async function getAuthorByArticleId(articleId) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.authorByArticleId, [articleId]);
        console.log("Author by article ID request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue la información del editor
*/
async function getEditor() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.editor);
        console.log("Editor request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los adelantos de todos los videos
*/
async function getVideoPreviews() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.videoPreviews);
        console.log("All video previews request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue la publicidad para un artículo
*/
async function getSingleAd() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.singleAd);
        console.log("Single ad request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue toda la publicidad secundaria
*/
async function getAsideAds() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.asideAds);
        console.log("All aside ads request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todas las categorías
*/
async function getAllCategories() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.categories);
        console.log("All categories request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue los artículos según la categoría
*/
async function getArticlesByCategory(categoryName) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.articlesByCategory, [categoryName]);
        console.log("Articles by category request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue el artículo destacado según la categoría
*/
async function getFeatureArticleByCategory(categoryName) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.featureArticleByCategory, [categoryName]);
        console.log("Feature article by category request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos relacionado a otro
*/
async function getRelatedArticles(categoryName, articleId) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.relatedArticles, [categoryName, articleId]);
        console.log("All related articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos más populares
*/
async function getPopularArticles() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.popularArticles);
        console.log("All latest articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos más recientes
*/
async function getLatestArticles() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.latestArticles);
        console.log("All latest articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos Nintendo de lista
*/
async function getNintendoListArticles() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.nintendoListArticles);
        console.log("All Nintendo list articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue el artículo Nintendo destacado
*/
async function getNintendoFeatureArticle() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.nintendoFeatureArticle);
        console.log("Nintendo feature article request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos PlayStation de lista
*/
async function getPlaystationListArticles() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.playstationListArticles);
        console.log("All PlayStation list articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue el artículo PlayStation destacado
*/
async function getPlaystationFeatureArticle() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.playstationFeatureArticle);
        console.log("PlayStation feature article request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos esports destacados
*/
async function getEsportsFeatureArticles() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.esportsFeatureArticles);
        console.log("All Esports feature articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos del carrusel
*/
async function getCarouselArticles() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.carouselArticles);
        console.log("All carousel articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue todos los artículos
*/
async function getAllArticles() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.articles);
        console.log("All articles request done");
        return rows;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}


/*
* Consigue un artículo en específico mediante el ID
*/
async function getArticleById(articleId) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.articleById, [articleId]);
        console.log("Article by ID request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue la publicidad principal
*/
async function getHeaderAd() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.headerAd);
        console.log("Header ad request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Consigue el logo
*/
async function getLogo() {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.logo);
        console.log("Logo request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/**
 * Consigue la cantidad de visitas de un artículo
 */
async function getViewsByArticle(articleId){
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.viewsByArticle, [articleId]);
        console.log("Views request done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/**
 * Graba una visita de un artículo
 */
async function recordArticleVisit(routeName, visitorIp, articleId) {
    try {
        dbConnection = await connectToDatabase();
        await dbConnection.execute(statements.recordVisit, [routeName, visitorIp, articleId]);
        console.log("Record visit request done");
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/**
 * Comprueba si una IP visitó recientemente un artículo o no
 */
async function checkRecentVisit(visitorIp, articleId) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.checkRecentVisit, [visitorIp, articleId]);
        console.log("Record visit request done");
        return rows.length > 0;
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/**
 * Consigue la información de perfil de un autor
 */
async function getAuthorProfile(username) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.authorProfile, [username]);
        console.log("Author profile details retrieved");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/**
 * Comprueba la información de sesión de inicio de un autor
 */
async function checkAuthorLogin(username) {
    try {
        dbConnection = await connectToDatabase();
        const [rows, fields] = await dbConnection.execute(statements.authorLogin, [username]);
        console.log("Author login check done");
        return rows[0];
    }
    catch (error) {
        console.error("Error executing database query:", error);
    }
    finally {
        if (dbConnection) {
            await releaseConnection(dbConnection);
        }
    }
}

/*
* Conecta a la base de datos
*/
async function connectToDatabase() {
    try {
        return await pool.getConnection();
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}

/*
* Desconecta de la base de datos para no sobrecargar las llmadas a la base de datos
*/
async function releaseConnection(connection) {
    try {
        connection.release();
    }
    catch (error) {
        console.error("Error releasing database connection: ", error);
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
    getCarouselArticles,
    getEsportsFeatureArticles,
    getPlaystationFeatureArticle,
    getPlaystationListArticles,
    getNintendoFeatureArticle,
    getNintendoListArticles,
    getLatestArticles,
    getPopularArticles,
    getAsideAds,
    getSingleAd,
    getVideoPreviews,
    getEditor,
    getAuthorByArticleId,
    getFeatureArticleByCategory,
    getArticlesByCategory,
    checkRecentVisit,
    recordArticleVisit,
    getViewsByArticle,
    getRelatedArticles,
    checkAuthorLogin,
    getAuthorProfile
};
