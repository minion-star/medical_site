import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import { MenuProps } from '@mui/material';
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

// Declare Data Type
interface KnownAllergies {
  allergen:string,
  reaction:string,
  status: string,
}

interface Vaccine {
  date:string,
  sts:string,
  next:string,
  dose:string,
  unit:string,
  site:string,
  route:string,
  mfr:string,
  lot:string,
  expiry: string,
  note:string,
}

interface Screening {
  date:string,
  sts:string,
  next:string,
  note:string,
}

interface HealthMaintenance {
  influenzaVaccine:Vaccine,
  pneumococcalVaccine:Vaccine,
  colorectalScreening:Screening,
  prostateScreening:Screening,
  screeningMammogram:Screening,
  screeningPapSmear:Screening,
}

interface History {
  check:boolean,
  textfield:string,
}


interface FamilyHistory {
  diabetes:History,
  stroke:History,
  hypertension:History,
  heartDisease:History,
  cancer:History, 
  asthma:History,
  hayFever:History,
  arthritis:History,
  osteoporosis:History,
  anemia:History, 
  migraine:History,  
  alzheimers:History,
  epilepsy:History,
  glaucoma:History,
}

interface SocialHistory {
  alcoholUse:History,
  caffeineUse:History,
  tobaccoUse:History,
  drugsUse:History,
  chmExposure:History,
  tbExposure:History,
  hivExposure:History,
  sexRelations:History,
  exercise:History,
  sleepHabits:History,
}


interface MasterProblemList {
  code:string,
  onset:string,
  nature:string,
  desc:string,
  status:string,
}

interface MasterMedicationList {
  rx:string,
  sig:string,
  select:string,
  status:string,
}

interface StsProps {
  value:string;
  onChange:(value:string)=>void;
}



// select sts

