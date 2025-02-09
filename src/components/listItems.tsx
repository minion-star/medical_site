import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SickIcon from "@mui/icons-material/Sick";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const primarynavList = [

  {
    link: "/administrator",
    label: "Administrator",
    icon: <AdminPanelSettingsIcon/>,
  },
/*  {
    link: "/doctor-list",
    label: "Doctor List",
    icon: <PeopleIcon />,
  },
*/
  {
    link: "/patient-list",
    label: "Patient List",
    icon: <SickIcon />,
  },


];

const secondaryNavList = [

  {
    link: "/search",
    label: "Search",
    icon: <SearchSharpIcon />,
  },
  {
    link: "/settings",
    label: "Settings",
    icon: <SettingsIcon />,
  },
  {
    link: "/login",
    label: "Logout",
    icon: <LogoutIcon />,
  },
];

export const mainListItems = (
  <React.Fragment>
    {primarynavList.map((data: any, index: any) => (
      <Link
        key={index}
        to={data.link}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItemButton>
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText primary={data.label} />
        </ListItemButton>
      </Link>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    {secondaryNavList.map((data: any, index: any) => (
      <Link
        key={index}
        to={data.link}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItemButton>
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText primary={data.label} />
        </ListItemButton>
      </Link>
    ))}
  </React.Fragment>
);
