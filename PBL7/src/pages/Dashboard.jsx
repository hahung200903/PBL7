import { useState, useEffect } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Chip,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const drawerWidth = 240;

function Dashboard() {
  // Dummy data
  const sessions = [
    { id: 1, name: 'AI Resume', description: true, resumeCount: 18 },
    { id: 2, name: 'Software Engineer Position', description: true, resumeCount: 24 },
    { id: 3, name: 'Marketing Specialist', description: true, resumeCount: 12 },
    { id: 4, name: 'Data Science Team', description: true, resumeCount: 18 },
    { id: 5, name: 'UX Designer', description: true, resumeCount: 9 },
  ];

  // State
  const [isFullScreen, setIsFullScreen] = useState(false);
  const theme = useTheme();

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
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'medium' }}>
                      DASHBOARD
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
                  <LayersIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Working Sessions" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>

          <Box sx={{ mt: 'auto', mb: 2 }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: theme.palette.text.secondary }}>
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
        {/* Main Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" fontWeight="medium">
            Recently Session
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="medium"
            color="primary"
          >
            Add Session
          </Button>
        </Box>

        {/* Sessions Table */}
        <TableContainer component={Paper} sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)', borderRadius: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="sessions table">
            <TableHead>
              <TableRow>
                <TableCell>Name Working Session</TableCell>
                <TableCell align="center">Job Description</TableCell>
                <TableCell>Resumes</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow
                  key={session.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {session.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {session.description && <CheckCircleIcon sx={{ color: 'success.main', display: 'inline-block' }} />}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${session.resumeCount} Resumes`}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <IconButton size="small">
                        <PeopleIcon color="primary" />
                      </IconButton>
                      <IconButton size="small">
                        <DescriptionIcon color="primary" />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVertIcon color="primary" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Dashboard; 