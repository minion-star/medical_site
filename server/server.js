const express = require("express");
const mysql = require("mysql2");
const xml2js = require("xml2js");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Replace with your actual MySQL password
  database: "emrdb", // Replace with your actual database name
  port: "3306",
});

// API to fetch and parse patient data
app.get("/api/patients", async (req, res) => {
  const query = "SELECT * FROM patients";
  db.query(query, async (err, results) => {
    if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Server error" });
    }

    const parser = new xml2js.Parser();
    const formattedResults = await Promise.all(
      results.map(async (row) => {
        try {

          // Parse the XML field for each row
          const parsedXML = await parser.parseStringPromise(row.XML);

          const personalInformation = {
            id: parsedXML.Patient.Document?.[0]?.$.id || "",
           // ssn: parsedXML.Patient.SSN?.[0] || "",
            mrn: parsedXML.Patient.Demographics?.[0]?.["M.R.N"]?.[0] || "",
            dob: parsedXML.Patient.Demographics?.[0]?.["Date.Of.Birth"]?.[0] || "",
            gender: parsedXML.Patient.Demographics?.[0]?.Sex?.[0] || "",
            maritalStatus: parsedXML.Patient.Demographics?.[0]?.["Marital.Status"]?.[0] || "",
            siblings: parsedXML.Patient.Demographics?.[0]?.Siblings?.[0] || "",
            race: parsedXML.Patient.Demographics?.[0]?.Race?.[0] || "",
            pharmacy: parsedXML.Patient.Demographics?.[0]?.["Preferred.Pharmacy"]?.[0] || "",
            other: parsedXML.Patient?.["Other.Information"]?.[0] || "",
          };
          
          const contactInformation = {
            address: `${parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.Address?.[0]?.Address1?.[0] || ""}`,
            city: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.City?.[0] || "",
            state: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.State?.[0] || "",
            country: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.Country?.[0] || "",
            postcode: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.ZIP?.[0] || "",
            homeph: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.Telephone?.[0]?.Home?.[0] || "",
            cellph: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.Telephone?.[0]?.Cell?.[0] || "",
            email: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.Email?.[0] || "",
            emergency: parsedXML.Patient.Demographics?.[0]?.["Contact.Information"]?.[0]?.Emergency?.[0] || "",
          };
          
          const workInformation = {
            status: parsedXML.Patient.Demographics?.[0]?.["Work.Information"]?.[0]?.Status?.[0] || "",
            employer: parsedXML.Patient.Demographics?.[0]?.["Work.Information"]?.[0]?.Institution?.[0] || "",
            workph: parsedXML.Patient.Demographics?.[0]?.["Work.Information"]?.[0]?.Telephone?.[0] || "",
          };
          

          const insurance = parsedXML.Patient?.["Insurance.Information"]?.[0];
          
          const insuranceDetails = [
            {
              carrier: insurance?.["Insurance.1"]?.[0]?.Career?.[0] || "",
              address: insurance?.["Insurance.1"]?.[0]?.Address?.[0] || "",
              city: insurance?.["Insurance.1"]?.[0]?.City?.[0] || "",
              state: insurance?.["Insurance.1"]?.[0]?.State?.[0] || "",
              country: insurance?.["Insurance.1"]?.[0]?.Country?.[0] || "",
              postcode: insurance?.["Insurance.1"]?.[0]?.ZIP?.[0] || "",
              phone: insurance?.["Insurance.1"]?.[0]?.Telephone?.[0] || "",
              facsimile: insurance?.["Insurance.1"]?.[0]?.Fax?.[0] || "",
              plan: insurance?.["Insurance.1"]?.[0]?.Plan?.[0] || "",
              expiry: insurance?.["Insurance.1"]?.[0]?.Expiry?.[0] || "",
              idno: insurance?.["Insurance.1"]?.[0]?.["ID.Number"]?.[0] || "",
              groupno: insurance?.["Insurance.1"]?.[0]?.["Group.Number"]?.[0] || "",
              copay: insurance?.["Insurance.1"]?.[0]?.Copayment?.[0] || "",
              authno: insurance?.["Insurance.1"]?.[0]?.["Authorization.Number"]?.[0] || "",
              remarks: insurance?.["Insurance.1"]?.[0]?.Remarks?.[0] || "",
              relation: insurance?.["Insurance.1"]?.[0]?.["Relationship.To.Insured"]?.[0] || "",
              homeph: insurance?.["Insurance.2"]?.[0]?.["Insured.Telephone"]?.[0] || "",
              lastname: insurance?.["Insurance.1"]?.[0]?.["Insured.Last.Name"]?.[0] || "",
              firstname: insurance?.["Insurance.1"]?.[0]?.["Insured.First.Name"]?.[0] || "",
              mi: insurance?.["Insurance.1"]?.[0]?.["Insured.Middle.Initial"]?.[0] || "",
              dob: insurance?.["Insurance.1"]?.[0]?.["Insured.Birth.Date"]?.[0] || "",
              gender: insurance?.["Insurance.1"]?.[0]?.["Insured.Sex"]?.[0] || "",
            },
            {
              carrier: insurance?.["Insurance.2"]?.[0]?.Career?.[0] || "",
              address: insurance?.["Insurance.2"]?.[0]?.Address?.[0] || "",
              city: insurance?.["Insurance.2"]?.[0]?.City?.[0] || "",
              state: insurance?.["Insurance.2"]?.[0]?.State?.[0] || "",
              country: insurance?.["Insurance.2"]?.[0]?.Country?.[0] || "",
              postcode: insurance?.["Insurance.2"]?.[0]?.ZIP?.[0] || "",
              phone: insurance?.["Insurance.2"]?.[0]?.Telephone?.[0] || "",
              facsimile: insurance?.["Insurance.2"]?.[0]?.Fax?.[0] || "",
              plan: insurance?.["Insurance.2"]?.[0]?.Plan?.[0] || "",
              expiry: insurance?.["Insurance.2"]?.[0]?.Expiry?.[0] || "",
              idno: insurance?.["Insurance.2"]?.[0]?.["ID.Number"]?.[0] || "",
              groupno: insurance?.["Insurance.2"]?.[0]?.["Group.Number"]?.[0] || "",
              copay: insurance?.["Insurance.2"]?.[0]?.Copayment?.[0] || "",
              authno: insurance?.["Insurance.2"]?.[0]?.["Authorization.Number"]?.[0] || "",
              remarks: insurance?.["Insurance.2"]?.[0]?.Remarks?.[0] || "",
              relation: insurance?.["Insurance.2"]?.[0]?.["Relationship.To.Insured"]?.[0] || "",
              homeph: insurance?.["Insurance.2"]?.[0]?.["Insured.Telephone"]?.[0] || "",
              lastname: insurance?.["Insurance.2"]?.[0]?.["Insured.Last.Name"]?.[0] || "",
              firstname: insurance?.["Insurance.2"]?.[0]?.["Insured.First.Name"]?.[0] || "",
              mi: insurance?.["Insurance.2"]?.[0]?.["Insured.Middle.Initial"]?.[0] || "",
              dob: insurance?.["Insurance.2"]?.[0]?.["Insured.Birth.Date"]?.[0] || "",
              gender: insurance?.["Insurance.2"]?.[0]?.["Insured.Sex"]?.[0] || "",
            },
          ];
          
          

          // Combine all extracted data into a single object
          return {
           // ...row, // Includes FIRST_NAME, LAST_NAME, AGE, GENDER, REGISTERING_DATE
            ...row,
            personalInformation,
            contactInformation,
            workInformation,
            insurance: insuranceDetails,
          };
        } catch (xmlError) {
          console.error("Error parsing XML for row ID:", row.id, xmlError);
          return { ...row, personalInformation: null, contactInformation: null, workInformation: null, insurance: null }; // Handle errors gracefully
        }
      })
    );

    res.json(formattedResults);
  });
});


