import React, { useState, useEffect } from 'react';
import Appbar from '../../components/Appbar';
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Container,
  Grid,
  Toolbar,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchData } from "../../mockData";

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

interface TransformedPatient {
  chartId: string;
  lastName: string;
  firstName: string;
  gender: string;
  dob: string;
  age: number;
  phone: string;
}

const SearchPage: React.FC = () => {

  
  const [searchBy, setSearchBy] = useState<string>('Chart ID');
  const [searchCondition, setSearchCondition] = useState<string>('starts with');
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<TransformedPatient[]>([]);
  const [patientList, setPatientList] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/general");
            setPatientList(response.data); // Assuming the response contains an array of patient data
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    fetchPatients();
},[] );


const handleSearch = () => {
  const filtered = patientList.filter((patient) => {
    const value = getSearchFieldValue(patient);
    if (!value) return false;

    switch (searchCondition) {
      case "starts with":
        return value.toLowerCase().startsWith(searchText.toLowerCase());
      case "contains":
        return value.toLowerCase().includes(searchText.toLowerCase());
      case "equals":
        return value.toLowerCase() === searchText.toLowerCase();
      default:
        return false;
    }
  });

  // Transform to match TransformedPatient interface
  const transformedData: TransformedPatient[] = filtered.map((patient) => ({
    chartId: patient.CSN, // Assuming CSN is the Chart ID
    lastName: patient.LAST_NAME,
    firstName: patient.FIRST_NAME,
    gender: patient.INFORMATION.personalInformation.gender,
    dob: patient.INFORMATION.personalInformation.dob,
    age: Number(patient.AGE), // Convert to number
    phone: patient.INFORMATION.contactInformation.cellph,
  }));
  setFilteredData(transformedData);
};

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getSearchFieldValue = (patient: Patient): string | undefined => {
    switch (searchBy) {
      case "Chart ID":
        return patient.CSN;
      case "Phone":
        return patient.INFORMATION.contactInformation.cellph;
      case "Last Name":
        return patient.LAST_NAME;
      case "First Name":
        return patient.FIRST_NAME;
      case "Birth Date":
        return patient.INFORMATION.personalInformation.dob;
      case "Gender":
        return patient.INFORMATION.personalInformation.gender;
      case "Age":
        return patient.AGE;
      case "Other":
        return patient.INFORMATION.personalInformation.other;
      default:
        return undefined;
    }
  };


  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Patient List" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2} sx={{ marginleft: "10px", marginTop: "40px" }}>
            <Grid item xs={12}>
              <Paper>
                <Grid container sx={{ p: 1, m: 1 }}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Search Chart By:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <RadioGroup
                        row
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                      >
                        <Grid container>
                          <Grid item xs={4}>
                            <FormControlLabel value="Chart ID" control={<Radio />} label="Chart ID" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="Last Name" control={<Radio />} label="Last Name" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="First Name" control={<Radio />} label="First Name" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="Birth Date" control={<Radio />} label="Birth Date" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="Gender" control={<Radio />} label="Gender" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="Age" control={<Radio />} label="Age" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12} sx={{ m: 1 }}>
                        <FormControl fullWidth variant="standard">
                          <InputLabel>Search where {searchBy}</InputLabel>
                          <Select
                            value={searchCondition}
                            onChange={(e) => setSearchCondition(e.target.value)}
                          >
                            <MenuItem value="starts with">Starts With</MenuItem>
                            <MenuItem value="contains">Contains</MenuItem>
                            <MenuItem value="equals">Equals</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sx={{ m: 1 }}>
                        <TextField
                          id="input-with-icon-textfield"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          variant="standard"
                          fullWidth
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="patient table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>CHART ID</TableCell>
                        <TableCell>LAST NAME</TableCell>
                        <TableCell>FIRST NAME</TableCell>
                        <TableCell>GENDER</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>AGE</TableCell>
                        <TableCell>PHONE</TableCell>
                        {/* Diagnosis&Medication */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((patient:any, index:number) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{patient.chartId}</TableCell>
                            <TableCell>{patient.lastName}</TableCell>
                            <TableCell>{patient.firstName}</TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.dob}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.phone}</TableCell>
                            {/* diagnosis&medication */}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} align="center">
                            No results found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SearchPage;
