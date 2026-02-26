const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Database Connection
const db = new sqlite3.Database("./hospital.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      contact TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      specialization TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      appointment_date TEXT,
      FOREIGN KEY(patient_id) REFERENCES patients(id),
      FOREIGN KEY(doctor_id) REFERENCES doctors(id)
    )
  `);
});

// Routes
const patientRoutes = require("./routes/patients")(db);
const doctorRoutes = require("./routes/doctors")(db);
const appointmentRoutes = require("./routes/appointments")(db);

app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});// learning git stage 1
// login feature work

// change from conflict branch
 conflict-feature
// change from another developer
// new change in main
