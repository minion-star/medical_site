const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based version
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Replace with your actual MySQL password
  database: "emrdb", // Replace with your actual database name
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// API to fetch and parse patient data
app.get("/api/general", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM general");
    // Parse the `INFORMATION` column back into an object
    const patients = rows.map((row) => ({
      ...row,
      INFORMATION: JSON.parse(row.INFORMATION),
    }));
    res.json(patients); // Return all rows with parsed JSON
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST /api/patients
app.post("/api/general", async (req, res) => {
  const {
    CSN,
    FIRST_NAME,
    LAST_NAME,
    PHOTO,
    AGE,
    personalInformation,
    contactInformation,
    workInformation,
    insurance,
    CREATED_DATE,
    CREATED_BY,
    LAST_SAVED_DATE,
    LAST_SAVED_BY,
  } = req.body;

  try {
    // Prepare JSON object for the `INFORMATION` column
    const INFORMATION = JSON.stringify({
      personalInformation,
      contactInformation,
      workInformation,
      insurance,
    });

    // Check if a record with the same CSN exists
    const [existingPatient] = await db.query("SELECT * FROM general WHERE CSN = ?", [CSN]);

    if (existingPatient.length > 0) {
      // Update the existing record
      await db.query(
        `UPDATE general
         SET FIRST_NAME = ?, LAST_NAME = ?, PHOTO = ?, AGE = ?,
             INFORMATION = ?, LAST_SAVED_DATE = ?, LAST_SAVED_BY = ?
         WHERE CSN = ?`,
        [
          FIRST_NAME,
          LAST_NAME,
          PHOTO,
          AGE,
          INFORMATION,
          LAST_SAVED_DATE,
          LAST_SAVED_BY,
          CSN,
        ]
      );
    } else {
      // Insert a new record
      await db.query(
        `INSERT INTO general (
           CSN, FIRST_NAME, LAST_NAME, PHOTO, AGE,
           INFORMATION, CREATED_DATE, CREATED_BY, LAST_SAVED_DATE, LAST_SAVED_BY
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          CSN,
          FIRST_NAME,
          LAST_NAME,
          PHOTO,
          AGE,
          INFORMATION,
          CREATED_DATE,
          CREATED_BY,
          LAST_SAVED_DATE,
          LAST_SAVED_BY,
        ]
      );
    }

    res.status(200).send("Patient saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
