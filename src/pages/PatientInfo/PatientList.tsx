import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  TablePagination,
  Toolbar,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Appbar from "../../components/Appbar";
import { PatientListContext } from "../../contexts/PatientListContext";
import AddPatientDialog from "./AddPatientDialog";
import { useNavigate } from "react-router-dom";



const PatientList: React.FC = () => {
  // Access patient data from the context
  const patientList = useContext(PatientListContext);
  const Navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!patientList) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to the first page when changing rows per page
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, patientList.length - page * rowsPerPage);

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
          overflow: "auto",
        }}
      >
        <Toolbar />

        <Container sx={{ mt: 4, mb: 4 }}>
          <AddPatientDialog/>
          <Grid container spacing={2} sx={{ marginLeft: "10px", marginTop: "40px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="patient table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">CSN</TableCell>
                    <TableCell>FULL NAME</TableCell>
                    <TableCell>AGE</TableCell>
                    <TableCell>GENDER</TableCell>
                    <TableCell>CREATED DATE</TableCell>
                    <TableCell>CREATED BY</TableCell>
                    <TableCell>LAST SAVED DATE</TableCell>
                    <TableCell>LAST SAVED BY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? patientList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : patientList
                  ).map((patient, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => Navigate(`/patient-info/${patient.CSN}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell align="center">{patient.CSN}</TableCell>
                      <TableCell>
                        {patient.FIRST_NAME} {patient.LAST_NAME}
                      </TableCell>
                      <TableCell>{patient.AGE}</TableCell>
                      <TableCell>{patient.INFORMATION.personalInformation.gender}</TableCell>
                      <TableCell>{patient.CREATED_DATE}</TableCell>
                      <TableCell>{patient.CREATED_BY}</TableCell>
                      <TableCell>{patient.LAST_SAVED_DATE}</TableCell>
                      <TableCell>{patient.LAST_SAVED_BY}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={patientList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default PatientList;
