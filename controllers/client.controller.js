
const ClientModel = require('../models/client.model');


//Mostrar Clientes
exports.listClients = async (req, res, next) => {
  try {
    const client = await ClientModel.find({});
    res.json(client);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//El metodo para agregar clientes esta en la ruta dialogflow/dialogflow.js
exports.createClient = async (req, res, next) => {

};

//Mostrar Trabajo o proyecto especificos (id)
exports.showClient = async (req, res, next) => {
  try {
    const client = await ClientModel.findById(req.params.id);
    if (!client) {
      res.status(404).json({
        message: "El cliente solicitado No existe",
      });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar la petición",
    });
  }
};

//Actualizar la solicitud del cliente
exports.updateClients = async (req, res, next) => {
  try {
    const clientUpdate = await ClientModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      // devuelve el objeto actualizado
      { new: true }
    );
    res.json({ message: "Se actualizo el estado del cliente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar la petición",
    });
  }
};

// Eliminar Clientes
exports.deleteClients = async (req, res, next) => {
  try {
    await ClientModel.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Se elimino el Cliente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar la petición",
    });
  }
};
