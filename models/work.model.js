const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    titulo: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    image: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Works', workSchema);