const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based version
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

// Serve static files from the "photo" directory
app.use("/photo", express.static(path.join(__dirname, "photo")));

// Configure Multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "photo");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder exists
      }
      cb(null, uploadPath); // Save files in the "photo" folder
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExt = path.extname(file.originalname);
      cb(null, `avatar-${uniqueSuffix}${fileExt}`); // Unique file name
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
// POST /api/patients
app.post("/api/general",upload.single("photo"), async (req, res) => {
  const {
    CSN,
    FIRST_NAME,
    LAST_NAME,
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
    const PHOTO = req.file ? `photo/${req.file.filename}` : null;
  try {
    
    // Prepare JSON object for the `INFORMATION` column
    const INFORMATION = JSON.stringify({
      personalInformation:JSON.parse(personalInformation),
      contactInformation:JSON.parse(contactInformation),
      workInformation:JSON.parse(workInformation),
      insurance:JSON.parse(insurance),
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

app.get("/api/general/:csn", async (req, res) => {
    const { csn } = req.params;
  
    try {
      const [rows] = await db.query("SELECT * FROM general WHERE CSN = ?", [csn]);
      if (rows.length === 0) {
        return res.status(404).send("Patient not found");
      }
      
      // Parse the `INFORMATION` column back into an object
      const patient = {
        ...rows[0],
        INFORMATION: JSON.parse(rows[0].INFORMATION),
      };
      res.json(patient);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });



app.get("/api/history/:csn", async (req, res) => {
    const { csn } = req.params;
  
    try {
      const [rows] = await db.query("SELECT * FROM history WHERE CSN = ?", [csn]);
      if (rows.length === 0) {
        return res.status(404).send("Patient not found");
      }
      
      // Parse the `INFORMATION` column back into an object
      const patient = {
        ...rows[0],
        KNOWN_ALLERGIES: JSON.parse(rows[0].KNOWN_ALLERGIES), 
        HEALTH_MAINTENANCE: JSON.parse(rows[0].HEALTH_MAINTENANCE), 
        FAMILY_HISTORY: JSON.parse(rows[0].FAMILY_HISTORY), 
        SOCIAL_HISTORY: JSON.parse(rows[0].SOCIAL_HISTORY), 
        MASTER_PROBLEM_LIST: JSON.parse(rows[0].MASTER_PROBLEM_LIST), 
        MASTER_MEDICATION_LIST: JSON.parse(rows[0].MASTER_MEDICATION_LIST)
      };
      res.json(patient);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
});


app.post('/api/history', async (req, res) => {
  const data = req.body;  // Incoming data from the frontend
  const { CSN } = data;

  try {
    const checkQuery = `SELECT * FROM history WHERE CSN = ?`;
    const existingRecord = await db.query(checkQuery, [CSN]);

    if (existingRecord.length > 0) {
      // CSN exists, perform an UPDATE query
      const updateQuery = `
        UPDATE history SET 
          PAST_MEDICAL_HISTORY = ?, 
          PAST_SURGICAL_HISTORY = ?, 
          KNOWN_ALLERGIES = ?, 
          HEALTH_MAINTENANCE = ?, 
          FAMILY_HISTORY = ?, 
          SOCIAL_HISTORY = ?, 
          MASTER_PROBLEM_LIST = ?, 
          MASTER_MEDICATION_LIST = ? 
        WHERE CSN = ?`;

      // Stringify JSON data before storing it
      await db.query(updateQuery, [
        data.PAST_MEDICAL_HISTORY,
        data.PAST_SURGICAL_HISTORY,
        JSON.stringify(data.KNOWN_ALLERGIES),  // Stringify the JSON data
        JSON.stringify(data.HEALTH_MAINTENANCE),
        JSON.stringify(data.FAMILY_HISTORY),
        JSON.stringify(data.SOCIAL_HISTORY),
        JSON.stringify(data.MASTER_PROBLEM_LIST),
        JSON.stringify(data.MASTER_MEDICATION_LIST),
        CSN,
      ]);
      return res.json({ message: "Record updated successfully" });
    } else {
      // CSN doesn't exist, perform an INSERT query
      const insertQuery = `
        INSERT INTO history (
          CSN, 
          PAST_MEDICAL_HISTORY, 
          PAST_SURGICAL_HISTORY, 
          KNOWN_ALLERGIES, 
          HEALTH_MAINTENANCE, 
          FAMILY_HISTORY, 
          SOCIAL_HISTORY, 
          MASTER_PROBLEM_LIST, 
          MASTER_MEDICATION_LIST
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      // Stringify JSON data before storing it
      await db.query(insertQuery, [
        CSN,
        data.PAST_MEDICAL_HISTORY,
        data.PAST_SURGICAL_HISTORY,
        JSON.stringify(data.KNOWN_ALLERGIES),
        JSON.stringify(data.HEALTH_MAINTENANCE),
        JSON.stringify(data.FAMILY_HISTORY),
        JSON.stringify(data.SOCIAL_HISTORY),
        JSON.stringify(data.MASTER_PROBLEM_LIST),
        JSON.stringify(data.MASTER_MEDICATION_LIST),
      ]);
      return res.json({ message: "New record added successfully" });
    }
  } catch (err) {
    console.error("Error during database operation:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


app.get('/api/encounter/:id', async (req, res) => {
  const { id } = req.params;  // CSN (encounter ID)

  try {
    // SQL query to fetch encounter data by CSN
    const query = 'SELECT * FROM encounter WHERE CSN = ?';
    const [record] = await db.query(query, [id]);

    if (record.length > 0) {
      // Fetch medications related to the encounter
      const medicationsQuery = 'SELECT * FROM medications WHERE encounter_id = ?';
      const [medications] = await db.query(medicationsQuery, [id]);

      // Fetch orders related to the encounter
      const ordersQuery = 'SELECT * FROM orders WHERE encounter_id = ?';
      const [orders] = await db.query(ordersQuery, [id]);

      // Fetch procedures related to the encounter
      const proceduresQuery = 'SELECT * FROM procedures WHERE encounter_id = ?';
      const [procedures] = await db.query(proceduresQuery, [id]);

      // If record exists, send the data back in the response
      res.json({
        head: record[0].HEAD,
        reviewOfSystems: record[0].REVIEW,
        chief: record[0].CHIEF,
        historyOfIllness: record[0].HISTORY,
        vitalSigns: record[0].VITAL,
        physicalExamination: record[0].PHYSICAL,
        open: record[0].OPEN,
        meeting: record[0].MEETING,
        presentIllness: record[0].PRESENTILLNESS,
        medications: medications, // Return medications for the encounter
        orders: orders,           // Return orders for the encounter
        procedures: procedures,   // Return procedures for the encounter
      });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


app.post('/api/encounter', async (req, res) => {
  const {
    id,
    head,
    reviewOfSystems,
    chief,
    historyOfIllness,
    vitalSigns,
    physicalExamination,
    meeting,
    open,
    presentIllness,
    medications,
    orders,       // Adding orders to the request body
    procedures    // Adding procedures to the request body
  } = req.body;

  try {
    // Adding a delay of 2 seconds before processing the request
    setTimeout(async () => {
      // Serialize fields into JSON strings
      const headJson = JSON.stringify(head);
      const reviewJson = JSON.stringify(reviewOfSystems);
      const chiefJson = JSON.stringify(chief);
      const historyJson = JSON.stringify(historyOfIllness);
      const vitalJson = JSON.stringify(vitalSigns);
      const physicalJson = JSON.stringify(physicalExamination);
      const meetingJson = JSON.stringify(meeting);
      const openJson = JSON.stringify(open);
      const presentIllnessJson = JSON.stringify(presentIllness);

      // SQL query to check if the CSN exists
      const checkCSNQuery = 'SELECT * FROM encounter WHERE CSN = ?';
      const [existingRecord] = await db.query(checkCSNQuery, [id]);

      if (existingRecord.length > 0) {
        // CSN exists, perform an UPDATE query
        const updateQuery = `
          UPDATE encounter 
          SET HEAD = ?, REVIEW = ?, CHIEF = ?, HISTORY = ?, VITAL = ?, PHYSICAL = ?, MEETING = ?, OPEN = ?, PRESENTILLNESS = ?
          WHERE CSN = ?
        `;
        const updateParams = [
          headJson, reviewJson, chiefJson, historyJson, vitalJson, physicalJson, meetingJson, openJson, presentIllnessJson, id,
        ];
        await db.query(updateQuery, updateParams);

        // Optionally delete existing medications before inserting new ones
        const deleteMedicationsQuery = 'DELETE FROM medications WHERE encounter_id = ?';
        await db.query(deleteMedicationsQuery, [id]);

        // Insert the medications into the database
        if (medications && medications.length > 0) {
          const insertMedicationQuery = `
            INSERT INTO medications (order_type, qty, refills, sig, rx, encounter_id)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          for (let medication of medications) {
            const { order, qty, refills, sig, rx } = medication;
            const insertMedicationParams = [order, qty, refills, sig, rx, id];
            await db.query(insertMedicationQuery, insertMedicationParams);
          }
        }

        // Delete existing orders before inserting new ones
        const deleteOrdersQuery = 'DELETE FROM orders WHERE encounter_id = ?';
        await db.query(deleteOrdersQuery, [id]);

        // Insert the orders into the database
        if (orders && orders.length > 0) {
          const insertOrderQuery = `
            INSERT INTO orders (order_type, requisition, encounter_id)
            VALUES (?, ?, ?)
          `;
          for (let order of orders) {
            const { order: orderType, requisition } = order;
            const insertOrderParams = [orderType, requisition, id];
            await db.query(insertOrderQuery, insertOrderParams);
          }
        }

        // Delete existing procedures before inserting new ones
        const deleteProceduresQuery = 'DELETE FROM procedures WHERE encounter_id = ?';
        await db.query(deleteProceduresQuery, [id]);

        // Insert the procedures into the database
        if (procedures && procedures.length > 0) {
          const insertProcedureQuery = `
            INSERT INTO procedures (code, description, note, encounter_id)
            VALUES (?, ?, ?, ?)
          `;
          for (let procedure of procedures) {
            const { code, description, note } = procedure;
            const insertProcedureParams = [code, description, note, id];
            await db.query(insertProcedureQuery, insertProcedureParams);
          }
        }

        return res.json({ message: "Data updated successfully" });
      } else {
        // CSN does not exist, perform an INSERT query
        const insertQuery = `
          INSERT INTO encounter (CSN, HEAD, REVIEW, CHIEF, HISTORY, VITAL, PHYSICAL, MEETING, OPEN, PRESENTILLNESS)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const insertParams = [
          id, headJson, reviewJson, chiefJson, historyJson, vitalJson, physicalJson, meetingJson, openJson, presentIllnessJson
        ];
        const result = await db.query(insertQuery, insertParams);
        const newCSN = result.insertId; // Get the new encounter ID (CSN)

        // Insert medications into the database
        if (medications && medications.length > 0) {
          const insertMedicationQuery = `
            INSERT INTO medications (order_type, qty, refills, sig, rx, encounter_id)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          for (let medication of medications) {
            const { order, qty, refills, sig, rx } = medication;
            const insertMedicationParams = [order, qty, refills, sig, rx, newCSN];
            await db.query(insertMedicationQuery, insertMedicationParams);
          }
        }

        // Insert orders into the database
        if (orders && orders.length > 0) {
          const insertOrderQuery = `
            INSERT INTO orders (order_type, requisition, encounter_id)
            VALUES (?, ?, ?)
          `;
          for (let order of orders) {
            const { order: orderType, requisition } = order;
            const insertOrderParams = [orderType, requisition, newCSN];
            await db.query(insertOrderQuery, insertOrderParams);
          }
        }

        // Insert procedures into the database
        if (procedures && procedures.length > 0) {
          const insertProcedureQuery = `
            INSERT INTO procedures (code, description, note, encounter_id)
            VALUES (?, ?, ?, ?)
          `;
          for (let procedure of procedures) {
            const { code, description, note } = procedure;
            const insertProcedureParams = [code, description, note, newCSN];
            await db.query(insertProcedureQuery, insertProcedureParams);
          }
        }

        return res.json({ message: "Data inserted successfully" });
      }
    }, 2000); // Delay of 2 seconds
  } catch (err) {
    console.error("Error during database operation:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
