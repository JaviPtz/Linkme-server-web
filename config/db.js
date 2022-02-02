const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = ()=>{
    mongoose.connect(dbURL, {useNewUrlParser: true})
    .then(()=> console.log(`mongo conectado en ${dbURL}`))
    .catch(err => console.log(`la conexion tuvo un error ${err}`))

    process.on('SIGINT', ()=>{
        mongoose.connection.close(()=>{
            console.log(`mongo esta desconectado`);
            process.exit(0)
        });
    });
}