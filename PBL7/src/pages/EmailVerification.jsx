import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

// Material UI Icons
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const email = 'emailaddress@gmail.com';
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verification logic here
    console.log({ verificationCode });
  };

  const handleResend = (e) => {
    e.preventDefault();
    // Handle resend logic here
    console.log('Resending verification code');
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.default',
      justifyContent: 'center',
      alignItems: 'center',
      p: 3
    }}>
      <CssBaseline />

      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          py: 1,
          px: 2,
          width: 'fit-content'
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

        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Email Verification
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We've sent a verification to <Box component="span" sx={{ color: 'primary.main', fontWeight: 'medium' }}>{email}</Box> to verify your
          email address and activate your account.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="verificationCode"
            label="Verification Code"
            name="verificationCode"
            autoFocus
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 1.5,
              fontWeight: 'medium',
              fontSize: '1rem',
              mb: 2
            }}
          >
            Verify My Account
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Didn't receive any code!{' '}
            <Link
              href="#"
              onClick={handleResend}
              underline="none"
              sx={{ fontWeight: 'medium' }}
            >
              Resend
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default EmailVerification; 