import Layout from "./Layout";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
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
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSessionById } from "../api/api-session";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getRanking } from "../api/api-session";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { patchSessionRankingResult } from "../api/api-session";
export default function EditPage() {
  const { sessionId } = useParams();
  const [resumes, setResumes] = useState([]);
  const [jdFile, setJdFile] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [topResume, setTopResume] = useState(null);
  const [rankingResult, setRankingResult] = useState(null);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const resumeOptions = resumes.length > 0 
  ? Array.from({ length: resumes.length }, (_, i) => i + 1)
  : [];



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getSessionById(sessionId);
      console.log("Result from getSessionById:", result);
      if (result.success) {
        setSessionName(result.data.metadata.session.sessionName);
        setResumes(result.data.metadata.resumes);
        
        setRankingResult(result.data.metadata.session.rankingResult); // 👈 thêm dòng này
        setJdFile(result.data.metadata.jd);
      } else {
        console.error(result.message);
      }
      setIsLoading(false);
    };

    if (sessionId) {
      fetchData();
    }
  }, [sessionId]);
   
    
  const handleRanking = async () => {
    if (!resumes.length || !jdFile) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please upload both resumes and a job description first.");
      setOpenSnackbar(true);
      return;
    }
  
    if (!topResume) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please select a top resume before ranking.");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      setIsLoading(true);
      const result = await getRanking(topResume, resumes, jdFile);
      console.log("Result from getRanking:", result);
      if (result.success) {
        const ranking = result.data.rankingResult;
        setRankingResult(ranking);
        setSnackbarSeverity("success");
        setSnackbarMessage("Ranking completed successfully!");
  
        // ✅ Gọi API để cập nhật rankingResult vào session
        const patchResult = await patchSessionRankingResult(sessionId, JSON.stringify(result.data));
        if (!patchResult.success) {
          console.error("Failed to update session ranking result:", patchResult.message);
          setSnackbarSeverity("warning");
          setSnackbarMessage("Ranking completed but failed to save.");
        }
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(result.message || "Ranking failed.");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("An error occurred during ranking.");
      console.error("Error during ranking:", error);
    } finally {
      setIsLoading(false);
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
          backgroundColor:"#D3F3FF", // Màu nền khi hover
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
            <Box
              sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
            >
             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="body1"
              sx={{ 
                fontSize: 16, 
                fontFamily: "Roboto", 
                fontWeight: 600,
                width: 250,
                p: 1,
              }}
            >
              {sessionName || "Untitled Session"}
            </Typography>

            <Autocomplete
              size="small"
              options={resumeOptions}
              value={topResume}
              onChange={(event, newValue) => setTopResume(newValue)}
              getOptionLabel={(option) => option.toString()} // 👈 Ép kiểu thành string
              renderInput={(params) => (
                <TextField {...params} label="Choose top resume" />
              )}
              sx={{ width: 200, backgroundColor: "white" }}
              disabled={resumeOptions.length === 0}
            />

          </Box>



                <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="text" onClick={()=>{navigate('/home')}}>Back</Button>
                <Button 
                  variant="contained" 
                  disabled={rankingResult} 
                  onClick={handleRanking}
                >
                  Ranking
                </Button>

                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: 1 }}>

              {/* Bên trái */}
              <Box sx={{ flex: 1, borderRight: "1px solid #ccc", p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",mb:1}}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 400, fontSize: 15, fontFamily: "Roboto" }}
                  >
                    All resumes
                  </Typography>
                  
                </Box>
                <TableVirtuoso
                    style={{ width: "100%", height: "calc(100vh - 250px)" }}
                    data={resumes}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={() => (
                      <StyledTableRow>
                        <StyledTableCell align="left">Name File</StyledTableCell>
                        <StyledTableCell align="center"width={50}>Actions</StyledTableCell>
                      </StyledTableRow>
                    )}
                    itemContent={(index, row) => (
                      <>
                        <StyledTableCell align="left">{row.fileName}</StyledTableCell>
                        <StyledTableCell align="center" >
                          <Tooltip title="Delete">
                            <IconButton disabled>
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
                    <Typography sx={{ fontSize: 14 }}>{jdFile.fileName}</Typography>
                    <Tooltip title="Delete">
                      <IconButton disabled>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            </Box>
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
  