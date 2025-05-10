import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

// Material UI Icons
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset request
    console.log({ email });
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
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 6,
            py: 1,
            px: 2,
            mx: 'auto',
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

          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Forget Password
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Go back to
              </Typography>
              <Link href="/signin" underline="none" sx={{ ml: 1, fontWeight: 'medium' }}>
                Sign In
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have account
              </Typography>
              <Link href="#" underline="none" sx={{ ml: 1, fontWeight: 'medium' }}>
                Create Account
              </Link>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword; 