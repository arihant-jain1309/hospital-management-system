const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // Show Patients Page
  router.get("/", (req, res) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
      if (err) return res.send("Error fetching patients");
      res.render("patients", { patients: rows });
    });
  });

  // Add Patient
  router.post("/add", (req, res) => {
    const { name, age, gender, contact } = req.body;

    db.run(
      "INSERT INTO patients (name, age, gender, contact) VALUES (?, ?, ?, ?)",
      [name, age, gender, contact],
      function (err) {
        if (err) return res.send("Error adding patient");
        res.redirect("/patients");
      }
    );
  });

  return router;
};