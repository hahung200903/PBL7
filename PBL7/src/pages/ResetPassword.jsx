import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

// Material UI Icons
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset
    console.log({ newPassword, confirmPassword });
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.default',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CssBaseline />

      <Container maxWidth="sm" component="main" sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 4
      }}>
        <Box sx={{ mb: 5 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 6,
            py: 1,
            px: 2
          }}>
            <WorkOutlineIcon sx={{
              color: theme.palette.primary.dark,
              fontSize: 32,
              mr: 1.5
            }} />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: theme.palette.primary.dark,
                fontSize: '1.3rem'
              }}
            >
              Job Application Ranking System
            </Typography>
          </Box>

          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
            Reset Password
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Duis luctus interdum metus, ut consectetur ante consectetur sed.
            Suspendisse euismod viverra massa sit amet mollis.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 'medium',
                fontSize: '1rem'
              }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPassword; 