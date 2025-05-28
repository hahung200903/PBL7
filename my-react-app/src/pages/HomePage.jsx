import { Typography, Box, TextField, Button, Tooltip, IconButton } from '@mui/material';
import Layout from "./Layout";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableVirtuoso } from "react-virtuoso";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import { useNavigate } from "react-router-dom";
import { getSession } from '../api/api-session';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSession } from '../api/api-session';

export default function HomePage() {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const handleSnackbarClose = () => {

        setOpenSnackbar(false);
      };
    useEffect(() => {
      const fetchSessions = async () => {
        setIsLoading(true);
        const result = await getSession();
        if (result.success) {
          setSessions(result.data);
        } else {
          console.error(result.message);
        }
        setIsLoading(false);
      };
  
      fetchSessions();
    }, []);
    const showSnackbar = (message, severity = "success") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setOpenSnackbar(true);
    };
    
    const navigate = useNavigate();
    const handleDelete = async (id) => {
      const confirm = window.confirm("Are you sure you want to delete this session?");
      if (!confirm) return;
    
      const result = await deleteSession(id);
      if (result.success) {
        setSessions(prev => prev.filter(session => session._id !== id));
        showSnackbar("Delete session successfully", "success");
      } else {
        showSnackbar(result.message || "Failed to delete session", "error");
      }
    };
    
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#0071A6",
          color: theme.palette.common.white,
          borderRight: '1px solid #ddd', // Đường phân cách dọc
    
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          padding: '5px 10px', // Thêm padding cho các hàng
          borderRight: '1px solid #ddd', // Đường phân cách dọc
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
    
      const columns = [
        { width: 150, label: "Name Working Session", dataKey: "sessionName", align: "center" },
        { width: 200, label: "Number Of Resumes", dataKey: "numOfRe", align: "center" },
        { width: 300, label: "Create At", dataKey: "createdAt", align: "center" }, // sửa "createAt" => "createdAt"
        { width: 150, label: "Actions", dataKey: "actions", align: "center" },
      ];
      
    
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
      
      
      
      function fixedHeaderContent() {
        return (
          <StyledTableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.dataKey}
                variant="head"
                align="center" // Cố định căn giữa
                style={{ width: column.width, textAlign: "center" }} // Đảm bảo text ở giữa
              >
                {column.label}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        );
      }
      function rowContent(index, row) {
        const formattedDate = new Date(row.createdAt).toLocaleString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      
        return [
          <StyledTableCell key="name" align="center">{row.sessionName}</StyledTableCell>,
          <StyledTableCell key="numOfRe" align="center">{row.numberOfResumes}</StyledTableCell>,
          <StyledTableCell key="createdAt" align="center">{formattedDate}</StyledTableCell>,
          <StyledTableCell key="actions" align="center" width={150}>
            
           <Tooltip title="View">
              <IconButton onClick={() => navigate(`/edit/${row._id}`)}>
                <FindInPageIcon sx={{ color: "black" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Ranking">
              <span>
                <IconButton disabled={!row.rankingResult}  onClick={() => navigate(`/ranking/${row._id}`)}>
                  <ReduceCapacityIcon sx={{ color: row.rankingResult ? "black" : "#9D9D9D" }} />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Delete Session">
              <IconButton onClick={() => handleDelete(row._id)}>
                <DeleteIcon sx={{ color: "black" }} />
              </IconButton>
            </Tooltip>

          </StyledTableCell>,
        ];
      }
      
  
  

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
            <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: 16, fontFamily: "Roboto" }}
            >
            Recently Session
            </Typography>

            <Button variant="contained" onClick={() =>  navigate('/upload')}>
            Add Session
            </Button>
        </Box>

        <TableVirtuoso style={{ width: "100%", height: "94%" }} // Đảm bảo full height
        data={sessions}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(index, row) => rowContent(index, row)}

    />
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
  