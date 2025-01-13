import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
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
  responsiveFontSizes,
  Input,
  FormControl,
  Checkbox,
  ListItemText,
  Chip,
  Container,
  Toolbar,
  
} from "@mui/material";
import Appbar_Patient from "../../components/Appbar_Patientlist";
import ClickableAvatar from "../../components/ClickableAvatar";
import { SelectChangeEvent } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Appbar from "../../components/Appbar";
import { Link, useParams } from "react-router-dom";
import { DisplaySettings } from "@mui/icons-material";
import { experimentalStyled as styled } from '@mui/material/styles';

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";


// name

const name1 = ['Aunt','Brother','Children','Father', 'Grand Father', 'Grand Mother', 'Mother', 'Sister', 'Spouse', 'Uncle']
const name2 = [['Aunt','Brother','Children','Father', 'Grand Father', 'Grand Mother', 'Mother', 'Sister', 'Spouse', 'Uncle',''],
  ['Bone cancer', 'Breast cancer', 'Colon cancer', 'Blood cancer', 'Lung cancer', 'Lymphatic cancer', 'Ovarian cancer', 'Pancreatic cancer', 'Prostate cancer', 'Rectal cancer', 'Skin cancer', 'Stomach cancer', 'Other cancer']]
const name3 = ['Never', 'Rarely', 'Moderate', 'Heavy']
const name4 = [['Never', 'Rarely', 'Moderate', 'Heavy',''],['Amphetamines', 'Barbiturates', 'Cocaine', 'Crack', 'Ecstasy', 'Heroin', 'Inhalants', 'LSD', 'Marijuana', 'Morphine', 'Opium', 'PCP']]
const name5 = ['Airborne particles', 'Dust', 'Fumes', 'Industrial chemicals', 'Passive smoke', 'Solvents', 'Vaccinations']
const name6 = ['Had contact with a documented TB patient', 'Had contact with someone coughing up blood', 'Had contact with someone coughing for weeks']
const name7 = ['Had artificial insemination', 'Had sex with high a risk person', 'Injected street drugs', 'Received blood transfusion', 'Received clotting factor', 'Received organ transplant', 'Worked in a health care lab']
const name8 = ['No relations', 'Bisexual', 'Heterosexual', 'Homosexual']
const name9 = [['Never', 'Daily', 'Weekly', 'Occasional',''], ['Walks', 'Runs', 'Swims']]
const name10 = ['Less than 6 hours', '6 to 8 hours', 'More than 8 hours']

// allergen status

export function AllergenStatus () {

  const [allergenStatus, setAllergenStatus] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setAllergenStatus(event.target.value);
  };
  return (
      <>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={allergenStatus}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value={10}>Active</MenuItem>
            <MenuItem value={20}>Inactive</MenuItem>
          </Select>
        </FormControl>
      </>
    );
}

// select sts

