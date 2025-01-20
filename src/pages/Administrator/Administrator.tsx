import { useState, useEffect } from "react";
import {
    ListItemIcon,
    ListItemButton,
    Collapse,
    Chip,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
    Box,
    ListItemText,
    Divider,
    SelectChangeEvent,  
    Paper,
    IconButton,
    FormControlLabel,
    FormControl,
    Checkbox,
    Avatar,
    Input,
    InputAdornment,
    OutlinedInput,
    Toolbar,
    Container,
    Badge,
    Modal,
    Radio,
    RadioGroup,
    FormLabel
  } from "@mui/material";
import Appbar from "../../components/Appbar";
import { GridOff } from "@mui/icons-material";
import { Form } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import ClinicModal from "./ClinicModal";
import StaffModal from "./StaffModal";




const ID:string[] = ['NPI', 'EIN', 'PIN', 'PVN', 'SSN', 'TIN', 'DEA', 'DPS', 'NSC', 'UPIN', 'OSCAR', 'BCID', 'BSID', 'NCPDP', 'NPI;NCPDP', 'Champus', 'Medicare', 'Medicaid', 'License', 'Group', 'Other', '&nbsp', 'OB', '1A', '1B', '1C', '1D', '1G', '1H',  'EI', '1J', 'B3', 'BQ', 'FH', 'G2', 'G5', 'LU', 'N5', 'SY', 'U3', 'X5', 'ZZ']
const generateTimeIntervals = (startTime: string, endTime: string, interval: number) => {
    const times: string[] = [];
    const formatTime = (hours: number, minutes: number): string => {
      const period = hours >= 12 ? "PM" : "AM";
      const adjustedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${adjustedHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
    };
  
    let [startHours, startMinutes] = startTime
      .split(":")
      .map((time) => parseInt(time));
    const [endHours, endMinutes] = endTime
      .split(":")
      .map((time) => parseInt(time));
    let currentMinutes = startMinutes;
  
    while (
      startHours < endHours ||
      (startHours === endHours && currentMinutes <= endMinutes)
    ) {
      times.push(formatTime(startHours, currentMinutes));
      currentMinutes += interval;
  
      if (currentMinutes >= 60) {
        currentMinutes -= 60;
        startHours++;
      }
    }
  
    return times;
  };
  
  const ALL_TIMES = generateTimeIntervals("07:00", "23:00", 5);




  
const Administrator = () => {

    interface Clinic {
        clinicName: string,
        subTitle: string,
        address1: string,
        address2: string,
        city: string,
        postCode: string,
        country: string,
        state: string,
        telephoneNumber1: string,
        telephoneNumber2: string,
        fax: string,
        email: string,
        id1: string,
        id2: string,
        type1: string,
        type2: string,
        specialization: string,
        slotDuration: number,
        bookingStartTime: string,
        bookingEndTime: string,
    }

    const [clinicData, setClinicData] = useState<Clinic>({
        clinicName: '',
        subTitle: '',
        address1: '',
        address2: '',
        city: '',
        postCode: '',
        country: '',
        state: '',
        telephoneNumber1: '',
        telephoneNumber2: '',
        fax: '',
        email: '',
        id1: '',
        id2: '',
        type1: '',
        type2: '',
        specialization: '',
        slotDuration: 5,
        bookingStartTime: '',
        bookingEndTime: '',
      });

    const updateClinic = (updatedClinic:Clinic):void => {
        setClinicData(updatedClinic); // Update the parent state
    };

    return (

        <Box sx={{display:"flex"}}>
            <Appbar appBarTitle="Clinic/Staff" />
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
                <Toolbar/>
                <Container sx={{ mt: 4, mb: 4 }}>    
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column"}} >                    
                        <Grid
                            container
                            spacing={2}
                            sx={{ marginleft: "10px", padding: "20px" }}

                        >
                            
                            <Grid item xs={12} sm={6} md={6}>
                                <div className="clinic" style={styles.container}>
                                    <h2>Clinic</h2>
                                    <div className="clinc-name" style={styles.container}>
                                        <label>Clinic Name:</label>
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="clinic-name"
                                                fullWidth
                                                multiline 
                                                variant="standard"
                                                value={clinicData.clinicName}
                                                 />
                                        </Grid>   
                                    </div>
                                    <div className="Other Information" style={styles.container}>
                                        <label>Other Information</label>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="other-information-subtitle"
                                                    label="Subtitle"
                                                    fullWidth
                                                    multiline
                                                    variant="standard"
        
                                                    value={clinicData.subTitle}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="other-information-address-1"
                                                    label="Address(line1)"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.address1}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="other-information-address-2"
                                                    label="Address(line2)"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.address2}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-information-city"
                                                    label="City"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.city}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-information-post-code"
                                                    label="Post Code"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.postCode}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-information-country"
                                                    label="Country"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.country}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-information-state"
                                                    label="State"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.state}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-information-telephone-1"
                                                    label="Telephone-1"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.telephoneNumber1}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-inofrmation-telephone-2"
                                                    label="Telephone-2"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.telephoneNumber2}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-information-fax"
                                                    label="Fax"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.fax}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="other-information-email"
                                                    label="Email"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12} container columnSpacing={1} alignItems={"end"}>
                                                <Grid item xs={2} sx={{mt:2}}><label>ID #1:</label></Grid>
                                                <Grid item xs={5} sx={{mt:1}}>
                                                    <TextField
                                                        id="other-information-id-1"
                                                        fullWidth
                                                        multiline
                                                        variant="standard"
                                                        value={clinicData.type1}
                                                    />
                                                </Grid>
                                                <Grid item xs={5} sx={{mt:1}}>
                                                     <FormControl variant="standard" fullWidth>
                                                        <Select
                                                            id="other-information-id-1"
                                                            value={clinicData.id1}
                                                        >
                                                            {ID.map((name) => (
                                                            <MenuItem key={name} value={name}>                                        
                                                                <ListItemText primary={name} />
                                                            </MenuItem>
                                                            ))} 
                                                            
                                                        </Select>
                                                     </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={12} columnSpacing={1} alignItems={"end"}>
                                                <Grid item xs={2} sx={{mt:2}}><label>ID #2:</label></Grid>
                                                <Grid item xs={5} sx={{mt:1}}>
                                                    <TextField
                                                        id="other-information-id-2"
                                                        fullWidth
                                                        multiline
                                                        variant="standard"
                                                        value={clinicData.type2}
                                                    />
                                                </Grid>
                                                <Grid item xs={5} sx={{mt:1}}>
                                                     <FormControl variant="standard" fullWidth>
                                                        <Select
                                                            id="other-information-id-2"
                                                            value={clinicData.id2}
                                                        >
                                                            {ID.map((name) => (
                                                            <MenuItem key={name} value={name}>                                        
                                                                <ListItemText primary={name} />
                                                            </MenuItem>
                                                            ))} 
                                                            
                                                        </Select>
                                                     </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="other-information-specialization"
                                                    label="Specialization"
                                                    fullWidth
                                                    variant="standard"
                                                    value={clinicData.specialization}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="appointment-book" style={styles.container}>
                                        <label>Appointment Book</label>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <FormControl variant="standard" fullWidth>
                                                    <FormLabel id="appointment-book-slot-duration">Slot Duration</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="appointment-book-slot-duration"
                                                        name="appointment-book-slot-duration"
                                                        value={clinicData.slotDuration}

                                                    >
                                                        <FormControlLabel value={5} control={<Radio />} label="5 Minutes" />
                                                        <FormControlLabel value={10} control={<Radio />} label="10 Minutes" />
                                                        <FormControlLabel value={15} control={<Radio />} label="15 Minutes" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl variant="standard" fullWidth>
                                                    <InputLabel id="appointment-book-bookings-start-at">Bookings start at</InputLabel>
                                                    <Select
                                                        id="appointment-book-bookings-start-at"
                                                        value={clinicData.bookingStartTime}
                                                        >
                                                            {ALL_TIMES.map((time) => (
                                                                <MenuItem key={time} value={time}>
                                                                    {time}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl variant="standard" fullWidth>
                                                    <InputLabel id="appointment-book-bookings-end-at">Bookings end at</InputLabel>
                                                    <Select
                                                        id="appointment-book-bookings-end-at"
                                                        disabled={!clinicData.bookingStartTime}
                                                        value={clinicData.bookingEndTime}
                                                        >      
                                                            {ALL_TIMES.map((time) => (
                                                                <MenuItem key={time} value={time}>
                                                                    {time}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <Grid item xs={12} sx={{mt:2, display:'flex', justifyContent:'right'}}>
                                        <ClinicModal clinic1={clinicData} updateClinic={updateClinic} />
                                    </Grid>
                                    
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                {/* Add Staff Members */}
                                <div className="staff-members" style={styles.container}>
                                    <h2>Staff Members</h2>
                                    <StaffModal/>
                                </div>
                                {/* References */}
                            </Grid>
                        </Grid>
                    </Paper>     
                     
                </Container>
            </Box>
        </Box>
    );

}

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

export default Administrator;