// Put data

app.put("/api/patients/:csn", (req, res) => {
    const { csn } = req.params;
    const updatedData = req.body;
  
    const query = `
      UPDATE patients SET 
        FIRST_NAME = ?, 
        LAST_NAME = ?, 
        DATE_OF_BIRTH = ?, 
        PHOTO = ?, 
        AGE = ?
      WHERE CSN = ?
    `;
    const values = [
      updatedData.FIRST_NAME,
      updatedData.LAST_NAME,
      updatedData.DATE_OF_BIRTH,
      updatedData.PHOTO,
      updatedData.AGE,
      csn,
    ];
  
    db.query(query, values, (err) => {
      if (err) {
        console.error("Error updating patient:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.json({ message: "Patient updated successfully" });
    });
  });


// Save data

app.post("/api/patients", (req, res) => {
    const newData = req.body;
  
    const query = `
      INSERT INTO patients (FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, PHOTO, AGE, CSN)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      newData.FIRST_NAME,
      newData.LAST_NAME,
      newData.DATE_OF_BIRTH,
      newData.PHOTO,
      newData.AGE,
      newData.CSN || null, // Optional CSN
    ];
  
    db.query(query, values, (err) => {
      if (err) {
        console.error("Error inserting patient:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.json({ message: "Patient added successfully" });
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
