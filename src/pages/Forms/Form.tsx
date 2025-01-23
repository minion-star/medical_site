
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Patient {
  //id: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  DATE_OF_BIRTH: string;
  PHOTO: string,
  AGE: string;
  CSN: string;
  personalInformation: {
      id: string;
      mrn: string;
      dob: string;
      gender: string;
      maritalStatus: string;
      siblings: string;
      race: string;
      pharmacy: string;
      other: string;
  };
  contactInformation: {
      address: string;
      city: string;
      state: string;
      country: string;
      postcode: string;
      homeph: string;
      cellph: string;
      email: string;
      emergency: string;
  };
  workInformation: {
      status: string;
      employer: string;
      workph: string;
  };
  insurance: {
      carrier: string;
      address: string;
      city: string;
      state: string;
      country: string;
      postcode: string;
      phone: string;
      facsimile: string;
      plan: string;
      expiry: string;
      idno: string;
      groupno: string;
      pay: string;
      authno: string;
      remarks: string;
      relation: string;
      homeph:string,
      lastname: string;
      firstname: string;
      mi: string;
      dob: string;
      gender: string;
  }[];
}


const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [originalCSN, setOriginalCSN] = useState<string | null>(null);

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Handle edit click
  const handleEdit = (patient: Patient) => {
    setEditingPatient({ ...patient });
    setOriginalCSN(patient.CSN); // Store the original CSN for comparison
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Patient
  ) => {
    if (editingPatient) {
      setEditingPatient({
        ...editingPatient,
        [key]: e.target.value,
      });
    }
  };

  // Save changes
  const handleSave = async () => {
    if (!editingPatient) return;

    try {
      if (editingPatient.CSN !== originalCSN) {
        // If CSN has changed, create a new patient record
        await axios.post("http://localhost:5000/api/patients", editingPatient);
      } else {
        // Otherwise, update the existing record
        await axios.put(
          `http://localhost:5000/api/patients/${editingPatient.CSN}`,
          editingPatient
        );
      }

      // Reset editing state
      setEditingPatient(null);
      setOriginalCSN(null);

      // Refresh the patient list
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error saving patient data:", error);
    }
  };

  return (
    <div>
      <h1>Patient Management</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>CSN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.CSN}>
              <td>{patient.FIRST_NAME}</td>
              <td>{patient.LAST_NAME}</td>
              <td>{patient.DATE_OF_BIRTH}</td>
              <td>{patient.CSN}</td>
              <td>
                <button onClick={() => handleEdit(patient)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPatient && (
        <div>
          <h2>Edit Patient</h2>
          <label>
            First Name:
            <input
              type="text"
              value={editingPatient.FIRST_NAME}
              onChange={(e) => handleInputChange(e, "FIRST_NAME")}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={editingPatient.LAST_NAME}
              onChange={(e) => handleInputChange(e, "LAST_NAME")}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="text"
              value={editingPatient.DATE_OF_BIRTH}
              onChange={(e) => handleInputChange(e, "DATE_OF_BIRTH")}
            />
          </label>
          <label>
            CSN:
            <input
              type="text"
              value={editingPatient.CSN}
              onChange={(e) => handleInputChange(e, "CSN")}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditingPatient(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;

