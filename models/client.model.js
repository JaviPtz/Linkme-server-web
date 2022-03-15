const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    namesS: {
        type: String,
    },
    email: {
        type: String,
    },
    numberPhone: {
        type: String,
    },
    reason: {
        type: String,
    }
},{
},{
    timestamps: true
});

module.exports = mongoose.model('Clients', workSchema);