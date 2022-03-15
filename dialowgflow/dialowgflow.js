//fullfilment dialogglow
const { WebhookClient } = require("dialogflow-fulfillment");

//sendgrid
const sgMail = require('../services/sendgrid');

let email;
let nameS;
let numberPhone;
let reason;

exports.Chat = (req, res, next) => {
  const agent = new WebhookClient({ request: req, response: res });
  // console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  // console.log("Dialogflow Request body: " + JSON.stringify(req.body));
  let emailPersonal ="jam.pastaz@yavirac.edu.ec";

  /* Crear tramite */
  function solicitarTramite(agent) {
    email = agent.parameters["Email"];
    nameS = agent.parameters["Nombres"];
    numberPhone = agent.parameters["NTelefono"];
    reason = agent.parameters["Motivo"];
    // Estado = "PENDIENTE";

    // Envio correo con sendgrid
    const msg = {
      to: email, // Change to your recipient
      from: emailPersonal, // Change to your verified sender
      templateId: "d-99a6557d14f0473190339f7391d82106",
      dynamic_template_data: { nameS, email, numberPhone, reason },
    };
    sgMail.send(msg);
    console.log(`Datos enviados \n Nombres:${nameS} Email: ${email} Teléfono:${numberPhone}  Motivo:${reason} `)

    if(agent.locale === 'es'){
      agent.add("La solicitud para tu cita fue registrado correctamente.✅");
      agent.add("Estaremos en contacto contigo" + " " + nameS);
      agent.add("Eso es todo cuídate :)");
    } else if (agent.locale == 'en'){
      agent.add("that's all " + nameS);
      agent.add("take care C:");
    }
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  // It maps the intent 'Make Appointment' to the function 'makeAppointment()'
  intentMap.set("Solicitud.crear", solicitarTramite);
  agent.handleRequest(intentMap);
  return next();
};

/* const Clients = require('../models/client.model') */


//Agregar Trabajo o proyecto
// exports.DataClients = async (req, res, next) => {
//  let client = new Clients({
//     namesS: nameS,
//     email: email,
//     numberPhone: numberPhone,
//     reason: reason,
//   })
//   try {
//     await client.save();
//     res.json({ message: "Se agrego un cliente" });
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// };