export function Sts ({value, onChange}:StsProps) {
  
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Sts</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Sts"
        >
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Parental Refusal">Parental Refusal</MenuItem>
          <MenuItem value="Patient Refusal">Patient Refusal</MenuItem>
          <MenuItem value="Religious Refusal">Religious Refusal</MenuItem>
          <MenuItem value="Historical Data">Historical Data</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

// unit 
export function Unit ({value, onChange}:StsProps) {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
    <>
      <FormControl variant="standard" fullWidth>
        
        <Select
          labelId="Unit"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Unit"
        >
          <MenuItem value="mL">mL</MenuItem>
          <MenuItem value="mg">mg</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

// select site

function Site ({value, onChange}:StsProps) {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Site</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="Site"
          value={value}
          onChange={handleChange}
          label="Site"
        >
          <MenuItem value="Left Arm">Left Arm</MenuItem>
          <MenuItem value="Left Deltoid">Left Deltoid</MenuItem>
          <MenuItem value="Left Gluteus Medius">Left Gluteus Medius</MenuItem>
          <MenuItem value="Left Lower Forearm">Left Lower Forearm</MenuItem>
          <MenuItem value="Left Thigh">Left Thigh</MenuItem>
          <MenuItem value="Left Vastus Lateralis">Left Vastus Lateralis</MenuItem>
          <MenuItem value="Right Arm">Right Arm</MenuItem>
          <MenuItem value="Right Deltoid">Right Deltoid</MenuItem>
          <MenuItem value="Right Gluteus Medius">Right Gluteus Medius</MenuItem>
          <MenuItem value="Right Lower Forearm">Right Lower Forearm</MenuItem>
          <MenuItem value="Right Thigh">Right Thigh</MenuItem>
          <MenuItem value="Right Vastus Lateralis">Right Vastus Lateralis</MenuItem>
        </Select>
      </FormControl>
    </>
  );
  
}

// set Route

function Influenza_Vaccine_Route ({value, onChange}:StsProps) {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Route</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Vaccine_Route"
        >
          <MenuItem value="Inhalation">Inhalation</MenuItem>
          <MenuItem value="Intramuscular">Intramuscular</MenuItem>
          <MenuItem value="Intranasal">Intranasal</MenuItem>
          <MenuItem value="Intravenous">Intravenous</MenuItem>
          <MenuItem value="Mouth">Mouth</MenuItem>
          <MenuItem value="Oral">Oral</MenuItem>
          <MenuItem value="Rectal">Rectal</MenuItem>
          <MenuItem value="Subcutaneous">Subcutaneous</MenuItem>
          <MenuItem value="Sublingual">Sublingual</MenuItem>
          <MenuItem value="Topical">Topical</MenuItem>
          <MenuItem value="Urethral">Urethral</MenuItem>
          <MenuItem value="Vaginal">Vaginal</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
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
function Mfr ({value, onChange}:StsProps) {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
      <>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">MFR</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={value}
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
  checked: boolean; // Pass the current checkbox state
  textFieldValue: string; // Pass the current textfield value
  onCheckChange: (checked: boolean) => void; // Callback for checkbox changes
  onTextFieldChange: (value: string) => void; // Callback for textfield changes
}

function History({
  label = "Diabetes",
  names = [],
  checked,
  textFieldValue,
  onCheckChange,
  onTextFieldChange,
}: HistoryProps) {
  const [dropdownValue, setDropdownValue] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    const latestSelection = selectedValues[selectedValues.length - 1];

    // Append the latest selection to the text field if it's valid
    if (latestSelection.trim() !== "") {
      onTextFieldChange(
        textFieldValue
          ? `${textFieldValue} | ${latestSelection}` // Append with a separator
          : latestSelection // Start with the first value
      );
    }

    // Reset dropdown value to allow repeated selections
    setDropdownValue([]);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange(event.target.checked); // Update the checkbox state in the parent
  };

  const processedNames = Array.isArray(names[0])
    ? (names as string[][])
    : [names as string[]];

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Grid container>
        {/* Label */}
        <Grid item xs={3} sx={{ mt: 2 }}>
          <label>{label}:</label>
        </Grid>

        {/* Checkbox */}
        <Grid item xs={1} sx={{ mt: 1 }}>
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            inputProps={{ "aria-label": "controlled" }}
            color="success"
          />
        </Grid>

        {/* Text Field and Dropdown */}
        <Grid container item xs={8} alignItems={"end"}>
          <Grid item xs={11} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              variant="standard"
              multiline
              value={textFieldValue}
              onChange={(e) => onTextFieldChange(e.target.value)}
              disabled={!checked} // Disable when unchecked
            />
          </Grid>

          {/* Dropdown */}
          <Grid item xs={1} sx={{ mb: 1 }}>
            <FormControl variant="standard">
              <Select
                labelId="select-quality-label"
                id="multi-select"
                multiple
                value={dropdownValue} // Maintain dropdown state
                onChange={handleSelectChange} // Handle selection changes
                renderValue={() => null} // Prevent values from displaying in dropdown
                disabled={!checked} // Disable when unchecked
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Limit height
                    },
                  },
                }}
              >
                {processedNames.flat().map((name, index) =>
                  name === "" ? (
                    <MenuItem key={`separator-${index}`} disabled>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        <>&nbsp;</>
                      </Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}





const PatientHistoryInfo:React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [pastMedicalHistory, setPastMedicalHistory] = useState<string>("");
  const [pastSurgicalHistory, setPastSurgicalHistory] = useState<string>("");
  const [knownAllergies, setKnownAllergies] = useState<KnownAllergies>({allergen:"", reaction:"", status:"",});
  const [healthMaintenance, setHealthMaintenance] = useState<HealthMaintenance>({influenzaVaccine:{date:"", sts:"", next:"",dose:"",unit:"", site:"", route:"", mfr:"", lot:"", expiry:"", note:"",}, pneumococcalVaccine:{date:"", sts:"", next:"",dose:"",unit:"", site:"", route:"", mfr:"", lot:"", expiry:"", note:"",},
    colorectalScreening:{date:"", sts:"", next:"", note:"",}, prostateScreening:{date:"", sts:"", next:"", note:"",}, screeningMammogram:{date:"", sts:"", next:"", note:"",}, screeningPapSmear:{date:"", sts:"", next:"", note:"",},});
  const [familyHistory, setFamilyHistory] = useState<FamilyHistory>({diabetes:{check:false, textfield:""}, stroke:{check:false, textfield:""},  hypertension:{check:false, textfield:""},  heartDisease:{check:false, textfield:""},  cancer:{check:false, textfield:""},   asthma:{check:false, textfield:""},  hayFever:{check:false, textfield:""},  arthritis:{check:false, textfield:""},  osteoporosis:{check:false, textfield:""}, anemia:{check:false, textfield:""}, migraine:{check:false, textfield:""}, alzheimers:{check:false, textfield:""},  epilepsy:{check:false, textfield:""},  glaucoma:{check:false, textfield:""},});
  const [socialHistory, setSocialHistory] = useState<SocialHistory>({alcoholUse:{check:false, textfield:""},  caffeineUse:{check:false, textfield:""},  tobaccoUse:{check:false, textfield:""},  drugsUse:{check:false, textfield:""},  chmExposure:{check:false, textfield:""},  tbExposure:{check:false, textfield:""},  hivExposure:{check:false, textfield:""},  sexRelations:{check:false, textfield:""},  exercise:{check:false, textfield:""}, sleepHabits:{check:false, textfield:""},});
  const [masterProblemList, setMasterProblemList] = useState<MasterProblemList>({code:"", onset:"", nature:"", desc:"", status:"",});
  const [masterMedicationList, setMasterMedicationList] = useState<MasterMedicationList>({rx:"", sig:"", select:"", status:"",});

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/general/${id}`);
        const patientData = response.data;

        if (patientData.PHOTO) {
          setAvatarSrc(`http://localhost:5000/${patientData.PHOTO}`);
      
        } 

        // Populate states with fetched data
        setFirstName(patientData.FIRST_NAME || "");
        setLastName(patientData.LAST_NAME || "");
        setAge(patientData.AGE || "");
      } catch (err) {
        console.error("Error fetching patient data:", err);
      } 

    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/history/${id}`);
        const data = response.data;
  
        // Assuming your data comes in the correct format
        setPastMedicalHistory(data.PAST_MEDICAL_HISTORY || "");
        setPastSurgicalHistory(data.PAST_SURGICAL_HISTORY || "");
        setKnownAllergies(JSON.parse(data.KNOWN_ALLERGIES || '{}'));
        setHealthMaintenance(JSON.parse(data.HEALTH_MAINTENANCE || '{}'));
        setFamilyHistory(JSON.parse(data.FAMILY_HISTORY || '{}'));
        setSocialHistory(JSON.parse(data.SOCIAL_HISTORY || '{}'));
        setMasterProblemList(JSON.parse(data.MASTER_PROBLEM_LIST || '{}'));
        setMasterMedicationList(JSON.parse(data.MASTER_MEDICATION_LIST || '{}'));
    
        console.log("Health Maintenance:", healthMaintenance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id]);


  const handlePastMedicalHistoryChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setPastMedicalHistory(e.target.value);
  }
  const handlePastSurgicalHistoryChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setPastSurgicalHistory(e.target.value);
  }
 
  
  const handleKnownAllergiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
      const { name, value } = e.target;
      setKnownAllergies((prev) => ({
        ...prev,
        [name as keyof KnownAllergies]: value as string
      }));
  };
  

  const handleHealthMaintenanceChange = (
    category: keyof HealthMaintenance,
    field: keyof Vaccine | keyof Screening,
    value: string
  ) => {
    setHealthMaintenance((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };


const handleMasterProblemListChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setMasterProblemList((prev) => ({
      ...prev,
      [name as keyof MasterProblemList]: value as string
    }));
};

const handleMasterMedicationListChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
  const { name, value } = e.target;
  setMasterMedicationList((prev) => ({
    ...prev,
    [name as keyof MasterMedicationList]: value as string
  }));
};

const handleFamilyHistoryChange = (
  key: keyof FamilyHistory, // The specific condition (e.g., "diabetes", "stroke")
  field: keyof History, // Either "check" or "textfield"
  value: boolean | string // The new value (boolean for checkbox, string for textfield)
) => {
  setFamilyHistory((prev) => ({
    ...prev,
    [key]: {
      ...prev[key],
      [field]: value,
    },
  }));
};

const handleSocialHistoryChange = (
  key: keyof SocialHistory, 
  field: keyof History, // Either "check" or "textfield"
  value: boolean | string 
) => {
  setSocialHistory((prev) => ({
    ...prev,
    [key]: {
      ...prev[key],
      [field]: value,
    },
  }));
};


const handleSubmit = async () => {
  const data = {
    CSN: id,  // This is your CSN (id)
    PAST_MEDICAL_HISTORY: pastMedicalHistory,
    PAST_SURGICAL_HISTORY: pastSurgicalHistory,
    KNOWN_ALLERGIES: JSON.stringify(knownAllergies),
    HEALTH_MAINTENANCE: JSON.stringify(healthMaintenance),
    FAMILY_HISTORY: JSON.stringify(familyHistory),
    SOCIAL_HISTORY: JSON.stringify(socialHistory),
    MASTER_PROBLEM_LIST: JSON.stringify(masterProblemList),
    MASTER_MEDICATION_LIST: JSON.stringify(masterMedicationList),
  };

  try {
    const response = await axios.post('http://localhost:5000/api/history', data);
    console.log(response.data.message);
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar_Patient appBarTitle="HISTORY" id={id}/>
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
              <Grid container item xs={12}>
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
                            value={id}
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
                          />
                        </Grid>
                        <Grid item xs={12} sm={2} style={{textAlign:'right', paddingRight:'0'}}>
                          <IconButton style={{ padding: "0" }} component="span">
                            <Avatar
                              variant="square"
                              src={avatarSrc}
                              alt="Avatar"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </IconButton>
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
                              placeholder="Please write the past medical history"
                              value={pastMedicalHistory}
                              onChange={handlePastMedicalHistoryChange} 
                              />
                          </div>
                          <div style={styles.container} className="known-allergies">
                            <h2>Known Allergies</h2>
                            <Grid container rowSpacing={1} columnSpacing={1}>
                              <Grid item xs={12}>
                                <TextField
                                  id="allergen"
                                  label="Allergen"
                                  multiline
                                  value={knownAllergies.allergen ||""}
                                  variant="standard"
                                  fullWidth
                                  name="allergen"
                                  onChange={handleKnownAllergiesChange}
                                />                                
                              </Grid>
                              <Grid item xs={8}>
                                <TextField
                                  id="reaction"
                                  label="Reaction"
                                  multiline
                                  value={knownAllergies.reaction}
                                  variant="standard"
                                  fullWidth
                                  name="reaction"
                                  onChange={handleKnownAllergiesChange}
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="known-allergies-status">Status</InputLabel>
                                  <Select
                                    labelId="known-allergies-status"
                                    id="known-allergies-status"
                                    value={knownAllergies.status ||""}
                                    onChange={handleKnownAllergiesChange}
                                    label="Status"
                                    name="status"
                                  >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>
                          <div style={styles.container} className="health-maintenance">
                            <h2>Health Maintenance</h2>
                            <div className="influenza-vaccine" style={styles.container}>
                              <label>Influenza Vaccine</label>
                              <Grid container rowSpacing={1} columnSpacing={1} alignItems={"end"}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Date"
                                      value={healthMaintenance.influenzaVaccine.date ? dayjs(healthMaintenance.influenzaVaccine.date) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("influenzaVaccine", "date", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"date" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts value={healthMaintenance.influenzaVaccine.sts}
                                    onChange={(newValue) => handleHealthMaintenanceChange("influenzaVaccine", "sts", newValue)}/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Next"
                                      value={healthMaintenance.influenzaVaccine.next ? dayjs(healthMaintenance.influenzaVaccine.next) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("influenzaVaccine", "next", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"next" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item container xs={4} alignItems='end'>
                                  <Grid item xs={8}>
                                    <TextField
                                      id="health-maintenance-influenza-vaccine-dose"
                                      label="Dose"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                      value={healthMaintenance.influenzaVaccine.dose}
                                      onChange={(e) =>
                                        handleHealthMaintenanceChange("influenzaVaccine", "dose", e.target.value)
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Unit
                                      value={healthMaintenance.influenzaVaccine.unit}
                                      onChange={(newValue) => handleHealthMaintenanceChange("influenzaVaccine", "unit", newValue)}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                  <Site value={healthMaintenance.influenzaVaccine.site}
                                      onChange={(newValue) => handleHealthMaintenanceChange("influenzaVaccine", "site", newValue)}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <Influenza_Vaccine_Route 
                                    value={healthMaintenance.influenzaVaccine.route}
                                    onChange={(newValue) => handleHealthMaintenanceChange("influenzaVaccine", "route", newValue)}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <Mfr 
                                    value={healthMaintenance.influenzaVaccine.mfr}
                                    onChange={(newValue) => handleHealthMaintenanceChange("influenzaVaccine", "mfr", newValue)}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Lot"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("influenzaVaccine", "lot", e.target.value)
                                    }
                                    value={healthMaintenance.influenzaVaccine.lot}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Expiry"
                                      value={healthMaintenance.influenzaVaccine.expiry ? dayjs(healthMaintenance.influenzaVaccine.expiry) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("influenzaVaccine", "expiry", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"expiry" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("influenzaVaccine", "note", e.target.value)
                                    }
                                    value={healthMaintenance.influenzaVaccine.note}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="pneumococcal-vaccine" style={styles.container}>
                              <label>Pneumococcal Vaccine</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Date"
                                      value={healthMaintenance.pneumococcalVaccine.date ? dayjs(healthMaintenance.pneumococcalVaccine.date) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("pneumococcalVaccine", "date", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"date" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts value={healthMaintenance.pneumococcalVaccine.sts}
                                      onChange={(newValue) => handleHealthMaintenanceChange("pneumococcalVaccine", "sts", newValue)}/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Next"
                                      value={healthMaintenance.pneumococcalVaccine.next ? dayjs(healthMaintenance.pneumococcalVaccine.next) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("pneumococcalVaccine", "next", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"next" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item container xs={4} alignItems='end'>
                                  <Grid item xs={8}>
                                    <TextField
                                      id="outlined-multiline-static"
                                      label="Dose"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                      onChange={(e) =>
                                        handleHealthMaintenanceChange("pneumococcalVaccine", "dose", e.target.value)
                                      }
                                      value={healthMaintenance.pneumococcalVaccine.dose}
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Unit value={healthMaintenance.pneumococcalVaccine.unit}
                                      onChange={(newValue) => handleHealthMaintenanceChange("pneumococcalVaccine", "unit", newValue)}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                  <Site value={healthMaintenance.pneumococcalVaccine.site}
                                      onChange={(newValue) => handleHealthMaintenanceChange("pneumococcalVaccine", "site", newValue)}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <Influenza_Vaccine_Route 
                                    value={healthMaintenance.pneumococcalVaccine.route}
                                    onChange={(newValue) => handleHealthMaintenanceChange("pneumococcalVaccine", "route", newValue)}
                                 />
                                </Grid>
                                <Grid item xs={4}>
                                  <Mfr value={healthMaintenance.pneumococcalVaccine.mfr}
                                    onChange={(newValue) => handleHealthMaintenanceChange("pneumococcalVaccine", "mfr", newValue)}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Lot"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("pneumococcalVaccine", "lot", e.target.value)
                                    }
                                    value={healthMaintenance.pneumococcalVaccine.lot}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Expiry"
                                      value={healthMaintenance.pneumococcalVaccine.expiry ? dayjs(healthMaintenance.pneumococcalVaccine.expiry) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("pneumococcalVaccine", "expiry", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Expiry" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("pneumococcalVaccine", "note", e.target.value)
                                    }
                                    value={healthMaintenance.pneumococcalVaccine.note}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="colorectal-screening" style={styles.container}>
                              <label>Colorectal Screening</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Date"
                                      value={healthMaintenance.colorectalScreening.date ? dayjs(healthMaintenance.colorectalScreening.date) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("colorectalScreening", "date", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Date" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts value={healthMaintenance.colorectalScreening.sts}
                                    onChange={(newValue) => handleHealthMaintenanceChange("colorectalScreening", "sts", newValue)}/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Next"
                                      value={healthMaintenance.colorectalScreening.next ? dayjs(healthMaintenance.colorectalScreening.next) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("colorectalScreening", "next", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Next" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("colorectalScreening", "note", e.target.value)
                                    }
                                    value={healthMaintenance.colorectalScreening.note}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="prostate-screening" style={styles.container}>
                              <label>Prostate Screening</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Date"
                                      value={healthMaintenance.prostateScreening.date ? dayjs(healthMaintenance.prostateScreening.date) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("prostateScreening", "date", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Date" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts value={healthMaintenance.prostateScreening.sts}
                                    onChange={(newValue) => handleHealthMaintenanceChange("prostateScreening", "sts", newValue)}/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Next"
                                      value={healthMaintenance.prostateScreening.next ? dayjs(healthMaintenance.prostateScreening.next) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("prostateScreening", "next", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Next" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("prostateScreening", "note", e.target.value)
                                    }
                                    value={healthMaintenance.prostateScreening.note}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="screening-mammogram" style={styles.container}>
                              <label>Screening Mammogram</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Date"
                                      value={healthMaintenance.screeningMammogram.date ? dayjs(healthMaintenance.screeningMammogram.date) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("screeningMammogram", "date", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Date" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts value={healthMaintenance.screeningMammogram.sts}
                                    onChange={(newValue) => handleHealthMaintenanceChange("screeningMammogram", "sts", newValue)}/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Next"
                                      value={healthMaintenance.screeningMammogram.next ? dayjs(healthMaintenance.screeningMammogram.next) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("screeningMammogram", "next", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Next" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("screeningMammogram", "note", e.target.value)
                                    }
                                    value={healthMaintenance.screeningMammogram.note}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                            <div className="screening-pap-smear" style={styles.container}>
                              <label>Screening Pap Smear</label>
                              <Grid container rowSpacing={1} columnSpacing={1}>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Date"
                                      value={healthMaintenance.screeningPapSmear.date ? dayjs(healthMaintenance.screeningPapSmear.date) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("screeningPapSmear", "date", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Date" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={4}>
                                  <Sts value={healthMaintenance.screeningPapSmear.sts}
                                    onChange={(newValue) => handleHealthMaintenanceChange("screeningPapSmear", "sts", newValue)}/>
                                </Grid>
                                <Grid item xs={4}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Next"
                                      value={healthMaintenance.screeningPapSmear.next ? dayjs(healthMaintenance.screeningPapSmear.next) : null}
                                      onChange={(newValue) =>
                                        handleHealthMaintenanceChange("screeningPapSmear", "next", newValue ? newValue.format('YYYY-MM-DD') : '',)
                                      }
                                      slotProps={{ textField: { variant: "standard", fullWidth: true, name:"Next" } }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Note"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) =>
                                      handleHealthMaintenanceChange("screeningPapSmear", "note", e.target.value)
                                    }
                                    value={healthMaintenance.screeningPapSmear.note}
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
                              placeholder="Please write the past surgical history" 
                              value={pastSurgicalHistory}
                              onChange={handlePastSurgicalHistoryChange}
                              />
                          </div>
                          <div className="family-history" style={styles.container}>
                            <h2>Family History</h2>
                            <Grid container rowSpacing={1}>
                              {Object.keys(familyHistory).map((key) => (
                                <Grid item xs={12} key={key}>
                                  <History
                                    label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the label
                                    names={name1} // You can customize the names array as needed
                                    checked={familyHistory[key as keyof FamilyHistory].check}
                                    textFieldValue={familyHistory[key as keyof FamilyHistory].textfield}
                                    onCheckChange={(checked) =>
                                      handleFamilyHistoryChange(key as keyof FamilyHistory, "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleFamilyHistoryChange(key as keyof FamilyHistory, "textfield", value)
                                    }
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </div>  
                          <div className="social-history" style={styles.container}>
                            <h2>Social History</h2>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={12}>
                                <History label="Alcohol Use" names={name3} checked={socialHistory.alcoholUse.check}
                                    textFieldValue={socialHistory.alcoholUse.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("alcoholUse", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("alcoholUse", "textfield", value)
                                    }
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Caffeine Use" names={name3} checked={socialHistory.caffeineUse.check}
                                    textFieldValue={socialHistory.caffeineUse.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("caffeineUse", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("caffeineUse", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Tobacco Use" names={name3} checked={socialHistory.tobaccoUse.check}
                                    textFieldValue={socialHistory.tobaccoUse.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("tobaccoUse", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("tobaccoUse", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Drugs Use" names={name4}  checked={socialHistory.drugsUse.check}
                                    textFieldValue={socialHistory.drugsUse.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("drugsUse", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("drugsUse", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Chm Exposure" names={name5} checked={socialHistory.chmExposure.check}
                                    textFieldValue={socialHistory.chmExposure.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("chmExposure", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("chmExposure", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="TB Exposure" names={name6} checked={socialHistory.tbExposure.check}
                                    textFieldValue={socialHistory.tbExposure.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("tbExposure", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("tbExposure", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="HIV Exposure" names={name7} checked={socialHistory.hivExposure.check}
                                    textFieldValue={socialHistory.hivExposure.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("hivExposure", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("hivExposure", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Sex Relations" names={name8} checked={socialHistory.sexRelations.check}
                                    textFieldValue={socialHistory.sexRelations.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("sexRelations", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("sexRelations", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Exercise" names={name9} checked={socialHistory.exercise.check}
                                    textFieldValue={socialHistory.exercise.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("exercise", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("exercise", "textfield", value)
                                    }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <History label="Sleep Habits" names={name10} checked={socialHistory.sleepHabits.check}
                                    textFieldValue={socialHistory.sleepHabits.textfield}
                                    onCheckChange={(checked) =>
                                      handleSocialHistoryChange("sleepHabits", "check", checked)
                                    }
                                    onTextFieldChange={(value) =>
                                      handleSocialHistoryChange("sleepHabits", "textfield", value)
                                    }
                                />
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
                                      value={masterProblemList.code}
                                      onChange={handleMasterProblemListChange}
                                      name="code"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Onset"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                      value={masterProblemList.onset}
                                      onChange={handleMasterProblemListChange}
                                      name="onset"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">Nature</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={masterProblemList.nature}
                                      onChange={handleMasterProblemListChange}
                                      label="Nature"
                                      name="nature"
                                    >
                                      <MenuItem value="Minor">Minor</MenuItem>
                                      <MenuItem value="Self Limited">Self Limited</MenuItem>
                                      <MenuItem value="Time Limited">Time Limited</MenuItem>
                                      <MenuItem value="Acute">Acute</MenuItem>
                                      <MenuItem value="Chronic">Chronic</MenuItem>
                                      <MenuItem value="Intermittent">Intermittent</MenuItem>
                                      <MenuItem value="Recurrent">Recurrent</MenuItem>
                                      <MenuItem value="Condition">Condition</MenuItem>
                                      <MenuItem value="Symptom">Symptom</MenuItem>
                                      <MenuItem value="Finding">Finding</MenuItem>
                                      <MenuItem value="Limitation">Limitation</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Desc"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                      onChange={handleMasterProblemListChange}
                                      value={masterProblemList.desc}
                                      name="desc"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={masterProblemList.status}
                                      onChange={handleMasterProblemListChange}
                                      label="Status"
                                      name="status"
                                    >
                                      <MenuItem value="Improving">Improving</MenuItem>
                                      <MenuItem value="Stable">Stable</MenuItem>
                                      <MenuItem value="Controlled">Controlled</MenuItem>
                                      <MenuItem value="Worsening">Worsening</MenuItem>
                                      <MenuItem value="Uncontrolled">Uncontrolled</MenuItem>
                                      <MenuItem value="Resolved">Resolved</MenuItem>
                                      <MenuItem value="Ruled Out">Ruled Out</MenuItem>
                                      <MenuItem value="Active">Active</MenuItem>
                                      <MenuItem value="Inactive">Inactive</MenuItem>
                                    </Select>
                                  </FormControl>
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
                                      onChange={handleMasterMedicationListChange}
                                      value={masterMedicationList.rx}
                                      name="rx"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                  <FormControl variant="standard" fullWidth>
          
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={masterMedicationList.select}
                                      onChange={handleMasterMedicationListChange}
                                      label="Unit"
                                      name="select"
                                    >
                                      <MenuItem value="GEQ">GEQ</MenuItem>
                                      <MenuItem value="DAW">DAW</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                  <TextField
                                      id="outlined-multiline-static"
                                      label="Sig"
                                      multiline
                                      variant="standard"
                                      fullWidth
                                      onChange={handleMasterMedicationListChange}
                                      value={masterMedicationList.sig}
                                      name="sig"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={masterMedicationList.status}
                                      onChange={handleMasterMedicationListChange}
                                      label="Status"
                                      name="status"
                                    >
                                      <MenuItem value="Active">Active</MenuItem>
                                      <MenuItem value="Inactive">Inactive</MenuItem>
                                      <MenuItem value="Completed">Completed</MenuItem>
                                      <MenuItem value="Discontinued">Discontinued</MenuItem>
                                      <MenuItem value="Erroneous">Erroneous</MenuItem>
                                      <MenuItem value="Not Covered">Not Covered</MenuItem>
                                    </Select>
                                  </FormControl>
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
                            to={`/patient-info/${id}`}
                            color="inherit"
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button type="submit" variant="contained" onClick={handleSubmit}>
                            Save
                          </Button>                          
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button 
                           component={Link}
                           to={`/patient-info-encounter/${id}`}
                           color="warning"
                           variant="contained"
                           >
                            Encounter
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

export default PatientHistoryInfo;
