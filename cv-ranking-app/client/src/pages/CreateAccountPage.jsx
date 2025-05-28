import backgroundImg from "../assets/background.png";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import React from "react";
import { useState } from "react";
import { signupApi } from "../api/api-login";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from "@mui/material/CircularProgress";
export default function CreateAccount() {
    const [openDialog, setOpenDialog] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    // Hàm mở dialog
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleClose = () => {
        setOpenDialog(false);
    };
  
    const handleSignup = async () => {
      if (!email || !password || !confirmPassword) {
        setSnackbarMessage("Please fill in all fields.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }
    
      if (password !== confirmPassword) {
        setSnackbarMessage("Passwords do not match.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }
    
      if (!agreeTerms) {
        setSnackbarMessage("You must agree to the Terms of Service.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }
    
      setIsLoading(true); // Bắt đầu loading
    
      try {
        const result = await signupApi(email, password);
        if (result.success) {
          setSnackbarMessage("Account created successfully. Please log in.");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
    
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setSnackbarMessage(result.message);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      } catch (error) {
        setSnackbarMessage("An unexpected error occurred.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        console.error("Error during signup:", error);
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    };
    
  return (
    <div style={styles.container}>
{isLoading && (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255,255,255,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Processing, please wait...</Typography>
        </Box>
      </Box>
    )}
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
              Create Account
            </Typography>
            <Box sx={{ mt: 0.5, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontSize: 16 }}>
                Already have account?{" "}
                <a href="/" style={{ color: '#0A65CC', textDecoration: 'none', fontWeight: 500 }}>
                  Log In
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

            <Box sx={{ width: '100%', mb: 1 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </Box>
            <Box sx={{mt:2, width: '100%', mb: 1 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              size="small"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I've read and agree with the{" "}
                    <span
                      style={{ color: '#0A65CC', cursor: 'pointer' }}
                      onClick={handleClickOpen}
                    >
                      Terms of Services
                    </span>
                  </Typography>
                }
              />
            </Box>


            <Button
              fullWidth
              variant="contained"
              onClick={handleSignup}
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
              Sign In
              <EastIcon sx={{ fontSize: 20, ml: 1 }} /> 
            </Button>
          </div>
        </div>
      </div>

      <div style={styles.right}></div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogContent>
            <Typography variant="body1">
            Welcome to our job ranking system. By using this service, you agree to the following terms:
            <br /><br />
            1. User Responsibilities: You must provide accurate information and may not use the service for illegal purposes.
            <br /><br />
            2. Intellectual Property: All content is owned by us.
            <br /><br />
            3. Limitation of Liability: We are not liable for any damages arising from your use of the service.
            <br /><br />
            4. Changes to Terms: We may modify these terms without prior notice.
            <br /><br />
            If you have any questions, please contact us.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Close
            </Button>
        </DialogActions>
        </Dialog>
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