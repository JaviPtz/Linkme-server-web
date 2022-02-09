const multer = require("multer");
const shortid = require("shortid");

const multerConfig = {
  storage: (FileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      //otener la extencion del archivo
      const extension = file.mimetype.split("/")[1];
      //generar ID para ponerlo como nombre de imagen
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido solo PGN O JPEG"));
    }
  },
};

module.exports = multerConfig;
