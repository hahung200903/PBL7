import React from "react";
import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LogoutIcon from '@mui/icons-material/Logout';
import { clearAccessToken } from "../utils/storage";
import { getEmail } from "../utils/storage";
const NAV_ITEMS = [
  { label: "Home", icon: <DashboardIcon />, path: "/home" },
  { label: "Setting", icon: <SettingsIcon />, path: "/setting" },
];
import { useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = getEmail();
  const handleLogout = () => {
    clearAccessToken();
    navigate("/");
  };
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            height: 64,
            width: "100%",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            px: 3,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BusinessCenterIcon sx={{ fontSize: 32, mr: 1, color: "#0A65CC" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: 20, fontFamily: "Roboto" }}
            >
              Job Application Ranking System
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              fontSize: 16,
              fontFamily: "Roboto",
              marginRight: "50px",
              color: "#0A65CC",
            }}
          >
            {email || "Guest"}
          </Typography>

        </Box>

        {/* Content */}
       <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", height: "calc(100vh - 64px)", overflow: "hidden" }}>

          {/* Sidebar */}
          <Box
  sx={{
    width: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    p: 3,
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "#fff",
  }}
>
  {/* Danh sách các item */}
  <Box>
    {NAV_ITEMS.map((item) => (
      <Box
        key={item.label}
        onClick={() => navigate(item.path)}
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          p: 1,
          borderRadius: 1,
          cursor: "pointer",
          backgroundColor: location.pathname === item.path ? "#E7F0FA" : "transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#E7F0FA",
            color: "#0A65CC",
          },
          color: location.pathname === item.path ? "#0A65CC" : "#525252",
        }}
      >
        {item.icon}
        <Typography sx={{ ml: 1 }}>{item.label}</Typography>
      </Box>
    ))}
  </Box>

  {/* Nút Logout */}
  <Box
    onClick={() => {
      // Xử lý logout ở đây (xóa token, redirect...)
      handleLogout();
    }}
    sx={{
      display: "flex",
      alignItems: "center",
      p: 1,
      marginBottom: 5,

      borderRadius: 1,
      cursor: "pointer",
      color: "#d32f2f",
      "&:hover": {
        backgroundColor: "#FDECEA",
      },
    }}
  >
    <LogoutIcon />
    <Typography sx={{ ml: 1 }}>Logout</Typography>
  </Box>
</Box>

          {/* Main content */}
          <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}