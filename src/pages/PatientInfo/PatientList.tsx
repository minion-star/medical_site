import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchInput from "../../components/SearchInput";
import { useForm } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";


export default function AddPatientDialog({

  handleChange
}: any) {

  
  const handleAddPatient = async()=>{
    try {
      // Sending a request to add a blank row to the database
      const response = await axios.post("http://localhost:5000/api/addBlankPatient");

      if (response.status === 200) {
        handleChange(); // Call this function to update the state or refresh the table
      }
    } catch (error) {
      console.error("There was an error adding the blank patient:", error);
    }
  }

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <SearchInput handleChange={handleChange} />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddPatient}
        >
          Add Patient
        </Button>
      </Stack>
    </div>
  );
}
