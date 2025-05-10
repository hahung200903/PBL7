import backgroundImg from "../assets/background.png";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import React from "react";
import { useState } from "react";

export default function CreateAccount() {
    const [openDialog, setOpenDialog] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    // Hàm mở dialog
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleClose = () => {
        setOpenDialog(false);
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
                label="FullName"
                variant="outlined"
                size="small"
                autoComplete="off"
              />
            </Box>
            <Box sx={{mt : 2, width: '100%', mb: 1,paddingBottom:'10px' }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
                autoComplete="off"
              />
            </Box>

            <Box sx={{ width: '100%', mb: 1 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{mt:2, width: '100%', mb: 1 }}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                size="small"
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
              <EastIcon sx={{ fontSize: 20, ml: 1 }} /> {/* Cách icon khỏi chữ "Login" */}
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
