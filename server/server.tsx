const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based version
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key";
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
app.post("/api/addBlankPatient", async (req, res) => {
    try {
      // Fetch the last CSN from the database
      const [lastCSNResult] = await db.query("SELECT CSN FROM general ORDER BY CSN DESC LIMIT 1");
        let newCSN = "000-00-0001"; // Default if there are no existing records

        if (lastCSNResult.length > 0) {
            const lastCSN = lastCSNResult[0].CSN; // e.g., "000-00-0001"
            const match = lastCSN.match(/(\d+)$/); // Extract numeric part

            if (match) {
                const lastNumber = parseInt(match[1], 10); // Convert to integer
                const incrementedNumber = (lastNumber + 1).toString().padStart(4, "0"); // Ensure four digits
                newCSN = `000-00-${incrementedNumber}`; // Reconstruct CSN
            }
        }
  
      // Create a blank patient with empty or default values
      const blankPatient = {
        CSN: newCSN, // Use the incremented CSN
        FIRST_NAME: "",    // Empty FIRST_NAME
        LAST_NAME: "",     // Empty LAST_NAME
        PHOTO: "",         // Empty PHOTO (empty string or placeholder image)
        AGE: "",          // Default AGE (set to 0 or an empty string)
        INFORMATION: {
          personalInformation: {
            id: "",
            mrn: "",
            dob: "",
            gender: "",
            marriage: "",
            siblings: "",
            race: "",
            pharmacy: "",
            other: "",
          },
          contactInformation: {
            address: "",
            city: "",
            postcode: "",
            country: "",
            state: "",
            homeph: "",
            cellph: "",
            email: "",
            emergency: "",
          },
          insurance: {
            carrier: "",
            address: "",
            city: "",
            postcode: "",
            country: "",
            state: "",
            phone: "",
            facsimile: "",
            plan: "",
            expiry: "",
            idno: "",
            groupno: "",
            copay: "",
            authno: "",
            remarks: "",
            relation: "",
            homeph: "",
            lastname: "",
            firstname: "",
            mi: "",
            dob: "",
            gender: "",
          },
          workInformation: {
            status: "",
            workph: "",
            employer: "",
          },
        },
        CREATED_DATE: new Date(),
        CREATED_BY: "",     // Empty CREATED_BY
        LAST_SAVED_DATE: new Date(),
        LAST_SAVED_BY: "",  // Empty LAST_SAVED_BY
      };
  
      // Convert blank patient data to a JSON string
      const INFORMATION = JSON.stringify(blankPatient.INFORMATION);
  
      // Insert a new blank row in the database with the incremented CSN
      const query = `
        INSERT INTO general (
          CSN, FIRST_NAME, LAST_NAME, PHOTO, AGE, INFORMATION, CREATED_DATE, CREATED_BY, LAST_SAVED_DATE, LAST_SAVED_BY
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        blankPatient.CSN,
        blankPatient.FIRST_NAME,
        blankPatient.LAST_NAME,
        blankPatient.PHOTO,
        blankPatient.AGE,
        INFORMATION,
        blankPatient.CREATED_DATE,
        blankPatient.CREATED_BY,
        blankPatient.LAST_SAVED_DATE,
        blankPatient.LAST_SAVED_BY,
      ];
  
      // Execute the query to insert the blank row
      await db.query(query, values);
  
      // Respond with a success message
      res.status(200).send(newCSN);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });  
  
  


app.get("/api/history/:id", async (req, res) => {
  const { id } = req.params;  // CSN (encounter ID)

  try {
    // SQL query to fetch encounter data by CSN
    const query = 'SELECT * FROM history WHERE CSN = ?';
    const [record] = await db.query(query, [id]);
    if (record.length > 0) {
      // Fetch masterproblemlists related to the encounter
      const masterproblemlistQuery = 'SELECT * FROM masterproblemlist WHERE CSN = ?';
      const [masterProblemLists] = await db.query(masterproblemlistQuery, [id]);

      // Fetch mastermedicationlist related to the encounter
      const mastermedicationlistQuery = 'SELECT * FROM mastermedicationlist WHERE CSN = ?';
      const [masterMedicationLists] = await db.query(mastermedicationlistQuery, [id]);
      // If record exists, send the data back in the response
      res.json({
        PAST_MEDICAL_HISTORY: record[0].PAST_MEDICAL_HISTORY,
        PAST_SURGICAL_HISTORY: record[0].PAST_SURGICAL_HISTORY,
        KNOWN_ALLERGIES: record[0].KNOWN_ALLERGIES,
        HEALTH_MAINTENANCE: record[0].HEALTH_MAINTENANCE,
        FAMILY_HISTORY: record[0].FAMILY_HISTORY,
        SOCIAL_HISTORY: record[0].SOCIAL_HISTORY,
        masterProblemLists: masterProblemLists,
        masterMedicationLists: masterMedicationLists,          
      });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


app.post('/api/history', async (req, res) => {
  const {
    CSN,
    pastMedicalHistory,
    pastSurgicalHistory,
    knownAllergies,
    healthMaintenance,
    familyHistory,
    socialHistory,
    masterProblemLists,
    masterMedicationLists,
  } = req.body;

  try {
    // Adding a delay of 2 seconds before processing the request
    setTimeout(async () => {
      // Serialize fields into JSON strings
      const pastMedicalHistoryJson = JSON.stringify(pastMedicalHistory);
      const pastSurgicalHistoryJson = JSON.stringify(pastSurgicalHistory);
      const knownAllergiesJson = JSON.stringify(knownAllergies);
      const healthMaintenanceJson = JSON.stringify(healthMaintenance);
      const familyHistoryJson = JSON.stringify(familyHistory);
      const socialHistoryJson = JSON.stringify(socialHistory);      
      // SQL query to check if the CSN exists
      const checkCSNQuery = 'SELECT * FROM history WHERE CSN = ?';
      const [existingRecord] = await db.query(checkCSNQuery, [CSN]);

      if (existingRecord.length > 0) {
        // CSN exists, perform an UPDATE query
        const updateQuery = `
          UPDATE history 
          SET PAST_MEDICAL_HISTORY = ?, 
          PAST_SURGICAL_HISTORY = ?, 
          KNOWN_ALLERGIES = ?, 
          HEALTH_MAINTENANCE = ?, 
          FAMILY_HISTORY = ?, 
          SOCIAL_HISTORY = ?
        WHERE CSN = ?
        `;
        const updateParams = [
          pastMedicalHistoryJson, pastSurgicalHistoryJson, knownAllergiesJson, healthMaintenanceJson, familyHistoryJson, socialHistoryJson, CSN,
        ];
        await db.query(updateQuery, updateParams);

        // Optionally delete existing medications before inserting new ones
        const deleteMasterMedicationListsQuery = 'DELETE FROM mastermedicationlist WHERE CSN = ?';
        await db.query(deleteMasterMedicationListsQuery, [CSN]);

        // Insert the medications into the database
        if (masterMedicationLists && masterMedicationLists.length > 0) {
          const insertMasterMedicationListsQuery = `
            INSERT INTO mastermedicationlist (rx, unit, state, sig, CSN)
            VALUES (?, ?, ?, ?, ?)
          `;
          for (let mastermedicationlist of masterMedicationLists) {
            const { rx, select, status, sig } = mastermedicationlist;
            const insertMasterMedicationListParams = [rx, select, status, sig, CSN];
            await db.query(insertMasterMedicationListsQuery, insertMasterMedicationListParams);
          }
        }


        const deleteMasterProblemListsQuery = 'DELETE FROM masterproblemlist WHERE CSN = ?';
        await db.query(deleteMasterProblemListsQuery, [CSN]);

        // Insert the masterproblemlist into the database
        if (masterProblemLists && masterProblemLists.length > 0) {
          const insertMasterProblemListsQuery = `
            INSERT INTO masterproblemlist (mastercode, onset, masterstatus, nature, description, CSN)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          for (let masterproblemlist of masterProblemLists) {
            const { mastercode, onset, masterstatus, nature, description } = masterproblemlist;
            const insertMasterProblemListParams = [mastercode, onset, masterstatus, nature, description, CSN];
            await db.query(insertMasterProblemListsQuery, insertMasterProblemListParams);
          }
        }

        return res.json({ message: "Data updated successfully" });
      } else {
        // CSN does not exist, perform an INSERT query
        const insertQuery = `
          INSERT INTO history (CSN, PAST_MEDICAL_HISTORY, PAST_SURGICAL_HISTORY, KNOWN_ALLERGIES, HEALTH_MAINTENANCE, FAMILY_HISTORY, SOCIAL_HISTORY)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const insertParams = [
          CSN, pastMedicalHistoryJson, pastSurgicalHistoryJson, knownAllergiesJson, healthMaintenanceJson, familyHistoryJson, socialHistoryJson
        ];
        const result = await db.query(insertQuery, insertParams);
        const newCSN = result.insertId; // Get the new encounter ID (CSN)

        // Insert mastermedicationlist into the database
        if (masterMedicationLists && masterMedicationLists.length > 0) {
          const insertMasterMedicationListQuery = `
            INSERT INTO mastermedicationlist (rx, unit, state, sig, CSN)
            VALUES (?, ?, ?, ?, ?)
          `;
          for (let mastermedicationlist of masterMedicationLists) {
            const { rx, select, status, sig } = mastermedicationlist;
            const insertMasterMedicationListParams = [rx, select, status, sig, newCSN];
            await db.query(insertMasterMedicationListQuery, insertMasterMedicationListParams);
          }
        }

        // Insert masterproblemlist into the database
        if (masterProblemLists && masterProblemLists.length > 0) {
          const insertMasterProblemListQuery = `
            INSERT INTO masterproblemlist (mastercode, onset, masterstatus, nature, description, CSN)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          for (let masterproblemlist of masterMedicationLists) {
            const { mastercode, onset, masterstatus, nature, description } = masterproblemlist;
            const insertMasterProblemListParams = [mastercode, onset, masterstatus, nature, description, newCSN];
            await db.query(insertMasterProblemListQuery, insertMasterProblemListParams);
          }
        }

        return res.json({ message: "Data inserted successfully" });
      }
    }, 1000); // Delay of 2 seconds
  } catch (err) {
    console.error("Error during database operation:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


app.get('/api/encounter/:id/:encounterID', async (req, res) => {
  const { id, encounterID} = req.params;  

  try {
    // SQL query to fetch encounter data by CSN
    const query = 'SELECT * FROM encounter WHERE CSN = ? AND encounterID = ?';
    const [record] = await db.query(query, [id, encounterID]);

    if (record.length > 0) {
      // Fetch medications related to the encounter
      const medicationsQuery = 'SELECT * FROM medications WHERE CSN = ? AND encounterID = ?';
      const [medications] = await db.query(medicationsQuery, [id, encounterID]);

      // Fetch orders related to the encounter
      const ordersQuery = 'SELECT * FROM orders WHERE CSN = ? AND encounterID = ?';
      const [orders] = await db.query(ordersQuery, [id, encounterID]);

      // Fetch procedures related to the encounter
      const proceduresQuery = 'SELECT * FROM procedures WHERE CSN = ? AND encounterID = ?';
      const [procedures] = await db.query(proceduresQuery, [id, encounterID]);

      // Fetch assessments related to the encounter
      const assessmentsQuery = 'SELECT * FROM assessments WHERE CSN = ? AND encounterID = ?';
      const [assessments] = await db.query(assessmentsQuery, [id, encounterID]);

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
        assessments: assessments,
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
    CSN,
    encounterID,
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
    orders,      
    procedures,
    assessments,
  } = req.body;
  console.log(orders);
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
      const checkCSNQuery = 'SELECT * FROM encounter WHERE CSN = ? AND encounterID = ?';
      const [existingRecord] = await db.query(checkCSNQuery, [CSN, encounterID]);

      if (existingRecord.length > 0) {
        // CSN exists, perform an UPDATE query
        const updateQuery = `
          UPDATE encounter 
          SET HEAD = ?, REVIEW = ?, CHIEF = ?, HISTORY = ?, VITAL = ?, PHYSICAL = ?, MEETING = ?, OPEN = ?, PRESENTILLNESS = ?
          WHERE CSN = ? AND encounterID = ?
        `;
        const updateParams = [
          headJson, reviewJson, chiefJson, historyJson, vitalJson, physicalJson, meetingJson, openJson, presentIllnessJson, CSN, encounterID
        ];
        await db.query(updateQuery, updateParams);

        // Optionally delete existing medications before inserting new ones
        const deleteMedicationsQuery = 'DELETE FROM medications WHERE CSN = ? AND encounterID = ?';
        await db.query(deleteMedicationsQuery, [CSN, encounterID]);

        // Insert the medications into the database
        if (medications && medications.length > 0) {
          const insertMedicationQuery = `
            INSERT INTO medications (unit, qty, refills, sig, rx, CSN, encounterID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          for (let medication of medications) {
            const { unit, qty, refills, sig, rx } = medication;
            const insertMedicationParams = [unit, qty, refills, sig, rx, CSN, encounterID];
            await db.query(insertMedicationQuery, insertMedicationParams);
          }
        }

        // Delete existing orders before inserting new ones
        const deleteOrdersQuery = 'DELETE FROM orders WHERE CSN = ? AND encounterID = ?';
        await db.query(deleteOrdersQuery, [CSN, encounterID]);

        // Insert the orders into the database
        if (orders && orders.length > 0) {
          const insertOrderQuery = `
            INSERT INTO orders (orderType, requisition, CSN, encounterID)
            VALUES (?, ?, ?, ?)
          `;
          for (let order of orders) {
            const { orderType, requisition } = order;
            const insertOrderParams = [orderType, requisition, CSN, encounterID];
            await db.query(insertOrderQuery, insertOrderParams);
          }
        }

        // Delete existing procedures before inserting new ones
        const deleteProceduresQuery = 'DELETE FROM procedures WHERE CSN = ? AND encounterID = ?';
        await db.query(deleteProceduresQuery, [CSN, encounterID]);

        // Insert the procedures into the database
        if (procedures && procedures.length > 0) {
          const insertProcedureQuery = `
            INSERT INTO procedures (code, description, note, CSN, encounterID)
            VALUES (?, ?, ?, ?, ?)
          `;
          for (let procedure of procedures) {
            const { code, description, note } = procedure;
            const insertProcedureParams = [code, description, note, CSN, encounterID];
            await db.query(insertProcedureQuery, insertProcedureParams);
          }
        }
        // Delete existing assessments before inserting new ones
        const deleteAssessmentsQuery = 'DELETE FROM assessments WHERE CSN = ? AND encounterID = ?';
        await db.query(deleteAssessmentsQuery, [CSN, encounterID]);

        // Insert the assessments into the database
        if (assessments && assessments.length > 0) {
          const insertAssessmentQuery = `
            INSERT INTO assessments (mastercode, onset, nature, description, note, CSN, encounterID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          for (let assessment of assessments) {
            const {onset, mastercode, nature, description, note } = assessment;
            const insertAssessmentParams = [onset, mastercode, nature, description, note, CSN, encounterID];
            await db.query(insertAssessmentQuery, insertAssessmentParams);
          }
        }

        return res.json({ message: "Data updated successfully" });
      } else {
        // CSN does not exist, perform an INSERT query
        const insertQuery = `
          INSERT INTO encounter (CSN, encounterID, HEAD, REVIEW, CHIEF, HISTORY, VITAL, PHYSICAL, MEETING, OPEN, PRESENTILLNESS)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const insertParams = [
          CSN, encounterID, headJson, reviewJson, chiefJson, historyJson, vitalJson, physicalJson, meetingJson, openJson, presentIllnessJson
        ];
        const result = await db.query(insertQuery, insertParams);
        const newCSN = result.insertId; 

        // Insert medications into the database
        if (medications && medications.length > 0) {
          const insertMedicationQuery = `
            INSERT INTO medications (unit, qty, refills, sig, rx, CSN, encounterID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          for (let medication of medications) {
            const { unit, qty, refills, sig, rx } = medication;
            const insertMedicationParams = [unit, qty, refills, sig, rx, newCSN, encounterID];
            await db.query(insertMedicationQuery, insertMedicationParams);
          }
        }

        // Insert orders into the database
        if (orders && orders.length > 0) {
          const insertOrderQuery = `
            INSERT INTO orders (orderType, requisition, CSN, encounterID)
            VALUES (?, ?, ?, ?)
          `;
          for (let order of orders) {
            const { orderType, requisition } = order;
            const insertOrderParams = [orderType, requisition, newCSN, encounterID];
            await db.query(insertOrderQuery, insertOrderParams);
          }
        }

        // Insert procedures into the database
        if (procedures && procedures.length > 0) {
          const insertProcedureQuery = `
            INSERT INTO procedures (code, description, note, CSN, encounterID)
            VALUES (?, ?, ?, ?, ?)
          `;
          for (let procedure of procedures) {
            const { code, description, note } = procedure;
            const insertProcedureParams = [code, description, note, newCSN, encounterID];
            await db.query(insertProcedureQuery, insertProcedureParams);
          }
        }

        // Insert the assessments into the database
        if (assessments && assessments.length > 0) {
          const insertAssessmentQuery = `
            INSERT INTO assessments (mastercode, onset, nature, description, note, CSN, encounterID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          for (let assessment of assessments) {
            const {onset, mastercode, nature, description, note } = assessment;
            const insertAssessmentParams = [onset, mastercode, nature, description, note, CSN, encounterID];
            await db.query(insertAssessmentQuery, insertAssessmentParams);
          }
        }


        return res.json({ message: "Data inserted successfully" });
      }
    }, 1000); // Delay of 2 seconds
  } catch (err) {
    console.error("Error during database operation:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});
app.post('/api/get_encounter_id', async (req, res) => {
  const { CSN } = req.body;

  if (!CSN) {
    return res.status(400).json({ error: 'CSN is required' });
  }

  try {

    const findIDQuery = 'SELECT encounterID FROM encounter WHERE CSN = ?';
    const [encounterIDs] = await db.query(findIDQuery, [CSN,]);
    res.json(encounterIDs);
  } catch (error) {
    console.error('Error fetching encounterIDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/vitalsigns/:CSN', async (req, res) => {
  const { CSN } = req.params;

  try {
    // Query to fetch all rows where CSN matches
    const query = 'SELECT VITAL, created_at FROM encounter WHERE CSN = ?';
    const [rows] = await db.query(query, [CSN]);

    if (rows.length > 0) {
      // Return all vital signs data for the provided CSN
      const vitalSignsData = rows.map((row) => {
        const createdAt = row.created_at ? row.created_at.toISOString().split('T')[0] : null; // Move this line here

        return {
          date: createdAt,
          systolic: JSON.parse(row.VITAL).systolic,
          diastolic: JSON.parse(row.VITAL).diastolic,
          temperature: JSON.parse(row.VITAL).temperature,
          weight: JSON.parse(row.VITAL).weight,
          height: JSON.parse(row.VITAL).height,
          respiration: JSON.parse(row.VITAL).respiration,
          pulse: JSON.parse(row.VITAL).pulse,
          spO2: JSON.parse(row.VITAL).spO2,
        };
      });
      res.json(vitalSignsData);
    } else {
      res.status(404).json({ message: 'No vital signs found for the provided CSN' });
    }
  } catch (err) {
    console.error("Error during database operation:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// API Endpoint to Save Clinic Data
app.post('/api/clinic', async(req, res) => {
  const {
      clinicName, subTitle, address1, address2, city, postCode, country, state, telephoneNumber1, telephoneNumber2,
      fax, email, id1, id2, type1, type2, specialization, slotDuration, bookingStartTime, bookingEndTime
  } = req.body;

  const query = `
      INSERT INTO clinic (
          clinicName, subTitle, address1, address2, city, postCode, country, state, telephoneNumber1, telephoneNumber2,
          fax, email, id1, id2, type1, type2, specialization, slotDuration, bookingStartTime, bookingEndTime
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
      clinicName, subTitle, address1, address2, city, postCode, country, state, telephoneNumber1, telephoneNumber2,
      fax, email, id1, id2, type1, type2, specialization, slotDuration, bookingStartTime, bookingEndTime
  ];

  try {
    await db.query(query, values)
    console.log("success")
  } catch (err){
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get('/api/clinic', async (req, res) => {
  const query = `SELECT * FROM clinic ORDER BY id DESC LIMIT 1`;

  try {
    const result = await db.query(query);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send("No clinic found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Get all users
app.get("/users", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

// Add a user
app.post("/users", async (req, res) => {
  const { userId, password } = req.body;
  await db.query("INSERT INTO users (userId, password) VALUES (?, ?)", [userId, password]);
  res.sendStatus(201);
});

// Update a user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, password } = req.body;
  await db.query("UPDATE users SET userId = ?, password = ? WHERE id = ?", [userId, password, id]);
  res.sendStatus(200);
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  res.sendStatus(200);
});

// Sign-in Route
app.post("/signin", async (req, res) => {
  const { userId, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE userId = ? AND password = ?", [userId, password]);
    const rows = result[0]; // Extract rows manually


    if (rows.length > 0) {
      res.status(200).json({ message: "Sign-in successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
