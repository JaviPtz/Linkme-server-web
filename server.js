"use strict";

// librerias
const express = require("express");
const cors = require("cors");

const app = express();
const router = express.Router();

// importacion de las rutas
const authRoutes = require("./routes/auth.routes");
const workRoutes = require('./routes/work.router')
const dialowgflowRoutes = require('./routes/dialowgflow.routes')

//inicializar la conexion con mongo
const propierties = require("./config/properties");
const DB = require("./config/db");
//init DB
DB();

//BODY PARSER
const bodyParser = require("body-parser");
const { path } = require("./models/auth.model");
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// por el momento quiero todas las peticiones al server
//revisar la documentacion de cors para definir los host que quiero que se conecten
app.use(cors());

app.use("/api", router);
authRoutes(router);
workRoutes(router);
dialowgflowRoutes(router);

app.use(express.static('uploads'));

router.get("/", (req, res) => {
  res.send("Hola de home");
});

app.use(router);

app.listen(3000, () =>
  console.log(`servidor corriendo en el puerto ${propierties.PORT}`)
);
