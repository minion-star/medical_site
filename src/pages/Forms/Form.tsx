import React, { useState, useEffect } from "react";
import axios from "axios";


interface Patient {
  CSN: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  PHOTO: string;
  AGE: string;
  INFORMATION: {
    personalInformation: Record<string, any>;
    contactInformation: Record<string, any>;
    workInformation: Record<string, any>;
    insurance: Record<string, any>;
  };
}

const App: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState<any>({
    CSN: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    PHOTO: "",
    AGE: "",
    personalInformation: {},
    contactInformation: {},
    workInformation: {},
    insurance: {},
    CREATED_DATE: "",
    CREATED_BY: "",
    LAST_SAVED_DATE: "",
    LAST_SAVED_BY: "",
  });

  // Fetch patients on page load
  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/general");
      setPatients(response.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle JSON field changes
  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [field]: { ...formData[field], [name]: value },
    });
  };

  // Add or update a patient
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/general", formData);
      alert("Patient saved successfully!");
      fetchPatients();
    } catch (err) {
      console.error("Error saving patient:", err);
      alert("Error saving patient!");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Patient Management</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <h3>Add or Update Patient</h3>
        <div className="form-group">
          <label>CSN</label>
          <input type="text" className="form-control" name="CSN" value={formData.CSN} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" name="FIRST_NAME" value={formData.FIRST_NAME} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" name="LAST_NAME" value={formData.LAST_NAME} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Photo URL</label>
          <input type="text" className="form-control" name="PHOTO" value={formData.PHOTO} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="text" className="form-control" name="AGE" value={formData.AGE} onChange={handleChange} />
        </div>

        <h4>Personal Information</h4>
        <div className="form-group">
          <label>MRN</label>
          <input
            type="text"
            className="form-control"
            name="mrn"
            value={formData.personalInformation.mrn || ""}
            onChange={(e) => handleNestedChange(e, "personalInformation")}
          />
        </div>

        <h4>Contact Information</h4>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.contactInformation.address || ""}
            onChange={(e) => handleNestedChange(e, "contactInformation")}
          />
        </div>

        <h4>Work Information</h4>
        <div className="form-group">
          <label>Employer</label>
          <input
            type="text"
            className="form-control"
            name="employer"
            value={formData.workInformation.employer || ""}
            onChange={(e) => handleNestedChange(e, "workInformation")}
          />
        </div>

        <h4>Insurance Information</h4>
        <div className="form-group">
          <label>Carrier</label>
          <input
            type="text"
            className="form-control"
            name="carrier"
            value={formData.insurance.carrier || ""}
            onChange={(e) => handleNestedChange(e, "insurance")}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Patient
        </button>
      </form>

      <h3>Patient List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CSN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Photo</th>
            <th>Age</th>
            <th>INFORMATION</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.CSN}>
              <td>{patient.CSN}</td>
              <td>{patient.FIRST_NAME}</td>
              <td>{patient.LAST_NAME}</td>
              <td>
                <img src={patient.PHOTO} alt="Patient" style={{ width: "50px" }} />
              </td>
              <td>{patient.AGE}</td>
              <td>
                <pre>{JSON.stringify(patient.INFORMATION, null, 2)}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
