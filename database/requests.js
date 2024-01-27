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
* Consigue todas las categorías
*/
async function getAllCategories() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.allCategories);
    console.log("Request done");
    return rows;
}



/*
* Consigue todos los artículos
*/
async function getAllArticles() {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.allArticles);
    console.log("Request done");
    return rows;
}


/*
* Consigue un artículo en específico
*/
async function getArticleById(articleId) {
    const dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute(statements.articleById, [articleId]);
    console.log("Request done");
    return rows;
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
    getArticleById,
    getAllArticles,
    getAllCategories
};
