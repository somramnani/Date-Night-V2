var path = require("path");
const router = require("express").Router();

module.exports = function (app) {
  // HTML ROUTES
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/results", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

  app.get("/styles", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
  });
  app.get("/mobile", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stylesheets/mobile.css"));
  });

  //IMAGE ROUTES
  router.get("/backgroundimage", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });
  app.get("/fireworks", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/fireworks.jpg"));
  });

  app.get("/datenight", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });
};

module.exports = router;