export function Sts () {
  
  const [sts, setSts] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setSts(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Sts</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sts}
          onChange={handleChange}
          label="Sts"
        >
          <MenuItem value={10}>Completed</MenuItem>
          <MenuItem value={20}>Parental Refusal</MenuItem>
          <MenuItem value={30}>Patient Refusal</MenuItem>
          <MenuItem value={40}>Religious Refusal</MenuItem>
          <MenuItem value={50}>Historical Data</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

// unit 

export function Unit () {

  const [unit, setUnit] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };
  return (
    <>
      <FormControl variant="standard" fullWidth>
        
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={unit}
          onChange={handleChange}
          label="Unit"
        >
          <MenuItem value={10}>mL</MenuItem>
          <MenuItem value={20}>mg</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

// select site

export function Site () {

  const [site, setSite] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setSite(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Site</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={site}
          onChange={handleChange}
          label="Unit"
        >
          <MenuItem value={10}>Left Arm</MenuItem>
          <MenuItem value={20}>Left Deltoid</MenuItem>
          <MenuItem value={30}>Left Gluteus Medius</MenuItem>
          <MenuItem value={40}>Left Lower Forearm</MenuItem>
          <MenuItem value={50}>Left Thigh</MenuItem>
          <MenuItem value={60}>Left Vastus Lateralis</MenuItem>
          <MenuItem value={70}>Right Arm</MenuItem>
          <MenuItem value={80}>Right Deltoid</MenuItem>
          <MenuItem value={90}>Right Gluteus Medius</MenuItem>
          <MenuItem value={100}>Right Lower Forearm</MenuItem>
          <MenuItem value={110}>Right Thigh</MenuItem>
          <MenuItem value={120}>Right Vastus Lateralis</MenuItem>
        </Select>
      </FormControl>
    </>
  );
  
}

// set Route

export function Influenza_Vaccine_Route () {

  const [vaccineRoute, setVaccineRoute] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setVaccineRoute(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Route</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={vaccineRoute}
          onChange={handleChange}
          label="Vaccine_Route"
        >
          <MenuItem value={10}>Inhalation</MenuItem>
          <MenuItem value={20}>Intramuscular</MenuItem>
          <MenuItem value={30}>Intranasal</MenuItem>
          <MenuItem value={40}>Intravenous</MenuItem>
          <MenuItem value={50}>Mouth</MenuItem>
          <MenuItem value={60}>Oral</MenuItem>
          <MenuItem value={70}>Rectal</MenuItem>
          <MenuItem value={80}>Subcutaneous</MenuItem>
          <MenuItem value={90}>Sublingual</MenuItem>
          <MenuItem value={100}>Topical</MenuItem>
          <MenuItem value={110}>Urethral</MenuItem>
          <MenuItem value={120}>Vaginal</MenuItem>
          <MenuItem value={130}>Other</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

// set MFR

/*
type Option = {
  code: string;
  label: string;
};

const options: Option[] = [
  { code: "AB", label: "Abbott" },
  { code: "AD", label: "Adams" },
  { code: "ALP", label: "Alpha" },
];

export function Mfr() {
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [textFieldLabel, setTextFieldLabel] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const selectedOption = options.find((option) => option.label === value);

    if (selectedOption) {
      setSelectedCode(selectedOption.code);
      setTextFieldLabel(selectedOption.label);
    }
  };

  return (
    <Grid container sx={{alignItems:'end'}}>
      <Grid item xs={6} >
        <TextField
          label="MFR"
          value={textFieldLabel}
          fullWidth
          variant="standard"
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="standard">
          <Select
            labelId="select-label"
            value={selectedCode}
            onChange={handleSelectChange}
          >
            {options.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {`${option.code}-${option.label}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

*/
const options:string[] = ['AB-Abbott', 'AD-Adams', 'ALP-Alpha', 'AVI-Aviron', 'BAH-Baxter Health Care', 'BAY-Bayer', 'BPC-Berna Products', 'CNJ-Cangene Corporation', 'CSL-CSL Behring', 'DVC-DynPort', 'GEO-GeoVax', 'GRE-Greer', 'IUS-Immuno US', 'JPN-RFMD Osaka University', 'KGC-Korea Green Cross', 'MBL-Massachusetts Biologic', 'MED-MedImmune', 'MIP-BioPort', 'MSD-Merck'
, 'NAB-North American Biologic', 'NOV-Novartis', 'NVX-Novavax, Inc', 'NYB-New York Blood Center', 'ORT-Ortho', 'OTC-Organon Teknika', 'PD-Parkdale Pharmaceuticals', 'PMC-Sanofi Pasteur', 'SCL-Sclavo', 'SKB-GlaxoSmithKline', 'SOL-Solvay', 'TAL-Talecris', 'USA-US Army Medical Research', 'VXG-VaxGen', 'WAL-Wyeth Ayerst', 'ZLB-ZLB Behring', '', 'OTH-Other Manufacturer', 'UNK-Unknown Manufacturer'
];
export function Mfr () {

  const [mfr, setMfr] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setMfr(event.target.value);
  };
  return (
      <>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">MFR</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={mfr}
            onChange={handleChange}
            label="MFR"
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}

          </Select>
        </FormControl>
      </>
    );
}



// set history

interface HistoryProps {
  label?: string; // Optional prop to customize the label
  names?: string[] | string[][]; // Accepts either a 1D or 2D array
}

export function History({
  label = 'Diabetes',
  names = name1,
}: HistoryProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
  };

  // Ensure names is always a 2D array for consistent processing
  const processedNames = Array.isArray(names[0]) ? (names as string[][]) : [names as string[]];

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Label */}
      <Grid item xs={3} sx={{ mt: 1 }}>
        <label>{label}:</label>
      </Grid>

      {/* Checkbox */}
      <Grid item xs={1}>
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
          inputProps={{ 'aria-label': 'controlled' }}
          color="success"
        />
      </Grid>

      {/* Select Component */}
      <Grid item xs={8}>
        <FormControl variant="standard" fullWidth>
          <Select
            labelId="select-quality-label"
            id="multiple-checkbox-select"
            multiple
            disabled={!checked} // Disable when unchecked
            value={selectedOptions}
            onChange={handleSelectChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => {
                  const isSecondArray =
                    processedNames.length > 1 && processedNames[1].includes(value);
                  return (
                    <Chip
                      key={value}
                      label={value}
                      color={isSecondArray ? 'error' : 'success'}
                    />
                  );
                })}
              </Box>
            )}
          >
            {processedNames.flat().map((name, index) =>
              name === '' ? (
                // Render blank space as a non-selectable separator
                <MenuItem key={`separator-${index}`} disabled>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    <>&nbsp;</>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedOptions.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
}

// set master problem status

export function Master_Problem_List () {
  const [problemListStatus, setProblemListStatus] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setProblemListStatus(event.target.value);
  };
  return (
      <>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={problemListStatus}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value={10}>Improving</MenuItem>
            <MenuItem value={20}>Stable</MenuItem>
            <MenuItem value={30}>Controlled</MenuItem>
            <MenuItem value={40}>Worsening</MenuItem>
            <MenuItem value={50}>Uncontrolled</MenuItem>
            <MenuItem value={60}>Resolved</MenuItem>
            <MenuItem value={70}>Ruled Out</MenuItem>
            <MenuItem value={80}>Active</MenuItem>
            <MenuItem value={90}>Inactive</MenuItem>
          </Select>
        </FormControl>
      </>
    );
}

// set Nature

export function Nature () {

  const [nature, setNature] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setNature(event.target.value);
  };
  return (
      <>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Nature</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={nature}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value={10}>Minor</MenuItem>
            <MenuItem value={20}>Self Limited</MenuItem>
            <MenuItem value={30}>Time Limited</MenuItem>
            <MenuItem value={40}>Acute</MenuItem>
            <MenuItem value={50}>Chronic</MenuItem>
            <MenuItem value={60}>Intermittent</MenuItem>
            <MenuItem value={70}>Recurrent</MenuItem>
            <MenuItem value={80}>Condition</MenuItem>
            <MenuItem value={90}>Symptom</MenuItem>
            <MenuItem value={100}>Finding</MenuItem>
            <MenuItem value={110}>Limitation</MenuItem>
          </Select>
        </FormControl>
      </>
    );
}

