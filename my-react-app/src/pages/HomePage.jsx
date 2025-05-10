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
export default function HomePage() {
    const data = [
        { name: "Session 1", jd: true, resume: 5, createAt: "2025-05-10", isRanking: true },
        { name: "Session 2", jd: false, resume: 10, createAt: "2025-05-09", isRanking: false },
        { name: "Session 3", jd: true, resume: 3, createAt: "2025-05-08", isRanking: true },
        { name: "Session 4", jd: false, resume: 8, createAt: "2025-05-07", isRanking: false },
        { name: "Session 5", jd: true, resume: 12, createAt: "2025-05-06", isRanking: true },
        { name: "Session 6", jd: false, resume: 2, createAt: "2025-05-05", isRanking: false },
        { name: "Session 7", jd: true, resume: 7, createAt: "2025-05-04", isRanking: true },
        { name: "Session 8", jd: false, resume: 6, createAt: "2025-05-03", isRanking: false },
        { name: "Session 9", jd: true, resume: 9, createAt: "2025-05-02", isRanking: true },
        { name: "Session 10", jd: false, resume: 11, createAt: "2025-05-01", isRanking: false },
        { name: "Session 11", jd: true, resume: 4, createAt: "2025-04-30", isRanking: true },
        { name: "Session 12", jd: false, resume: 1, createAt: "2025-04-29", isRanking: false },
        { name: "Session 13", jd: true, resume: 13, createAt: "2025-04-28", isRanking: true },
        { name: "Session 14", jd: false, resume: 5, createAt: "2025-04-27", isRanking: false },
        { name: "Session 15", jd: true, resume: 14, createAt: "2025-04-26", isRanking: true },
        { name: "Session 16", jd: false, resume: 3, createAt: "2025-04-25", isRanking: false },
        { name: "Session 17", jd: true, resume: 6, createAt: "2025-04-24", isRanking: true },
        { name: "Session 18", jd: false, resume: 4, createAt: "2025-04-23", isRanking: false },
        { name: "Session 19", jd: true, resume: 8, createAt: "2025-04-22", isRanking: true },
        { name: "Session 20", jd: false, resume: 10, createAt: "2025-04-21", isRanking: false },
      ];
      
      
      
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
        { width: 150, label: "Name Working Session", dataKey: "name", align: "center" },
        {  label: "Job Description", dataKey: "jd", align: "center" },
        { width: 200, label: "Resumes", dataKey: "resume", align: "center" },
        { width: 300, label: "Create At", dataKey: "createAt", align: "center" },
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
        return (
          <>
            <StyledTableCell align="center">{row.name}</StyledTableCell>
            <StyledTableCell align="center">
              {row.jd ? (
                <CheckCircleIcon sx={{ color: "#2e7d32" }} />
              ) : (
                <CheckCircleOutlineIcon sx={{ color: "#787878" }} />
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {row.resume} resumes
            </StyledTableCell>
            <StyledTableCell align="center">{row.createAt}</StyledTableCell>
            <StyledTableCell align="center" width={150}>
              <Tooltip title="View">
                <IconButton>
                  <FindInPageIcon  sx={{color:"black"}}/>
                </IconButton>
              </Tooltip>
              <Tooltip title="View Ranking">
                <span>
                    <IconButton disabled={!row.isRanking}>
                    <ReduceCapacityIcon  sx={{ color: row.isRanking ? "black" : "#9D9D9D" }} />
                    </IconButton>
                </span>
                </Tooltip>

            </StyledTableCell>
          </>
        );
      }
      
  
  

  return (
    <div style={styles.container}>
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

            <Button variant="contained">
            Add Session
            </Button>
        </Box>

        <TableVirtuoso style={{ width: "100%", height: "94%" }} // Đảm bảo full height
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
    />
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
  