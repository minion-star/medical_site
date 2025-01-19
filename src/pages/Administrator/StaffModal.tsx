import React, { useState } from 'react';
import {
  ListItemIcon,
  Rating,
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
  FormLabel,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from "@mui/icons-material/Close";

interface StaffMember {
  name: string;
  photo: string | ArrayBuffer | null;
  rating: number;
}

const StaffModal: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which member is being edited
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [rating, setRating] = useState<number | null>(0);
  const [staffMember, setStaffMember] = useState<StaffMember[]>([]);

  const handleAddClick = () => {
    setIsEditing(false);
    setOpenModal(true);
    setName('');
    setPhoto(null);
    setRating(0);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = () => {
    if (!name || !photo || rating === null) return; // Validate fields
    const newMember = { name, photo, rating };

    if (isEditing && editingIndex !== null) {
      setStaffMember((prevStaffMember) =>
        prevStaffMember.map((member, index) =>
          index === editingIndex ? newMember : member
        )
      );
    } else {
      setStaffMember((prevStaffMember) => [...prevStaffMember, newMember]);
    }

    setOpenModal(false);
    setName('');
    setPhoto(null);
    setRating(0);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    const member = sortedStaffMember[index]; // Get the member from sorted array
    const originalIndex = staffMember.findIndex((staff) => staff === member); // Find original index
    setName(member.name);
    setPhoto(member.photo);
    setRating(member.rating);
    setEditingIndex(originalIndex); // Use the original index for updates
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleRemove = (index: number) => {
    setStaffMember((prevStaffMember) => prevStaffMember.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sortedStaffMember = [...staffMember].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      {/* Displaying added StaffMember in boxes */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {sortedStaffMember.map((staff, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Box
              onClick={() => handleEdit(index)} // Pass sorted index
              sx={{
                border: '3px solid green',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                height: '240px',
              }}
            >
              <img
                src={staff.photo as string}
                alt={staff.name}
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
              <Typography variant="body1" textAlign="center">{staff.name}</Typography>
              <Rating value={staff.rating} readOnly />
            </Box>
          </Grid>
        ))}
        {/* Box with "+" button */}
        <Grid item xs={4} sm={4} md={4}>
          <Box
            onClick={handleAddClick}
            sx={{
              border: '3px solid green',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '240px',
              cursor: 'pointer',
              
            }}
          >
            <IconButton color="primary">
              <AddIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Modal for entering/editing name, photo, and rating */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          component="main"
          sx={{
          backgroundColor: (theme) =>
          theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
          flexGrow: 1,
          width:"400px",
          borderRadius: "8px",
          padding: "0px",
          position: "absolute",
          top: "50%",
          left: "50%",
          boxShadow: "24px",
          transform: "translate(-50%, -50%)",
          } }
                >
          <Box sx={styles.bar}>
            <Typography variant="h6">Edit Clinic</Typography>
            <Box>
              <IconButton aria-label="close" color="inherit" onClick={handleCloseModal}>
                  <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Container sx={{ mt: 4, mb: 4,height:"400px",overflow: "auto",}}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column"}} >
              <Typography variant="h6" textAlign={"center"}>{isEditing ? 'Edit Staff Member' : 'Add Staff Member'}</Typography>
              <TextField
              label="Name"
              fullWidth
              variant='standard'
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 2 }}
              />

              {/* Photo upload input */}
              <Button variant="outlined" component="label" fullWidth sx={{ marginBottom: 2 }}>
                Upload Photo
                <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
              </Button>

              {photo && <img src={photo as string} alt="Uploaded" style={{ width: '100%', height: 'auto', marginBottom: 10 }} />}

              {/* Rating input */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                <Rating value={rating || 0} onChange={(_, newValue) => setRating(newValue)} precision={1} />
              </Box>
              {/* Password input */}
              <div style={styles.container}>
                <h2>Password</h2>
                <Grid container spacing={1}>
                   <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox />
                        }
                        label="Change Password"
                      />
                   </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        id="staff-member-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              PassWord:
                            </InputAdornment>
                          ),
                        }}
                        type='password'
                        variant="standard"
                      />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        id="staff-member-reconfirm"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              Reconfirm:
                            </InputAdornment>
                          ),
                        }}
                        type='password'
                        variant="standard"
                      />
                  </Grid>
                </Grid>
              </div>
              {/* Save button */}
              <Button onClick={handleSave} variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Save
              </Button>

              {/* Remove button */}
              {isEditing && (
              <Button
              onClick={() => {
                if (editingIndex !== null) handleRemove(editingIndex);
                handleCloseModal(); // Close modal after removal
              }}
              variant="outlined"
              color="error"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={staffMember.length <= 1} // Disable button when there's 1 or fewer members
              >
                  Remove
              </Button>
              )}
            </Paper>
          </Container>
        </Box>
        
      </Modal>

    </div>
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
  bar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "green",
      color: "white",
      padding: "8px 8px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
  },
  modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      boxShadow: "24px",
      width: "600px",
      height: "600px",
      borderRadius: "8px",
      padding: "0px",
  },
 
};


export default StaffModal;
