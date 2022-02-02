'use strict'

const cors = require('cors');

const authRoutes = require('./auth/auth.routes');

const express = require('express');
const propierties = require ('./config/properties')
const DB = require('./config/db');
//init DB
DB();

const app = express();

const router = express.Router();

//BODY PARSER
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);


// por el momento quiero todas las peticiones al server
//revisar la documentacion de cors para definir los host que quiero que se conecten
app.use(cors());
app.use('/api', router)
authRoutes(router);
router.get('/', (req, res)=>{
    res.send('Hola de home')
})

app.use(router);

 app.listen(3000, ()=> console.log(`servidor corriendo en el puerto ${propierties.PORT}`))