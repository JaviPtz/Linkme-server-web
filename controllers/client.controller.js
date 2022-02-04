const Client = require("../dialowgflow/client.dao");

exports.createClient = (req, res, next) => {


  const newClient = {
    Email: req.body.Email,
    Nombres: req.body.Nombres,
    NTelefono: req.body.NTelefono,
    Motivo: req.body.Motivo,
  };

  //crear cliente
  Client.create(newClient, (err, client) => {
    if (err) return res.status(500).send("error en el servidor cliente");

    //envio de datos al front
    const DataUser = {
        Email: client.Email,
        Nombres: client.Nombres,
        NTelefono: client.NTelefono,
        Motivo: client.Motivo,
    };

    //response
    res.send({ DataUser });
    console.log(newClient)
  });
};
