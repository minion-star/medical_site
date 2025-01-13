import React, { useState } from 'react';
import Appbar from '../../components/Appbar';
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

const SearchPage: React.FC = () => {
  const [searchBy, setSearchBy] = useState<string>('Chart ID');
  const [searchCondition, setSearchCondition] = useState<string>('starts with');
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState(searchData);

  const handleSearch = () => {
    const filtered = searchData.filter((doctor) => {
      const value = getSearchFieldValue(doctor);
      if (!value) return false;

      switch (searchCondition) {
        case 'starts with':
          return value.toLowerCase().startsWith(searchText.toLowerCase());
        case 'contains':
          return value.toLowerCase().includes(searchText.toLowerCase());
        case 'equals':
          return value.toLowerCase() === searchText.toLowerCase();
        default:
          return false;
      }
    });

    setFilteredData(filtered);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getSearchFieldValue = (doctor: any): string | undefined => {
    switch (searchBy) {
      case 'Chart ID':
        return doctor.chartId;
      case 'MRN':
        return doctor.mrn;
      case 'Phone':
        return doctor.phone;
      case 'Last Name':
        return doctor.lastName;
      case 'First Name':
        return doctor.firstName;
      case 'Birth Date':
        return doctor.dob;
      case 'Visit Date':
        return doctor.visitDate;
      case 'Age/Gender':
        return `${doctor.age} ${doctor.gender}`;
      case 'Other':
        return doctor.other;
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
                            <FormControlLabel value="MRN" control={<Radio />} label="MRN" />
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
                            <FormControlLabel value="Visit Date" control={<Radio />} label="Visit Date" />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel value="Age/Gender" control={<Radio />} label="Age/Gender" />
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
                        <TableCell>MRN</TableCell>
                        <TableCell>LAST NAME</TableCell>
                        <TableCell>FIRST NAME</TableCell>
                        <TableCell>MI</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>AGE</TableCell>
                        <TableCell>PHONE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((doctor: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{doctor.chartId}</TableCell>
                            <TableCell>{doctor.mrn}</TableCell>
                            <TableCell>{doctor.lastName}</TableCell>
                            <TableCell>{doctor.firstName}</TableCell>
                            <TableCell>{doctor.mi}</TableCell>
                            <TableCell>{doctor.dob}</TableCell>
                            <TableCell>{doctor.age}</TableCell>
                            <TableCell>{doctor.phone}</TableCell>
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
