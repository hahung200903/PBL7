import Layout from "./Layout";
import React from "react";
import { Box, Typography, Button, DialogActions } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableVirtuoso } from "react-virtuoso";
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import TextField from "@mui/material/TextField";
import { addSession } from "../api/api-session";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import SimpleStepper from "../components/Stepper";
export default function UploadPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [jdFile, setJdFile] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const handleDeleteResume = (index) => {
    setResumes(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteJD = () => {
    setJdFile(null);
  };
  const handleViewResume = (file) => {
    setPdfUrl(URL.createObjectURL(file));
    setOpenDialog(true);
  };



  const handleResumeUpload = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type === "application/pdf");
    const newFiles = files.map(file => ({ name: file.name, file }));
    setResumes(prev => [...prev, ...newFiles]);
  };

  const handleJDUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setJdFile({ name: file.name, file });
    }
  };
  const handleSubmit = async () => {
    if (!sessionName.trim()) {
      setSnackbarMessage("Please enter a session name.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }
    if (resumes.length === 0 || !jdFile) {
      setSnackbarMessage("Please upload both resumes and a JD file.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    setIsLoading(true);

    // Tạo một Promise timeout sau 60 giây
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out after 1 minute.")), 60000)
    );

    try {
      // Promise.race để chạy song song: nếu addSession lâu quá thì timeout sẽ chạy trước
      const result = await Promise.race([
        addSession(resumes, jdFile, sessionName),
        timeoutPromise,
      ]);

      setIsLoading(false);

      if (result.success) {
        setSnackbarMessage("Session added successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate(`/edit/${result.data.metadata.sessionData._id}`);
        }, 1000);
      } else {
        setSnackbarMessage(result.message || "Something went wrong.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setIsLoading(false);
      setSnackbarMessage(error.message || "An unexpected error occurred.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
      backgroundColor: "#0071A6",

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: '5px 10px', // Thêm padding cho các hàng
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: "#D3F3FF", // Màu nền khi hover
      cursor: 'pointer', // Tùy chọn: Thêm hiệu ứng con trỏ
    },
  }));

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} sx={{ height: "calc(100vh - 200px)" }} />
    )),

    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed", backgroundColor: "white" }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow: StyledTableRow, // Sử dụng StyledTableRow bạn đã định nghĩa
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    TableCell: StyledTableCell, // Sử dụng StyledTableCell bạn đã định nghĩa
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
      <Layout>
        <SimpleStepper currentStep={0} />
        <br />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            label="Session Name"
            variant="outlined"
            size="small"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            sx={{ fontSize: 16, fontFamily: "Roboto", width: 250, backgroundColor: 'white' }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="text" onClick={() => { navigate('/home') }}>Back</Button>
            <Button variant="contained" onClick={handleSubmit}>Save</Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>

          {/* Bên trái */}
          <Box sx={{ flex: 1, borderRight: "1px solid #ccc", p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 400, fontSize: 15, fontFamily: "Roboto" }}
              >
                All resumes
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  multiple
                />
              </Button>
            </Box>
            <TableVirtuoso
              style={{ width: "100%", height: "calc(96vh - 250px)" }}
              data={resumes}
              components={VirtuosoTableComponents}
              fixedHeaderContent={() => (
                <StyledTableRow>
                  <StyledTableCell align="left">Name File</StyledTableCell>
                  <StyledTableCell align="center" width={100}>Actions</StyledTableCell>
                </StyledTableRow>
              )}
              itemContent={(index, row) => (
                <>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>

                  <StyledTableCell align="center" >
                    <Tooltip title="View file">
                      <IconButton onClick={() => handleViewResume(row.file)}>
                        <VisibilityIcon />
                      </IconButton>

                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteResume(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </>
              )}
            />
          </Box>

          {/* Bên phải */}
          <Box sx={{ flex: 1, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 400, fontSize: 15, fontFamily: "Roboto" }}
              >
                Job Description
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}

              >
                Upload
                <VisuallyHiddenInput
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleJDUpload}
                />
              </Button>
            </Box>

            {/* Hiển thị file JD nếu có */}
            {jdFile && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#fff',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <Typography sx={{ fontSize: 14 }}>{jdFile.name}</Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="View file">
                    <IconButton onClick={() => handleViewResume(jdFile.file)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteJD}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}

          </Box>
        </Box>
        ;

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>View File</DialogTitle>
          <DialogContent dividers sx={{ height: "80vh", p: 0 }}>
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                title="File Viewer"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Layout>
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

};
