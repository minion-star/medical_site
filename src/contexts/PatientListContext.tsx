import { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { response } from "express";

interface Patient {
    id: string;
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
                const response = await axios.get("http://localhost:5000/api/patients");
                setPatientList(response.data); // Assuming the response contains an array of patient data
                setLoading(false);
                
            } catch (error) {
                console.error("Error fetching patients:", error);
                setError("Failed to load patient data. Please try again.");
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) return <Box sx={{ display: 'flex' }}><CircularProgress color="success" /></Box>;

    if (error) return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
    </Box>;

    return (
        <PatientListContext.Provider value={patientList}>
            {children}
        </PatientListContext.Provider>
    );
};

export default PatientListProvider;
