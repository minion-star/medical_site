import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import Badge from "@mui/material/Badge";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Avatar,SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Drawer } from "../styles";
import { settings } from "../constant";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { mainListItems, secondaryListItems } from "./listItems";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function Appbar_Patient(props: { appBarTitle: string; id: string|undefined }) {
  const location = useLocation(); // Get current route
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [showSpeedDial, setShowSpeedDial] = useState(true);
  const navigate = useNavigate();
  const [encounters, setEncounters] = useState<string[]>(["1"]);

  

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/get_encounter_id`, {
          CSN: props.id, // Send the ID as an object with key CSN
        });
  
        const idData = response.data;  // Assuming API returns { encounterIDs: [...] }
        if (Array.isArray(idData) && idData.length > 0) {
          setEncounters(idData.map((item: any) => item.encounterID));
        } else {
          setEncounters(['1']);
        }
      } catch (err) {
        console.error("Error fetching patient data:", err);
      }
    };
  
    if (props.id) {
      fetchPatient();  // Ensure we only fetch if props.id exists
    }
  }, [props.id]);


  useEffect(() => {
    if (props.appBarTitle.includes("ENCOUNTER")) {
      setShowSpeedDial(true);
    } else {
      setShowSpeedDial(false);
    }
  }, [props.appBarTitle]);
  // Define tab paths
  const tabs = [
    { label: "GENERAL", path: `/patient-info/${props.id}` },
    { label: "HISTORY", path: `/patient-info-history/${props.id}` },
    ...encounters.map((id) => ({
      label: `ENCOUNTER ${id}`,
      path: `/patient-info-encounter/${props.id}/${id}`
    }))
  ];

  // Determine the currently active tab based on the route
  const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);

  const addEncounter = () => {
    const newId = (encounters.length + 1).toString(); // Generate a unique ID
    setEncounters([...encounters, newId]);
    navigate(`/patient-info-encounter/${props.id}/${newId}`);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <Box sx={{ display: "flex" }}>
      {showSpeedDial&&(<SpeedDial
        
        ariaLabel="encounter-tool"
        icon={<SpeedDialIcon />}
        sx={{ position: "absolute", bottom: 4, right: 4 }}
        FabProps={{ color: "success" }}
      >
        {/* <SpeedDialAction key="Delete" icon={<DeleteIcon />} tooltipTitle="Delete" /> */}
        <SpeedDialAction
          key="Print"
          icon={<PrintIcon />}
          tooltipTitle="Print"
        />
        <SpeedDialAction
          key="Add" icon={<AddIcon />} tooltipTitle="Add"
          onClick={addEncounter}
        />
        {/* <SpeedDialAction key="Lock" icon={<LockIcon />} tooltipTitle="Lock" /> */}
        {/* <SpeedDialAction key="Add" icon={<AddIcon />} tooltipTitle="Add" /> */}
      </SpeedDial>)}
      
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ height: "64px", pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Tabs
              value={currentTab} // Bind the value to the current tab index
              onChange={() => {}} // No need for manual change handler since navigation happens via `Link`
              textColor="inherit"
              indicatorColor="secondary"
              sx={{height:"100%",minHeight: "64px"}}
              variant="scrollable"
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  component={Link}
                  to={tab.path}
                  sx={{height:"100%",minHeight: "64px"}}
                />
              ))}
            </Tabs>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link to={setting.url} style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography textAlign="center">{setting.text}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: [1] }}>
          <Typography variant="h4" align="center">
            {/* alt="logo" */}
            <img src="/hospital.svg" height="40px"  alt="logo"/>
            <span style={{ color: "#005B93" }}>EALTHY</span>
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
    </Box>
  );
}
