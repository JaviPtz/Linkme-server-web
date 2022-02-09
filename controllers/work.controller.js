const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const Works = require('../models/work.model');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({
        message: error,
      });
    }
    return next();
  });
};

//Mostrar Trabajos o proyectos
exports.listWorks = async (req, res, next) => {
  try {
    const works = await Works.find({});
    res.json(works);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//Agregar Trabajo o proyecto
exports.createWorks = async (req, res, next) => {
  const work = new Works(req.body);
  try {
    if (req.file && req.file.filename) {
      work.image = req.file.filename;
    }
    await work.save();
    res.json({ message: "Se agrego un nuevo proyecto o trabajo" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//Mostrar Trabajo o proyecto especificos (id)
exports.showWorks = async (req, res, next) => {
  try {
    const work = await Works.findById(req.params.id);
    if (!work) {
      res.status(404).json({
        message: "Este proyecto o trabajo NO existe",
      });
    }
    res.json(work);
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar la petición",
    });
  }
};

//Actualizar trabajo o proyecto
exports.updateWorks = async (req, res, next) => {
  try {
    // Recatamos la propiedades del trabajo a catualizar
    let newWork = req.body;
    // si se recibe una se guarda su nombre
    if (req.file && req.file.filename) {
      newWork.image = req.file.filename;
    }
    // si no se recibe una imagen colo camos la imagen que esta en la base
    else {
      const work = await Works.findById(req.params.id);
      newWork.image = work.image;
    }
    const workUpdate = await Works.findOneAndUpdate(
      { _id: req.params.id },
      newWork,
      // devuelve el objeto actualizado
      { new: true }
    );
    res.json({ message: "Se actualizo el Trabajo o proyecto" });
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar la petición",
    });
  }
};

// Eliminar trabajo o proyecto
exports.deleteWorks = async (req, res, next) => {
  try {
    await Works.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Se elimino el Proyecto o trabajo" });
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar la petición",
    });
  }
};
