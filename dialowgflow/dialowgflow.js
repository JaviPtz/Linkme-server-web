//fullfilment dialogglow
const { WebhookClient } = require("dialogflow-fulfillment");
// const { Card, Suggestion } = require("dialogflow-fulfillment");

const Client = require("../dialowgflow/client.dao");
const ClienteNuevo = require("../models/client.model");

//sendgrid
const sgMail = require("@sendgrid/mail");
//api key sendgrid
sgMail.setApiKey(
  "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"
);

exports.Chat = (req, res, next) => {
  const agent = new WebhookClient({ request: req, response: res });
  // console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  // console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  let email;
  let nombres;
  let nTelefono;
  let motivo;

  let emailPersonal ="jam.pastaz@yavirac.edu.ec"

  /* Crear tramite */
  function crearTramite(agent) {
    email = agent.parameters["Email"];
    nombres = agent.parameters["Nombres"];
    nTelefono = agent.parameters["NTelefono"];
    motivo = agent.parameters["Motivo"];
    // NroSeguimiento = Date.now();
    // Estado = "PENDIENTE";

    /* envio correo con sendgrid */
    const msg = {
      to: [email, emailPersonal], // Change to your recipient
      from: "jam.pastaz@yavirac.edu.ec", // Change to your verified sender
      templateId: "d-99a6557d14f0473190339f7391d82106",
      dynamic_template_data: { nombres, nTelefono, motivo },
    };
    sgMail.send(msg);

    agent.add("La solicitud para tu cita fue registrado correctamente.✅");
    agent.add("Estaremos en contacto contigo" + " " + nombres);
    agent.add("Eso es todo cuídate :)");
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  // It maps the intent 'Make Appointment' to the function 'makeAppointment()'
  intentMap.set("Tramites.crear", crearTramite);
  agent.handleRequest(intentMap);
};
