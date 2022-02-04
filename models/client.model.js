const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    Email: {
        type: String,
    },
    Nombres: {
        type: String,
    },
    NTelefono: {
        type: String,
    },
    Motivo: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = clientSchema;