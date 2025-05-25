import backgroundImg from "../assets/background.png";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Typography, Box, TextField, Button } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from "react";
export default function ForgotPassword() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [email, setEmail] = useState("");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <div style={styles.container}>

      <div style={styles.left}>
        {/* Header trên cùng */}
        <Box sx={styles.header}>
        <BusinessCenterIcon sx={{ fontSize: 32, mr: 1, color: '#0A65CC' }} />

          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20, fontFamily: 'Roboto' }}>
            Job Application Ranking System
          </Typography>
        </Box>

        {/* Form căn giữa */}
        <div style={styles.formWrapper}>
          <div style={styles.form}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20, fontFamily: 'Roboto'}}>
              Forget Password
            </Typography>
            <Box sx={{ mt: 0.5, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontSize: 16 }}>
                Go back to{" "}
                <a href="/" style={{ color: '#0A65CC', textDecoration: 'none', fontWeight: 500 }}>
                  Sign In
                </a>
              </Typography>
            </Box>
            <Box sx={{ mt: 0.5, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontSize: 16 }}>
                Don't have an account?{" "}
                <a href="/register" style={{ color: '#0A65CC', textDecoration: 'none', fontWeight: 500 }}>
                  Create account
                </a>
              </Typography>
            </Box>
            <Box sx={{mt : 2, width: '100%', mb: 1,paddingBottom:'10px' }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ 
                backgroundColor: '#0A65CC', 
                textTransform: 'none', 
                fontWeight: 500, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                paddingRight: '16px' // Đảm bảo icon không sát quá
              }}
            >
              Reset Password
              <EastIcon sx={{ fontSize: 20, ml: 1 }} /> {/* Cách icon khỏi chữ "Login" */}
            </Button>
          </div>
        </div>
      </div>

      <div style={styles.right}></div>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      >
        <MuiAlert variant='filled' onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  left: {
    flex: 1,
    position: "relative", // cần để đặt header tuyệt đối
    display: "flex",
    flexDirection: "column",
  },
  header: {
    position: "absolute",
    top: 20,
    left: 30,
    display: "flex",
    alignItems: "center",
  },
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    width: "90%",
    maxWidth: "560px",
  },
  right: {
    flex: 1,
    clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};
