import React, { useState, useRef } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Container,
  Paper,
  Grid,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";

const PrintDialog = (props:{open:boolean; handleClose:any;}) => {
  const [requisition, setRequisition] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState("");
  const printRef = useRef<HTMLDivElement>(null);


  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.outerHTML;
  
      // Create an iframe
      const printWindow = document.createElement("iframe");
      printWindow.style.position = "absolute";
      printWindow.style.top = "-10000px"; // Hide the iframe offscreen
      document.body.appendChild(printWindow);
  
      const doc = printWindow.contentDocument || printWindow.contentWindow?.document;
  
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                /* Add any styles you want to apply to the printed content */
                body { font-family: Arial, sans-serif; margin: 20px; }
                h2, h4 { margin: 0; }
                .print-container { padding: 16px; border: 1px solid #ccc; }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        doc.close();
      }
  
      // Wait for the iframe to load the content
      printWindow.onload = () => {
        printWindow.contentWindow?.focus();
        printWindow.contentWindow?.print();
  
        // Cleanup: Remove the iframe after printing
        setTimeout(() => {
          document.body.removeChild(printWindow);
        }, 1000);
      };
    }
  };
  
  return (

      <Modal open={props.open} onClose={props.handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: 24,
            width: "800px",
            height: "600px",
            borderRadius: "8px",
            padding: "0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "green",
              color: "white",
              padding: "8px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <Typography variant="h6">Print / Fax Encounter Related Document</Typography>
            <Box>
              <IconButton aria-label="close" color="inherit" onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
              <IconButton aria-label="close" color="inherit" onClick={props.handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            ref={printRef}
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              overflow: "auto",
              padding: "8px",
            }}
          >
            <Container sx={{ mt: 4, mb: 4 }} className="print-container">
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column", textAlign: "center" }}>
                <Grid>
                  <h2>Clinique Sante Pour Tous</h2>
                  <h4>1000, Fairwaywoods Dr. Chester ST 223344</h4>
                  <h4>Tel: (804)123-4567 Fax: (804)123-4569</h4>
                </Grid>
                <Grid container sx={{ gap: 1, display: "flex" }}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 4 }}>
                      <label>REQUISITION__________________________________________________________________</label>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="general-order"
                      variant="standard"
                      fullWidth
                      multiline
                      value={requisition}
                      onChange={(e) => setRequisition(e.target.value)}
                    />
                  </Grid>
                  <Grid item container xs={12} spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        id="tel"
                        label="Tel"
                        multiline
                        variant="standard"
                        fullWidth
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="fax"
                        label="Fax"
                        multiline
                        variant="standard"
                        fullWidth
                        value={fax}
                        onChange={(e) => setFax(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Box>
        </Box>
      </Modal>
  );
};

export default PrintDialog;
