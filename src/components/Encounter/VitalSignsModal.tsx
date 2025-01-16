import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Grid,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { vitalSignsData } from "../../mockData";



// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const modalStyles: React.CSSProperties = {
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
};

const barStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "green",
  color: "white",
  padding: "8px 8px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
};

const paperStyles: React.CSSProperties = {
  backgroundColor: "lightgray",
  padding: "16px",
  margin: "16px",
  borderRadius: "8px",
  width: "568px",
  height: "400px",
  overflow: "auto"
};

interface TabPanelProps {
  value: number;
  index: number;
  children: React.ReactNode;
}




const getSystolicLineColor = (value: number) => {
    if (value >= 120 && value < 140) return 'yellow';
    if (value >= 140 && value < 160) return 'orange';
    if (value >= 160) return 'red';
    return 'green'; // Normal range
};

const getDiastolicLineColor = (value: number) => {
    if (value >= 80 && value < 90) return 'yellow';
    if (value >= 90 && value < 100) return 'orange';
    if (value >= 100) return 'red';
    return 'green'; // Normal range
  };


function Past_5_Vital_Signs () {



    return (
        <TableContainer>
            <Table sx={{ minWidth: 350}} aria-label="Vital-Signs">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Systolic</TableCell>
                        <TableCell>Diastolic</TableCell>
                        <TableCell>Pulse</TableCell>
                        <TableCell>Resp.</TableCell>
                        <TableCell>Temp.</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Height</TableCell>
                        <TableCell>SpO2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                      {vitalSignsData.length > 0 ? (
                        vitalSignsData.map((doctor: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{doctor.date}</TableCell>
                            <TableCell>{doctor.systolic}</TableCell>
                            <TableCell>{doctor.diastolic}</TableCell>
                            <TableCell>{doctor.pulse}</TableCell>
                            <TableCell>{doctor.respiration}</TableCell>
                            <TableCell>{doctor.temperature}</TableCell>
                            <TableCell>{doctor.weight}</TableCell>
                            <TableCell>{doctor.height}</TableCell>
                            <TableCell>{doctor.spO2}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            No results found.
                          </TableCell>
                        </TableRow>
                      )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}



const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
  return value === index ? <Box>{children}</Box> : null;
};


const VitalSignsModal: React.FC = () => {




    // Generate height for each weight based on BMI
    const generateHeightData = (bmi: number) => {
        const weights = Array.from({ length: 41 }, (_, i) => 75 + i * 5); // 75 to 275 lbs
        const heights = weights.map((weight) =>
        Number((Math.sqrt(weight*703) / Math.sqrt(bmi)).toFixed(2)) // Height formula
        );
        return { weights, heights };
    };

        // Generate data for BMI = 18.5, 25, 30
    const bmi18_5 = generateHeightData(18.5);
    const bmi25 = generateHeightData(25);
    const bmi30 = generateHeightData(30);

    const chartData: ChartData<"line"> = {
        labels: bmi18_5.weights.map((weight) => `${weight}`),
        datasets: [
        {
            label: "BMI 18.5",
            data: bmi18_5.heights,
            borderColor: "green",
            backgroundColor: "green",
            fill: false,
        },
        {
            label: "BMI 25",
            data: bmi25.heights,
            borderColor: "yellow",
            backgroundColor: "yellow",
            fill: false,
        },
        {
            label: "BMI 30",
            data: bmi30.heights,
            borderColor: "red",
            backgroundColor: "red",
            fill: false,
        },
        {
            label: "BMI Data",
            data: vitalSignsData.map((entry) => ({ x: entry.weight, y: entry.height })), // Scatter points
            borderColor: "blue", // Color for the dots
            backgroundColor: "blue",
            pointRadius: 5, // Size of the dots
            showLine: false, // No connecting lines for scatter data
        },
        ],
    };

    const chartOptions: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "BMI Chart (Weight vs Height) with Mockup Data",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Weight (lbs)",
                },
                type: "linear", // Ensure proper scatter representation for weight
                min: 75,
                max: 275,
            },
            y: {
                min: 58,
                max: 78,
                title: {
                    display: true,
                    text: "Height (in)",
                },
            },
        },
    };


    const handlePrint1 = () => {
        const printContent = document.getElementById("print-content-1");
        if (printContent) {
            const printWindow = window.open("", "_blank");
            if (printWindow) {
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>Print</title>
                      <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        canvas { max-width: 100%; height: 100%; }
                      </style>
                      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                    </head>
                    <body>
                      <div id="chart-container">
                        <canvas id="chart-canvas"></canvas>
                      </div>
                      <script>
                        window.onload = function() {
                            const ctx = document.getElementById('chart-canvas').getContext('2d');
                            new Chart(ctx, ${JSON.stringify({
                                type: "line",
                                data: chartData, // Ensure chartData is accessible here
                                options: chartOptions, // Ensure chartOptions is accessible here
                            })});
                            
                            // Wait for the chart to render, then open the print dialog
                            setTimeout(() => {
                                window.print();
                            }, 100); // Adjust delay if needed
                        };
                      </script>
                    </body>
                  </html>
                `);
                printWindow.document.close();
            }
        }
    };
    
    // Systolic and Diastolic diagram

    const systolicData = {
        labels: vitalSignsData.map((entry) => entry.date),
        datasets: [
          {
            label: 'Systolic Blood Pressure',
            data: vitalSignsData.map((entry) => entry.systolic),
            borderColor: vitalSignsData.map((entry) => getSystolicLineColor(entry.systolic)),
            borderWidth: 2,
            pointBackgroundColor: vitalSignsData.map((entry) => getSystolicLineColor(entry.systolic)),
            tension: 0.4, // Smoothing effect
          },
        ],
      };

      const diastolicData = {
        labels: vitalSignsData.map((entry) => entry.date),
        datasets: [
          {
            label: 'Diastolic Blood Pressure',
            data: vitalSignsData.map((entry) => entry.diastolic),
            borderColor: vitalSignsData.map((entry) => getDiastolicLineColor(entry.diastolic)),
            borderWidth: 2,
            pointBackgroundColor: vitalSignsData.map((entry) => getDiastolicLineColor(entry.diastolic)),
            tension: 0.4, // Smoothing effect
          },
        ],
      };

      const commonOptions = {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Blood Pressure (mmHg)',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      };

      const handlePrint2 = () => {
        const printContent = document.getElementById("print-content-2");
        if (printContent) {
          const printWindow = window.open("", "_blank");
          if (printWindow) {
            printWindow.document.write(`
              <html>
                <head>
                  <title>Print</title>
                  <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    canvas { max-width: 100%; height: 100%; margin-bottom: 20px; background-color: grey;}
                  </style>
                  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                </head>
                <body>
                  <h3>Systolic Blood Pressure Chart</h3>
                  <div id="systolic-chart-container">
                    <canvas id="systolic-chart-canvas"></canvas>
                  </div>
      
                  <h3>Diastolic Blood Pressure Chart</h3>
                  <div id="diastolic-chart-container">
                    <canvas id="diastolic-chart-canvas"></canvas>
                  </div>
      
                  <script>
                    window.onload = function() {
                      // Create the Systolic Chart
                      const systolicCtx = document.getElementById('systolic-chart-canvas').getContext('2d');
                      new Chart(systolicCtx, {
                        type: "line",
                        data: ${JSON.stringify(systolicData)},
                        options: ${JSON.stringify(commonOptions)},
                      });
      
                      // Create the Diastolic Chart
                      const diastolicCtx = document.getElementById('diastolic-chart-canvas').getContext('2d');
                      new Chart(diastolicCtx, {
                        type: "line",
                        data: ${JSON.stringify(diastolicData)},
                        options: ${JSON.stringify(commonOptions)},
                      });
      
                      // Wait for the charts to render before printing
                      setTimeout(() => {
                        window.print();
                      }, 1500); // Adjust delay if needed to ensure both charts are rendered
                    };
                  </script>
                </body>
              </html>
            `);
            printWindow.document.close();
          }
        }
      };
      
      

    const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);

  return (
    <div>
      <IconButton onClick={handleOpen} color="success">
        <BarChartIcon />
      </IconButton>
      <Modal open={open} onClose={() => {}}>
        <Box sx={modalStyles}>
            <Box sx={barStyles}>
                <Typography variant="h6">Vital Signs</Typography>
                <Box>
                    <IconButton aria-label="print" color="inherit" onClick={activeTab !== 1 ? handlePrint1 : handlePrint2} disabled={activeTab === 2}>
                        <PrintIcon />
                    </IconButton>
                    <IconButton aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="primary"
                variant="fullWidth"
            >
                <Tab label="Body Mass Index" />
                <Tab label="Blood Pressure Trend" />
                <Tab label="Past 5 Vital Signs" />
            </Tabs>

            <Paper sx={paperStyles} >
                <TabPanel value={activeTab} index={0}>
                    <Line  id="print-content-1" data={chartData} options={chartOptions} />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <Box id = "print-content-2">
                        <Typography variant="h4" gutterBottom>
                            Systolic Blood Pressure Chart
                        </Typography>
                            <Line data={systolicData} options={{ ...commonOptions, scales: { ...commonOptions.scales, y: { min: 40, max: 220, ticks: { stepSize: 20 } } } }} />
                        <Typography variant="h4" gutterBottom>
                            Diastolic Blood Pressure Chart
                        </Typography>            
                            <Line data={diastolicData} options={{ ...commonOptions, scales: { ...commonOptions.scales, y: { min: 20, max: 140, ticks: { stepSize: 20 } } } }} />
           
                     </Box>
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <Past_5_Vital_Signs/>
                </TabPanel>
            </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default VitalSignsModal;
