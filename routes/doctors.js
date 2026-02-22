const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // Show Doctors Page
  router.get("/", (req, res) => {
    db.all("SELECT * FROM doctors", [], (err, rows) => {
      if (err) return res.send("Error fetching doctors");
      res.render("doctors", { doctors: rows });
    });
  });

  // Add Doctor
  router.post("/add", (req, res) => {
    const { name, specialization } = req.body;

    db.run(
      "INSERT INTO doctors (name, specialization) VALUES (?, ?)",
      [name, specialization],
      function (err) {
        if (err) return res.send("Error adding doctor");
        res.redirect("/doctors");
      }
    );
  });

  return router;
};