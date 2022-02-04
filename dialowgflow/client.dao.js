const mongoose = require('mongoose');
const clientSchema = require('../models/client.model');

clientSchema.statics = {

 createClient: function( data , cb){
     const client = new this(data);
         client.save(cb);
    },
}

const clientModel = mongoose.model('Clients', clientSchema);
module.exports = clientModel;