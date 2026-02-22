const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // Show Appointment Page
  router.get("/", (req, res) => {

    db.all("SELECT * FROM patients", [], (err, patients) => {
      if (err) return res.send("Error fetching patients");

      db.all("SELECT * FROM doctors", [], (err, doctors) => {
        if (err) return res.send("Error fetching doctors");

        db.all(`
          SELECT appointments.id,
                 patients.name AS patient_name,
                 doctors.name AS doctor_name,
                 appointment_date
          FROM appointments
          JOIN patients ON appointments.patient_id = patients.id
          JOIN doctors ON appointments.doctor_id = doctors.id
        `, [], (err, appointments) => {
          if (err) return res.send("Error fetching appointments");

          res.render("appointments", {
            patients,
            doctors,
            appointments
          });
        });
      });
    });
  });

  // Add Appointment
  router.post("/add", (req, res) => {
    const { patient_id, doctor_id, appointment_date } = req.body;

    db.run(
      "INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)",
      [patient_id, doctor_id, appointment_date],
      function (err) {
        if (err) return res.send("Error booking appointment");
        res.redirect("/appointments");
      }
    );
  });

  return router;
};