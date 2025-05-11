import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Chip,
  CssBaseline,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';

// Material UI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InstagramIcon from '@mui/icons-material/Instagram';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import './Settings.css';

const drawerWidth = 240;

function Settings() {
  // States for password fields visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // State for phone country code
  const [countryCode, setCountryCode] = useState('+84');

  const theme = useTheme();

  const navigate = useNavigate();

  // Function to toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        setIsFullScreen(true);
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
        setIsFullScreen(true);
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
        setIsFullScreen(true);
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        setIsFullScreen(false);
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        setIsFullScreen(false);
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Update fullscreen state when it changes outside our component
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  // Functions to toggle password visibility
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f7fa', overflow: 'hidden' }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
        <Toolbar>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: 0.5,
            px: 2
          }}>
            <WorkOutlineIcon sx={{
              color: theme.palette.primary.dark,
              fontSize: 32
            }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon color="action" />
            </Badge>
            <IconButton onClick={toggleFullScreen}>
              <FullscreenIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '50%', minWidth: 0, width: 32, height: 32, p: 0 }}
            >
              <Typography variant="body2">HD</Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: 'white',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%', pt: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'medium', color: '#888' }}>
                      Dashboard
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/sessions')}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ color: '#888' }}>
                      Working Sessions
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected sx={{
                '&.Mui-selected': {
                  bgcolor: '#e6f0f9',
                  color: theme.palette.primary.main,
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                }
              }}>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>

          <Box sx={{ mt: 'auto', mb: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ color: theme.palette.text.secondary }}
                onClick={() => navigate('/signin')}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: theme.palette.text.secondary }} />
                </ListItemIcon>
                <ListItemText primary="Log-out" />
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        mt: '64px', // Leave space for AppBar
        height: 'calc(100vh - 64px)', // Subtract AppBar height
        overflow: 'auto'
      }}>
        {/* Settings Header */}
        <Typography variant="h5" fontWeight="500" mb={3}>
          Settings
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={0} aria-label="settings tabs">
            <Tab
              icon={<AccountCircleIcon />}
              iconPosition="start"
              label="Account Setting"
              sx={{
                textTransform: 'none',
                fontWeight: 500
              }}
            />
          </Tabs>
        </Box>

        {/* Contact Information Section */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight="500" mb={2}>
            Contact Information
          </Typography>

          {/* Map Location */}
          <Box mb={2}>
            <Typography variant="body2" mb={1} color="text.secondary">
              Map Location
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your location"
              size="small"
            />
          </Box>

          {/* Phone */}
          <Box mb={2}>
            <Typography variant="body2" mb={1} color="text.secondary">
              Phone
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <TextField
                select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{ width: '100px', mr: 1 }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="img" src="https://flagcdn.com/w20/vn.png" alt="Vietnam flag" width={20} height={14} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="+84">+84</MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Phone number..."
                size="small"
              />
            </Box>
          </Box>

          {/* Email */}
          <Box mb={3}>
            <Typography variant="body2" mb={1} color="text.secondary">
              Email
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email address"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    ✉️
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Save Changes Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              py: 1,
              px: 3,
              fontWeight: 500
            }}
          >
            Save Changes
          </Button>
        </Box>

        {/* Change Password Section */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight="500" mb={2}>
            Change Password
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {/* Current Password */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              size="small"
              type={showCurrentPassword ? 'text' : 'password'}
              label="Current Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleCurrentPasswordVisibility} edge="end">
                      {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* New Password */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              size="small"
              type={showNewPassword ? 'text' : 'password'}
              label="New Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleNewPasswordVisibility} edge="end">
                      {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              size="small"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Change Password Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              py: 1,
              px: 3,
              fontWeight: 500
            }}
          >
            Change Password
          </Button>
        </Box>

        {/* Delete Your Company Section */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight="500" mb={2}>
            Delete Your Company
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2} sx={{ maxWidth: '80%' }}>
            If you delete your Jobpilot account, you will no longer be able to get information
            about the matched jobs, following employers, and job alert, shortlisted jobs and
            more. You will be abandoned from all the services of Jobpilot.com.
          </Typography>

          {/* Close Account Button */}
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            sx={{
              textTransform: 'none',
              py: 1,
              px: 3,
              fontWeight: 500,
              borderColor: 'red',
              color: 'red'
            }}
          >
            Close Account
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{
          borderTop: '1px solid #eee',
          pt: 2,
          mt: 4,
          textAlign: 'center',
          color: 'text.secondary'
        }}>
          <Typography variant="body2">
            © 2025 Job Application Ranking System
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
