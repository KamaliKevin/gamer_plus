// INSTANCIAS:
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql2/promise");
const ejs = require("ejs");
const path = require("path");

const app = express();


// MIDDLEWARE:
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.static(path.join(__dirname, "public"))); // Hacer que el directorio 'public' sea el directorio estático


// CONFIGURACIÓN:
app.set("view engine", "ejs"); // Usar EJS (Embedded JavaScript) como motor de plantillas
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};


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


// RUTAS:
app.get("/", async (req, res) => {
    try {
        // Ejemplo de solicitud a una API externa
        const externalApiResponse = await axios.get("https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/London");
        const externalData = externalApiResponse.data;

        // Ejemplo de consulta a la base de datos MySQL
        // const dbConnection = await connectToDatabase();
        // const [dbResults] = await dbConnection.execute("");

        // Devolver 'index' como vista con datos
        res.render("index", { externalData });
    }
    catch (error) {
        console.error("Error in the main route:", error);
        res.status(500).send("Internal server error");
    }
});

app.get("/category", async (req, res) => {
   try {
        res.render("category");
   }
   catch (error) {
       console.error("Error in the category route:", error);
       res.status(500).send("Internal server error");
   }
});

app.get("/single", async (req, res) => {
    try {
        res.render("single");
    }
    catch (error) {
        console.error("Error in the category route:", error);
        res.status(500).send("Internal server error");
    }
});


// PUERTO:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});