// set medication list status

export function Medication_List_Status () {

  const [medicationListStatus, setMedicationListStatus] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setMedicationListStatus(event.target.value);
  };
  return (
      <>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={medicationListStatus}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value={10}>Active</MenuItem>
            <MenuItem value={20}>Inactive</MenuItem>
            <MenuItem value={30}>Completed</MenuItem>
            <MenuItem value={40}>Discontinued</MenuItem>
            <MenuItem value={50}>Erroneous</MenuItem>
            <MenuItem value={60}>Not Covered</MenuItem>
          </Select>
        </FormControl>
      </>
    );

}

// set Rx unit

export function Rx () {

  const [unit, setUnit] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };
  return (
    <>
      <FormControl variant="standard" fullWidth>
        
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={unit}
          onChange={handleChange}
          label="Unit"
        >
          <MenuItem value={10}>GEQ</MenuItem>
          <MenuItem value={20}>DAW</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}



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


const PatientInfo = ({ patients }: any) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients?.find(
    (patient: any) => patient.id === parseInt(id || "", 10)
  );
  const initialValues = {
    id: patient.id,
    firstName: patient.firstName,
    lastName: patient.lastName,
    address: patient.address,
    phoneNumber: patient.phoneNumber,
    email: patient.email,
    age: patient.age,
    bloodGroup: patient.bloodGroup,
    referredByDoctor: patient.referredByDoctor,
    referredByDoctorEmail: patient.referredByDoctorEmail,
    referredByDoctorPhoneNumber: patient.referredByDoctorPhoneNumber,
    diseases: patient.diseases,
    patientHistory: patient.patientHistory,
  };
  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log(values);
    //resetForm();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar_Patient appBarTitle="HISTORY" id={patient.id}/>
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
              <Grid item xs={12}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={PatientInfoSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    
                    <Form>
                      <Grid item xs={12} sm={12}>
                      <div className="setside">
                        <div className="left">
                          <IconButton component={Link} to="/patient-list" color="inherit">
                            <ArrowBackIcon />
                          </IconButton>
                        </div>                        
                      </div>
                        </Grid>  
                      
                     <Grid container rowSpacing={2} sx={{justifyContent: "space-between",alignItems: "center",}}>
                        <Grid item xs={12} sm={2}>
                          <Field
                            as={TextField}
                            name="id"
                            label="Chart"
                            fullWidth
                          />
                          
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            fullWidth
                            error={errors.firstName && touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            error={errors.lastName && touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                          />
                        </Grid>                     
                        <Grid item xs={12} sm={1}>
                          <Field
                            as={TextField}
                            name="age"
                            label="Age"
                            fullWidth
                            error={touched.age && Boolean(errors.age)}
                            helperText={touched.age && errors.age}
                          />
                        </Grid>
                      
                        <Grid item xs={12} sm={2} style={{textAlign:'right', paddingRight:'0'}}>
                          <ClickableAvatar/>
                        </Grid>
                      
                      </Grid>                     
                      <Grid container spacing={2} >                        
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="past-medical-history" style={styles.container} >
                            <h2>Past Medical History</h2>
                            <TextField 
                              id="past-medical-history"
                              fullWidth
                              multiline 
                              rows={8}
                              placeholder="Please write the past medical history" />
                          </div>
                          <div style={styles.container} className="past-surgical-history">
                            <h2>Known Allergies</h2>
                            <Grid container rowSpacing={1} columnSpacing={1}>
                              <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Allergen</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel htmlFor="component-simple">Reaction</InputLabel>
                                  <Input id="component-simple" />
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <AllergenStatus/>
                              </Grid>
                            </Grid>
                          </div>
                          <div style={styles.container} className="past-surgical-history">
                            <h2>Health Maintenance</h2>
                            <div className="influenza-vaccine" style={styles.container}>
                              <label>Influenza Vaccine</label>
                              <Grid container rowSpacing={1} columnSpacing={1} alignItems={"end"}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem>
                                      <DatePicker label="Date"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                    </DemoItem>
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Next"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item container xs={4} alignItems='end'>
                                  <Grid xs={8}>
                                    <TextField
                                      id="outlined-multiline-static"
                                      label="Dose"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid xs={4}>
                                    <Unit/>
                                  </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                  <Site/>
                                </Grid>
                                <Grid item xs={4}>
                                  <Influenza_Vaccine_Route/>
                                </Grid>
                                <Grid item xs={4}>
                                  <Mfr/>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Lot"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Expiry"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="pneumococcal-vaccine" style={styles.container}>
                              <label>Pneumococcal Vaccine</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Next"  slotProps={{ textField: { variant: 'standard', fullWidth: true} }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item container xs={4} alignItems='end'>
                                  <Grid xs={8}>
                                    <TextField
                                      id="outlined-multiline-static"
                                      label="Dose"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid xs={4}>
                                    <Unit/>
                                  </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                  <Site/>
                                </Grid>
                                <Grid item xs={4}>
                                  <Influenza_Vaccine_Route/>
                                </Grid>
                                <Grid item xs={4}>
                                  <Mfr/>
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Lot"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Expiry"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="colorectal-screening" style={styles.container}>
                              <label>Colorectal Screening</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Next"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="prostate-screening" style={styles.container}>
                              <label>Prostate Screening</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Next"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="screening-mammogram" style={styles.container}>
                              <label>Screening Mammogram</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Next"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="screening-pap-smear" style={styles.container}>
                              <label>Screening Pap Smear</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Next"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          </div>                         
                        </Grid>  
                        <Grid item xs={12} sm={6} md={6}>
                          <div style={styles.container} className="past-surgical-history">
                            <h2>Past Surgical History</h2>
                            <TextField 
                              id="past-surgical-history"
                              fullWidth
                              multiline 
                              rows={8}
                              placeholder="Please write the past surgical history" />
                          </div>
                          <div className="family-history" style={styles.container}>
                            <h2>Family History</h2>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={12}>
                                <History names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Stroke" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Hypertension" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Heart Disease" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Cancer" names={name2}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Asthma" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Hay Fever" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Arthritis" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Osteoporosis" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Anemia" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Migraine" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Alzheimers" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Epilepsy" names={name1}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Glaucoma" names={name1}/>
                              </Grid>
                            </Grid>
                          </div>  
                          <div className="social-history" style={styles.container}>
                            <h2>Social History</h2>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={12}>
                                <History label="Alcohol Use" names={name3}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Caffeine Use" names={name3}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Tobacco Use" names={name3}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Drugs Use" names={name4}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Chm Exposure" names={name5}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="TB Exposure" names={name6}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="HIV Exposure" names={name7}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Sex Relations" names={name8}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Exercise" names={name9}/>
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Sleep Habits" names={name10}/>
                              </Grid>
                            </Grid>       
                          </div>
                          <div className="master-problem-list" style={styles.container}>
                              <h2>Master Problem List</h2>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Code"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Onset"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <Nature/>
                                </Grid>
                                <Grid item xs={8}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Desc"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <Master_Problem_List/>
                                </Grid>
                              </Grid>
                          </div>
                          <div className="master-medication-list" style={styles.container}>
                              <h2>Master Medication List</h2>
                              <Grid container rowSpacing={1} columnSpacing={1} sx={{alignItems:"end"}}>
                                <Grid item xs={10}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Rx"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                  <Rx/>
                                </Grid>
                                <Grid item xs={8}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Sig"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <Medication_List_Status/>
                                </Grid>
                              </Grid>
                          </div>                        
                        </Grid>                      
                      </Grid>                     
                      <br />
                      <Grid container justifyContent="flex-end" sx={{p: 5}}>
                        <Grid item xs={2} sm={1}>
                          <Button
                            component={Link}
                            to={`/patient-info/${patient.id}`}
                            color="inherit"
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button type="submit" variant="contained">
                            Save
                          </Button>                          
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button 
                           component={Link}
                           to={`/patient-info-encounter/${patient.id}`}
                           color="warning"
                           variant="contained"
                           >
                            Encounter
                          </Button>                          
                        </Grid>
                      </Grid>
                      
                    </Form>
                  )}
                </Formik>
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
