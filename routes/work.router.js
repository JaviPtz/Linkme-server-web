// works
const worksController = require("../controllers/work.controller");
const Chat = require("../dialowgflow/dialowgflow");

module.exports = (router) => {
  //rutas para trabajos o proyectos (works)
  router.get("/work", worksController.listWorks);
  router.post("/work", worksController.fileUpload, 
  worksController.createWorks);
  router.get("/work/:id", worksController.showWorks);
  router.put("/work/:id", worksController.fileUpload, worksController.updateWorks);
  router.delete("/work/:id", worksController.deleteWorks);

  //ruta dialogflow
  // router.post("/webhook", Chat.Chat);

};

