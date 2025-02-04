import * as React from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchInput from "../../components/SearchInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPatientDialog({

  handleChange
}: any) {

  const [csn, setCsn] = React.useState<string>("");
  const Navigate = useNavigate();
  const handleAddPatient = async()=>{
    try {
      // Sending a request to add a blank row to the database
      const response = await axios.post("http://localhost:5000/api/addBlankPatient");
      setCsn(response.data);
      if (response.status === 200) {
        handleChange(); // Call this function to update the state or refresh the table
      }
    } catch (error) {
      console.error("There was an error adding the blank patient:", error);
    }
  }
  React.useEffect(()=>{
    if(csn) {
      Navigate(`/patient-info/${csn}`)
    }
    
  },[csn, Navigate])

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
