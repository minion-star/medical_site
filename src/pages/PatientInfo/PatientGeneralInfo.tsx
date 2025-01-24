import * as Yup from "yup";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { debounce } from 'lodash';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import '../../styles.css'
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  Paper,
  IconButton,
  Avatar,
  FormControl,
  Input,
  SelectChangeEvent,
  Hidden
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import { Link, useParams } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { blueGrey, grey, red } from "@mui/material/colors";
import Appbar_Patient from "../../components/Appbar_Patientlist";
import { PatientListContext } from "../../contexts/PatientListContext";
import dayjs from "dayjs";
import { init } from "echarts";




const PatientInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Phone number must contain only digits"),
  email: Yup.string().email("Invalid email").required("Required"),
  age: Yup.number().required("Required").positive("Age must be positive"),
  bloodGroup: Yup.string().required("Required"),
  referredByDoctor: Yup.string().required("Required"),
  referredByDoctorEmail: Yup.string().email("Invalid email"),
  referredByDoctorPhoneNumber: Yup.string().matches(
    /^\d+$/,
    "Phone number must contain only digits"
  ),
  diseases: Yup.string().required("Required"),
  patientHistory: Yup.string(),
});



const PatientInfo : React.FC = () => {

  const patientList = useContext(PatientListContext);
  if (!patientList) {
    return (
      <Typography variant="h6" color="error">
        Patient list not available.
      </Typography>
    );
  }
  const { id } = useParams<{ id: string }>();
  const patient = patientList.find((p) => p.CSN === id);
  if (!patient) {
    return (
      <Typography variant="h6" color="error">
        Patient not found.
      </Typography>
    );
  }
  const initialValues = {
    id: patient.CSN || "",
    firstName: patient.FIRST_NAME || "",
    lastName: patient.LAST_NAME || "",
    age: patient.AGE || "",
    photo: patient.PHOTO || "",
    personalInformation: patient.INFORMATION.personalInformation || {},
    workInformation: patient.INFORMATION.workInformation || {},
    contactInformation: patient.INFORMATION.contactInformation || {},
    insurance: patient.INFORMATION.insurance || {},
  };

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

  const [personalInformation, setPersonalInformation] = useState<PersonalInformation>(initialValues.personalInformation);
  const [contactInformation, setContactInformation] = useState<ContactInformation>(initialValues.contactInformation);
  const [insurance, setInsurance] = useState<Insurance>(initialValues.insurance);
  const [workInformation, setWorkInformation] = useState<WorkInformation>(initialValues.workInformation);
  const [firstName, setFirstName] = useState<string>(initialValues.firstName);
  const [lastName, setLastName] = useState<string>(initialValues.lastName);
  const [age, setAge] = useState<string>(initialValues.age);
  const [avatarSrc, setAvatarSrc] = useState<string>(initialValues.photo||""); // Initial state
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleFirstNameChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFirstName(e.target.value as string);
  }

  const handleLastNameChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLastName(e.target.value as string);
  }

  const handleAgeChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAge(e.target.value as string);
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarSrc(reader.result as string);
          setIsUploaded(true);
        };
        reader.readAsDataURL(file);
      }
  };

  const handlePersonalInformationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name === 'gender') {
      setPersonalInformation((prev) => ({
        ...prev,
        gender: value as string,
      }));
    } else if (name === 'marriage') {
      setPersonalInformation((prev) => ({
        ...prev,
        marriage: value as string,
      }));
    } else if (name === 'race') {
      setPersonalInformation((prev) => ({
        ...prev,
        race: value as string,
      }))
    } else if (name === 'id' || name === 'mrn' || name === 'dob' || name === 'siblings' || name === 'pharmacy' || name === 'other') {
        setPersonalInformation((prev) => ({
        ...prev,
        [name]: value as string,
      }));
    }
  };

  const handleContactInformationChange = (e: React.ChangeEvent<HTMLInputElement |  HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setContactInformation((prev) => ({
      ...prev,
      [name as keyof ContactInformation]: value as string,
    }));
  };

  const handleInsuranceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setInsurance((prev) => ({
      ...prev,
      [name as keyof Insurance]: value as string
    }));
  };

  const handleWorkInformationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setWorkInformation((prev) => ({
      ...prev,
      [name as keyof WorkInformation]: value as string
    }));
  };

  const handleSubmit = async () => {
    const updatedPatient = {
      CSN: patient.CSN,
      FIRST_NAME: firstName || "",
      LAST_NAME: lastName ||"",
      PHOTO: avatarSrc || "",
      AGE: age || "",
      personalInformation:personalInformation,
      contactInformation:contactInformation,
      workInformation:workInformation,
      insurance:insurance,
    };
        try {
              await axios.post("http://localhost:5000/api/general", updatedPatient);
              alert("Patient saved successfully!");
            
        } catch (err) {
          console.error("Error saving patient:", err);
          alert("Error saving patient!");
        }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar_Patient appBarTitle="GENERAL" id={patient.CSN}/>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        
        <Container sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid
              container
              spacing={2}
              sx={{ marginleft: "10px", padding: "20px" }}
            >           
              <Grid item container xs={12}>
                      <Grid item xs={12} sm={12}>
                        <div className="setside">
                          <div className="left">
                            <IconButton component={Link} to="/patient-list" color="inherit">
                              <ArrowBackIcon />
                            </IconButton>
                          </div>                        
                        </div>
                      </Grid>  
                      
                     <Grid container spacing={2} sx={{justifyContent: "space-between",alignItems: "center",}}>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            id="chart"
                            label="Chart"
                            multiline
                            value={initialValues.id}
                            variant="standard"
                            fullWidth
                            name="chart"
                          />
                          
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            id="first-name"
                            label="First Name"
                            multiline
                            value={firstName}
                            variant="standard"
                            fullWidth
                            name="firstName"
                            onChange={handleFirstNameChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            id="last-name"
                            label="Last Name"
                            multiline
                            value={lastName}
                            variant="standard"
                            fullWidth
                            name="lastName"
                            onChange={handleLastNameChange}
                          />
                        </Grid>                     
                        <Grid item xs={12} sm={1}>
                          <TextField
                            id="age"
                            label="Age"
                            multiline
                            value={age}
                            variant="standard"
                            fullWidth
                            name="age"
                            onChange={handleAgeChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={1} style={{justifyContent:"flex-end"}}>
                          <IconButton component={Link} to="/pdf-viewer" color="inherit">
                            <DocumentScannerIcon                              
                              style={{
                                width:"50px",
                                height: "50px",
                              }}
                            ></DocumentScannerIcon>
                          </IconButton>
                        </Grid>
                      
                        <Grid item xs={12} sm={2} style={{textAlign:'right', paddingRight:'0'}}>
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              id="avatar-upload"
                              onChange={handleFileChange}
                            />
                            <label htmlFor="avatar-upload">
                              <IconButton style={{ padding: "0" }} component="span">
                                    {isUploaded ? (
                                      <Avatar
                                        variant="square"
                                        src={avatarSrc}
                                        alt="Avatar"
                                        style={{ width: "100px", height: "100px" }}
                                      />
                                    ) : (
                                      <Avatar
                                        variant="square"
                                        style={{ width: "100px", height: "100px" }}
                                      />
                                    )}
                              </IconButton>
                            </label>
                          </div>
                        </Grid>
                      
                      </Grid>                     
                      <Grid container spacing={2}>                        
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="personal-information" style={styles.container}>
                            <h2>Personal Information</h2>
                            <Grid container rowSpacing={1} columnSpacing={1}>
                              <Grid item xs={12}>
                                <TextField
                                  id="personal-informatin-id"
                                  label="ID"
                                  multiline
                                  value={personalInformation.id}
                                  variant="standard"
                                  fullWidth
                                  name="id"
                                  onChange={handlePersonalInformationChange}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="personal-information-mrn"
                                  label="MRN"
                                  multiline
                                  name="mrn"
                                  variant="standard"
                                  value={personalInformation.mrn}
                                  fullWidth
                                  onChange={handlePersonalInformationChange}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker label="DOB" value={personalInformation.dob ? dayjs(personalInformation.dob) : null} // Convert string to Dayjs object
                                      onChange={(newValue) => {
                                        setPersonalInformation((prev) => ({
                                          ...prev,
                                          dob: newValue ? newValue.format('YYYY-MM-DD') : '', // Format date as string
                                        }));
                                      }} slotProps={{ textField: { variant: 'standard', fullWidth: true, name:'dob' } }}  />
                                </LocalizationProvider>
                              </Grid>
                              <Grid item xs={6}>
                                <FormControl fullWidth variant="standard">
                                  <InputLabel id="personal-information-gender">Gender</InputLabel>
                                  <Select
                                    labelId="personal-information-gender"
                                    id="personal-information-gender"
                                    value={personalInformation.gender || ""}
                                    onChange={handlePersonalInformationChange}
                                    label="Gender"
                                    name="gender"
                                  >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Transgender">Transgender</MenuItem>
                                    <MenuItem value="Unknown">Unknown</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={6}>
                                <FormControl fullWidth variant="standard">
                                  <InputLabel id="personal-information-marriage">Marriage</InputLabel>
                                  <Select
                                    labelId="personal-information-marriage"
                                    id="personal-information-marriage"
                                    value={personalInformation.marriage || ""}
                                    onChange={handlePersonalInformationChange}
                                    label="Marriage"
                                    name="marriage"
                                  >
                                    <MenuItem value="Married">Married</MenuItem>
                                    <MenuItem value="Divorced">Divorced</MenuItem>
                                    <MenuItem value="Separated">Separated</MenuItem>
                                    <MenuItem value="Widowed">Widowed</MenuItem>
                                    <MenuItem value="Single">Single</MenuItem>
                                    <MenuItem value="Cohabiting">Cohabiting</MenuItem>
                                    <MenuItem value="Polygamous">Polygamous</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="personal-marriage-siblings"
                                  label="Siblings"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="siblings"
                                  onChange={handlePersonalInformationChange}
                                  value={personalInformation.siblings}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="personal-information-race">Race</InputLabel>
                                  <Select
                                    labelId="personal-information-race"
                                    id="personal-information-race"
                                    value={personalInformation?.race || ""}
                                    onChange={handlePersonalInformationChange}
                                    label="Race"
                                    name="race"
                                  >
                                    <MenuItem value="White">White</MenuItem>
                                    <MenuItem value="Black">Black</MenuItem>
                                    <MenuItem value="Hispanic">Hispanic</MenuItem>
                                    <MenuItem value="Asian">Asian</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="personal-information-pharamacy"
                                  label="Pharamacy"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="pharamacy"
                                  onChange={handlePersonalInformationChange}
                                  value={personalInformation.pharamacy}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Other"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="other"
                                  onChange={handlePersonalInformationChange}
                                  value={personalInformation.other}
                                />
                              </Grid>
                            </Grid>                       
                          </div>
                          <div className="contact-information" style={styles.container}>
                            <h2>Contact Information</h2>
                            <Grid container rowSpacing={1} columnSpacing={1}>
                              <Grid item xs={12}>
                                <TextField
                                  id="contact-information-address"
                                  label="Address"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="address"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.address}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="contact-information-city"
                                  label="City"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="city"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.city}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="contact-information-postcode"
                                  label="Post Code"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="postcode"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.postcode}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="contact-information-country"
                                  label="Country"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="country"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.country}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="contact-information-state"
                                  label="State"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="state"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.state}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="contact-information-homeph"
                                  label="Home Ph"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="homeph"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.homeph}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="contact-information-cellph"
                                  label="Cell Ph"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="cellph"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.cellph}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="contact-information-email"
                                  label="Email"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="email"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.email}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="contact-information-emergency"
                                  label="Emergency"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="emergency"
                                  onChange={handleContactInformationChange}
                                  value={contactInformation.emergency}
                                />
                              </Grid>
                            </Grid>                       
                          </div>                                      
                        </Grid>  
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="insurance" style={styles.container}>
                            <h2>Insurance 1</h2>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <TextField
                                  id="insurance-carrier"
                                  label="Carrier"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="carrier"
                                  onChange={handleInsuranceChange}
                                  value={insurance.carrier}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Address"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="address"
                                  onChange={handleInsuranceChange}
                                  value={insurance.address}
                                />
                              </Grid>
                              
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-city"
                                  label="City"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="city"
                                  onChange={handleInsuranceChange}
                                  value={insurance.city}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-postcode"
                                  label="Postcode"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="postcode"
                                  onChange={handleInsuranceChange}
                                  value={insurance.postcode}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-country"
                                  label="Country"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="country"
                                  onChange={handleInsuranceChange}
                                  value={insurance.country}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-state"
                                  label="State"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  value={insurance.state}
                                  name="state"
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-phone"
                                  label="Phone"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  value={insurance.phone}
                                  name="phone"
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-facsimile"
                                  label="Facsimile"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="facsimile"
                                  value={insurance.facsimile}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-plan"
                                  label="Plan"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="plan"
                                  value={insurance.plan}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-expiry"
                                  label="Expiry"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="expiry"
                                  value={insurance.expiry}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-id-no"
                                  label="ID No"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="idno"
                                  onChange={handleInsuranceChange}
                                  value={insurance.idno}

                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-group-no"
                                  label="Group No"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="groupno"
                                  value={insurance.groupno}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-copay"
                                  label="Copay"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="copay"
                                  value={insurance.copay}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-auth-no"
                                  label="Auth No"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="authno"
                                  value={insurance.authno}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              
                              <Grid item xs={12} paddingBottom={2} borderBottom={1} borderColor={"green"}>
                                <TextField
                                  id="insurance-remarks"
                                  label="Remarks"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="remarks"
                                  value={insurance.remarks}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-relation"
                                  label="Relation"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="relation"
                                  value={insurance.relation}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="insurance-home-ph"
                                  label="Home Ph"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="homeph"
                                  value={insurance.homeph}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid> 
                              <Grid item xs={5}>
                                <TextField
                                  id="insurance-last-name"
                                  label="Last Name"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="lastname"
                                  value={insurance.lastname}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={5}>
                                <TextField
                                  id="insurance-first-name"
                                  label="First Name"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="firstname"
                                  value={insurance.firstname}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <TextField
                                  id="insurance-mi"
                                  label="MI"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="mi"
                                  value={insurance.mi}
                                  onChange={handleInsuranceChange}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker label="DOB" value={insurance.dob ? dayjs(insurance.dob) : null} // Convert string to Dayjs object
                                      onChange={(newValue) => {
                                        setInsurance((prev) => ({
                                          ...prev,
                                          dob: newValue ? newValue.format('YYYY-MM-DD') : '', // Format date as string
                                        }));
                                      }} slotProps={{ textField: { variant: 'standard', fullWidth: true, name:'dob' } }}  />
                                </LocalizationProvider>
                              </Grid>
                              <Grid item xs={6}>
                                <FormControl fullWidth variant="standard">
                                  <InputLabel id="personal-information-gender">Gender</InputLabel>
                                  <Select
                                    labelId="personal-information-gender"
                                    id="personal-information-gender"
                                    value={insurance.gender || ""}
                                    onChange={handleInsuranceChange}
                                    label="Gender"
                                    name="gender"
                                  >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Transgender">Transgender</MenuItem>
                                    <MenuItem value="Unknown">Unknown</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>                                                                               
                          </div>  
                          <div className="work-information" style={styles.container}>
                            <h2>Work Information</h2>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="work-information-status">Status</InputLabel>
                                  <Select
                                    labelId="work-information-status"
                                    id="work-information-status"
                                    value={workInformation.status || ""}
                                    onChange={handleWorkInformationChange}
                                    label="Status"
                                    name="status"
                                  >
                                    <MenuItem value="Employed">Employed</MenuItem>
                                    <MenuItem value="Un-Employed">Un-Employed</MenuItem>
                                    <MenuItem value="Retired">Retired</MenuItem>
                                    <MenuItem value="Full-time Student">Full-time Student</MenuItem>
                                    <MenuItem value="Part-time Student">Part-time Student</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  id="work-information-work-ph"
                                  label="Work Ph:"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="workph"
                                  value={workInformation.workph}
                                  onChange={handleWorkInformationChange}

                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="work-information-employer"
                                  label="Employer:"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                  name="employer"
                                  value={workInformation.employer}
                                  onChange={handleWorkInformationChange}

                                />
                              </Grid>
                            </Grid>                                                                                       
                          </div>                        
                        </Grid>                      
                      </Grid>                     
                      <br />
                        
                      <Grid container justifyContent="flex-end" sx={{mt:3}}>
                        <Grid item xs={4} sm={3} md={2} lg={1}>
                          <Button
                            component={Link}
                            to="/patient-list"
                            color="inherit"
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={4} sm={3} md={2} lg={1}>
                          <Button type="submit" variant="contained" onClick={handleSubmit} >
                            Save
                          </Button>                          
                        </Grid>
                        <Grid item xs={4} sm={3} md={2} lg={1}>
                          <Button 
                           component={Link}
                           to={`/patient-info-history/${patient.CSN}`}
                           color="warning"
                           variant="contained"
                           >
                            History
                          </Button> 
                                                 
                        </Grid>
                      </Grid>  
                  
               
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding: '20px',
    margin: 'auto',
    marginTop: '20px',
  },
  header: {
    textAlign: 'center',
  },
   subHeader: {
    marginTop: '20px',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    marginLeft: '10px',
    width:'20%',
  },
  input: {
    flex: 1,
    marginLeft: '10px',
    padding: '5px',
    border: '1px solid lightgray',
    borderRadius: '3px',
  },
 
};

export default PatientInfo;
