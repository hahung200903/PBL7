import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaTrash } from 'react-icons/fa';

import './Sessions.css';

const drawerWidth = 240;

function Sessions() {
  // Dummy data
  const [resumeFiles, setResumeFiles] = useState([
    { id: 1, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 2, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 3, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 4, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 5, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 6, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 7, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 8, name: 'Name File PDF.pdf', size: '12.9 Mb' },
    { id: 9, name: 'Name File PDF.pdf', size: '12.9 Mb' }
  ]);

  // Dummy data for job description file
  const [jobDescFile, setJobDescFile] = useState([
    { id: 1, name: 'Name File PDF.pdf', size: '12.9 Mb' }
  ]);

  // State
  const [isFullScreen, setIsFullScreen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDeleteResumeFile = (id) => {
    setResumeFiles(resumeFiles.filter(file => file.id !== id));
  };

  const handleDeleteJobDescFile = (id) => {
    setJobDescFile(jobDescFile.filter(file => file.id !== id));
  };

  const handleResumeUpload = (e) => {
    console.log('Resume file uploaded');
    // Handle resume file upload logic
  };

  const handleJobDescUpload = (e) => {
    console.log('Job description file uploaded');
    // Handle job description file upload logic
  };

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
              <ListItemButton onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
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
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                      Sessions
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/settings')}>
                <ListItemIcon>
                  <SettingsIcon />
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
        <div className="session-header">
          <h2>Session</h2>
          <div className="action-buttons">
            <button className="back-btn">Back</button>
            <button className="ranking-btn">Ranking</button>
          </div>
        </div>

        <div className="upload-sections">
          {/* Resumes Section */}
          <div className="upload-section">
            <div className="section-header">
              <h3>All resumes ({resumeFiles.length})</h3>
              <button
                className="upload-btn"
                onClick={handleResumeUpload}
              >
                Upload
              </button>
            </div>
            <div className="files-container">
              {resumeFiles.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{file.size}</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteResumeFile(file.id)}
                  >
                    Delete file <FaTrash className="trash-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Job Description Section */}
          <div className="upload-section">
            <div className="section-header">
              <h3>Job Description ({jobDescFile.length}/1)</h3>
              <button
                className="upload-btn"
                onClick={handleJobDescUpload}
              >
                Upload
              </button>
            </div>
            <div className="files-container">
              {jobDescFile.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{file.size}</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteJobDescFile(file.id)}
                  >
                    Delete file <FaTrash className="trash-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Sessions; 