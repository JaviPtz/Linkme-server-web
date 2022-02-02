const User = require("./auth.dao");
// libreria par emcriptar los datos del usuario
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123456";

exports.createUser = (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  };

  //crear usuario
  User.create(newUser, (err, user) => {
    if (err && err.code == 11000)
      return res.status(409).send("Ya me vendite tu alma(email) perro ");

    if (err) return res.status(500).send("error en el servidor");
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: expiresIn,
    });

    //envio de datos al front
    const DataUser = {
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn,
    };

    //response
    res.send({ DataUser });
  });
};

//logear usuario
exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send("error en el servidor");
    if (!user) {
      // correo del usuario no existe
      res.status(409).send({ message: "Algo salio mal perro :V" });
    } else {
      //encriptar la contraseña del usuario al momento de logearse
      const resultPassword = bcrypt.compareSync(
        userData.password,
        user.password
      );
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expiresIn,
        });
        //envio de datos al front
        const DataUser = {
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn,
        };
        res.send({ DataUser });
      } else {
        // contraseña incorecta
        res.status(409).send({ message: "Algo salio mal perro :V" });
      }
    }
  });
};
