module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new loan
  router.post("/", tutorials.create);

  // Create a new user location
  router.post("/location", tutorials.location);

  // // Retrieve a single Tutorial with id
  router.get("/:userId", tutorials.findOne);

  // // Update a loan with id
  router.patch("/:id/:amount", tutorials.update);

  app.use("/api", router);
};
