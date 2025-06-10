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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSessionById } from "../api/api-session";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SimpleStepper from "../components/Stepper";
export default function RankingPage() {
  const [openDialog, setOpenDialog] = useState(false);
const [resumeToShow, setResumeToShow] = useState(null);
const [jdToShow, setJdToShow] = useState(null);
const [openJDDialog, setOpenJDDialog] = useState(false);
const [dialogFileUrl, setDialogFileUrl] = useState(null);
const [dialogTitle, setDialogTitle] = useState("");

  const [resumes,setResumes]=useState(null);
  const { sessionId } = useParams();
  const [jdFile, setJdFile] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rankingResult, setRankingResult] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getSessionById(sessionId);
    //   console.log("Result from getSessionById:", result);
  
      if (result.success) {
        setSessionName(result.data.metadata.session.sessionName);
        setResumes(result.data.metadata.resumes);
        const rankingRaw = result.data.metadata.session.rankingResult;
        try {
          const parsedRanking = typeof rankingRaw === 'string' ? JSON.parse(rankingRaw) : rankingRaw;
          setRankingResult(parsedRanking); // ✅ Đảm bảo là mảng
        } catch (err) {
          console.error("Failed to parse rankingResult:", err);
          setRankingResult([]); // fallback để không crash app
        }
  
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
            <SimpleStepper currentStep={2} />
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

          </Box>



                <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="text" onClick={()=>{navigate('/home')}}>Back</Button>


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
                    Ranking Score
                  </Typography>
                  
                </Box>
                <TableVirtuoso
                style={{ width: "100%", height: "calc(100vh - 250px)" }}
                data={rankingResult}
                components={VirtuosoTableComponents}
                fixedHeaderContent={() => (
                    <StyledTableRow>
                    <StyledTableCell align="left">File Name</StyledTableCell>
                    <StyledTableCell align="center" width={300}>Score</StyledTableCell>
                    <StyledTableCell align="center" width={100}>Action</StyledTableCell>
                    </StyledTableRow>
                )}
                itemContent={(index, row) => (
                    <>
                      <StyledTableCell align="left">{row.fileName}</StyledTableCell>
                      <StyledTableCell align="center">
                        {typeof row.score === "number" ? row.score.toFixed(2) : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Tooltip title="View file">
                      <IconButton
  onClick={() => {
    const matchedResume = resumes?.find(r => r.fileName === row.fileName);
    if (matchedResume?.fileUrl) {
      setResumeToShow(matchedResume);
      setJdToShow(jdFile); // hoặc tìm JD phù hợp nếu có nhiều JD
      setOpenDialog(true);
    } else {
      alert("File URL not found for this resume.");
    }
  }}
>
  <FindInPageIcon />
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
                    <Tooltip title="View file">
                    <IconButton
                        onClick={() => {
                          setDialogFileUrl(jdFile.fileUrl);
                          setDialogTitle(jdFile.fileName);
                          setOpenJDDialog(true);
                          
                  
                        }}
                      >
                        <FindInPageIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            </Box>
            <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  fullWidth
  maxWidth="xl"
>
  <DialogTitle>Resume & Job Description</DialogTitle>
  <DialogContent dividers sx={{ height: "80vh", p: 0 }}>
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* Resume bên trái */}
      <Box sx={{ flex: 1, borderRight: "1px solid #ccc" }}>
        <Box sx={{ p: 1, borderBottom: "1px solid #eee" }}>
          <Typography variant="subtitle1">{resumeToShow?.fileName}</Typography>
        </Box>
        {resumeToShow?.fileUrl ? (
          <iframe
            src={resumeToShow.fileUrl}
            title="Resume"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        ) : (
          <Typography sx={{ p: 2 }}>Không tìm thấy file Resume.</Typography>
        )}
      </Box>

      {/* JD bên phải */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ p: 1, borderBottom: "1px solid #eee" }}>
          <Typography variant="subtitle1">{jdToShow?.fileName}</Typography>
        </Box>
        {jdToShow?.fileUrl ? (
          <iframe
            src={jdToShow.fileUrl}
            title="JD"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        ) : (
          <Typography sx={{ p: 2 }}>Không tìm thấy file JD.</Typography>
        )}
      </Box>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>Close</Button>
  </DialogActions>
</Dialog>

<Dialog
  open={openJDDialog}
  onClose={() => setOpenJDDialog(false)}
  fullWidth
  maxWidth="md"
>
  <DialogTitle>{dialogTitle}</DialogTitle>
  <DialogContent dividers sx={{ height: "80vh", p: 0 }}>
    {dialogFileUrl && (
      <iframe
        src={dialogFileUrl}
        title="File Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenJDDialog(false)}>Close</Button>
  </DialogActions>
</Dialog>

          </Layout>
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
  