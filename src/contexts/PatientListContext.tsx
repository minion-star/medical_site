import { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


interface Patient {
  CSN: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  PHOTO: string;
  AGE: string;
  INFORMATION: {
    personalInformation: PersonalInformation;
    contactInformation: ContactInformation;
    workInformation: WorkInformation;
    insurance: Insurance;
  };
  CREATED_DATE: string;
  LAST_SAVED_DATE: string;
}

interface PersonalInformation {
  id: string,
  mrn: string,
  dob: string,
  gender: string,
  marriage: string,
  siblings: string,
  race: string,
  pharamacy: string,
  other: string
}

interface ContactInformation {
  address: string,
  city: string,
  postcode: string,
  country: string,
  state: string,
  homeph: string,
  cellph: string,
  email: string,
  emergency: string
}

interface WorkInformation {
  status: string,
  workph: string,
  employer: string
}

interface Insurance {
  carrier: string,
  address: string,
  city: string,
  postcode: string,
  country: string,
  state: string,
  phone: string,
  facsimile: string,
  plan: string,
  expiry: string,
  idno: string,
  groupno: string,
  copay: string,
  authno: string,
  remarks: string,
  relation: string,
  homeph: string,
  lastname: string,
  firstname: string,
  mi: string,
  dob: string,
  gender: string
}
interface PatientListProviderProps {
    children: ReactNode;
}

// Create a PatientListContext
export const PatientListContext = createContext<Patient[] | undefined>(undefined);

const PatientListProvider: React.FC<PatientListProviderProps> = ({ children }) => {

    const [patientList, setPatientList] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/general");
                setPatientList(response.data); // Assuming the response contains an array of patient data
                setLoading(false);
                
            } catch (error) {
                console.error("Error fetching patients:", error);
                setError("Failed to load patient data. Please try again.");
                setLoading(false);
            }
        };

        fetchPatients();
    },[patientList] );

    if (loading) return <Box sx={{ display: 'flex',position:"absolute", left:"50%", top:"50%" }}><CircularProgress color="success" /></Box>;

    return (
        <PatientListContext.Provider value={patientList}>
            {children}
        </PatientListContext.Provider>
    );
};

export default PatientListProvider;
