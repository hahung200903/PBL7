import Layout from "./Layout";
import React, { useEffect, useState } from "react";
import ResumeCountChart from "../components/ResumeCountChart";
import { Typography, Autocomplete, TextField } from "@mui/material";
import { getStatistics } from "../api/api-session";
import WordCloudComponent from "../components/WordCloud";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {updateVocab} from "../api/api-session";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getWordCloud } from "../api/api-session";
export default function Dashboard() {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [isLoading, setIsLoading] = useState(false);
  const [statisticsData, setStatisticsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBarCategory, setSelectedBarCategory] = useState(null);
  const [vocabData, setVocabData] = useState({});
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedFixedCategory, setSelectedFixedCategory] = useState(null); // 🔁 Di chuyển lên trước
  const [experienceWordCloud, setExperienceWordCloud] = useState([]);
const [roleWordCloud, setRoleWordCloud] = useState([]);
const [skillsWordCloud, setSkillsWordCloud] = useState([]);




useEffect(() => {
  const fetchWordCloud = async () => {
    if (!selectedFixedCategory) return;
    setIsLoading(true);
    try {
      const result = await getWordCloud(selectedFixedCategory.value);
      if (result.success) {
        const exp = result.data.experience || {};
        const role = result.data.role || {};
        const skills = result.data.skills || {};

        setExperienceWordCloud(Object.entries(exp).map(([text, value]) => ({ text, value })));
        setRoleWordCloud(Object.entries(role).map(([text, value]) => ({ text, value })));
        setSkillsWordCloud(Object.entries(skills).map(([text, value]) => ({ text, value })));
      } else {
        setSnackbarMessage("Failed to fetch word cloud");
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching word cloud:", error);
      setSnackbarMessage("An error occurred while fetching word cloud.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  fetchWordCloud();
}, [selectedFixedCategory]);


  const fixedCategories = [
    { label: "AI", value: "ai" },
    { label: "DevOps", value: "devops" },
    { label: "Project Manager", value: "project_manager" },
    { label: "Tester", value: "tester" },
    { label: "Business Analyst", value: "business_analyst" },
    { label: "HR", value: "hr" },
    { label: "Software Engineer", value: "software_engineer" },
    { label: "UX/UI", value: "ux_ui" }
  ];
  
  const handleSnackbarClose = () => {

    setOpenSnackbar(false);
  };

  const getExperienceWordBag = () => {
    const expVocab = vocabData.Experience_vocab || {};
    return Object.entries(expVocab); // [['word1', count1], ['word2', count2], ...]
  };
  const getRoleWordBag = () => {
    const roleVocab = vocabData.Role_vocab || {};
    return Object.entries(roleVocab);
  };
  
  const getTopSkillsWordBag = () => {
    const skillVocab = vocabData["Top Skills_vocab"] || {};
    return Object.entries(skillVocab);
  };
  
  const handleResumeChoose = (event) => {
    const files = Array.from(event.target.files);
    setSelectedResumes(files); // Lưu tạm danh sách file
    console.log("Selected PDF files:", files);
  };

  const handleSaveUpdateVocab = async () => {
    if (selectedResumes.length === 0) {
      setSnackbarMessage("No PDF files selected.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }
  
    if (!selectedBarCategory) {
      setSnackbarMessage("Please select a category from the dropdown.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }
  
    setIsLoading(true);
  
    try {
      const result = await updateVocab(selectedResumes, selectedBarCategory);
      if (result.success) {
        setSnackbarMessage("Vocabulary updated successfully!");
        setSnackbarSeverity("success");
  
        // 👇 Fetch lại thống kê + word bag sau khi cập nhật xong
        await fetchStatistics();
      } else {
        setSnackbarMessage("Failed to update vocabulary: " + result.message);
        setSnackbarSeverity("error");
      }
    } catch (err) {
      console.error("Error updating vocabulary:", err);
      setSnackbarMessage("An error occurred while updating vocabulary.");
      setSnackbarSeverity("error");
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };
  
  
  
  
  
  
  
  // const vocabOptions = ["Education", "Experience", "Languages", "Role", "Top Skills"];
  const fetchStatistics = async () => {
    setIsLoading(true); // Khi fetch lại cũng nên bật loading
    const result = await getStatistics();
    if (result.success) {
      const rawCounts = result.data.resumeCount;
  
      const formatted = Object.entries(rawCounts).map(([key, count]) => ({
        category: key.toUpperCase(),
        categoryLower: key.toLowerCase(),
        count,
        color: getRandomColor(),
      }));
  
      setStatisticsData(formatted);
      setFilteredData(formatted);
      setVocabData(result.data.vocal || {});
    } else {
      console.error("Failed to fetch statistics:", result.message);
    }
  
    setIsLoading(false); // Kết thúc fetch
  };
  
  useEffect(() => {
    fetchStatistics();
  }, []);
  
  const limitWordCloud = (data, max = 50) => {
    return data
      .sort((a, b) => b.value - a.value) // sort theo độ quan trọng
      .slice(0, max);
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
        <div style={styles.chartContainer}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: 18, fontFamily: "Roboto" }}
          >
            Resume Dashboard
          </Typography>

          {/* Autocomplete lọc category phía trên biểu đồ cột */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px", alignItems: "center" }}>
  <Autocomplete
    value={selectedBarCategory}
    onChange={(event, newValue) => setSelectedBarCategory(newValue)}
    options={statisticsData.map(item => item.categoryLower)}
    getOptionLabel={(option) => option}
    renderInput={(params) => <TextField {...params} label="Category" />}
    sx={{ width: 300 }}
    isOptionEqualToValue={(option, value) => option === value}
    clearOnEscape
    disableClearable={false}
  />

  <Button
    component="label"
    variant="contained"
    startIcon={<CloudUploadIcon />}
  >
    Import
    <input
      hidden
      type="file"
      accept="application/pdf"
      multiple
      onChange={handleResumeChoose}
    />
  </Button>

  <Button
    variant="contained"
    color="success"
    disabled={selectedResumes.length === 0 || selectedBarCategory === null}
    onClick={handleSaveUpdateVocab}
  >
    Save
  </Button>
</div>



          <ResumeCountChart data={filteredData} />
          <br />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18, fontFamily: "Roboto", mt: 3 }}>
            Experience Word Bag ({getExperienceWordBag().length})
          </Typography>
          <div style={styles.wordGrid}>
            {getExperienceWordBag()
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([word], index) => (
                <div key={index} style={styles.wordItem}>
                  {word}
                </div>
              ))}
          </div>


          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18, fontFamily: "Roboto", mt: 3 }}>
            Role Word Bag ({getRoleWordBag().length})
          </Typography>
          <div style={styles.wordGrid}>
            {getRoleWordBag()
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([word], index) => (
                <div key={index} style={styles.wordItem}>
                  {word}
                </div>
              ))}
          </div>


          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18, fontFamily: "Roboto", mt: 3 }}>
            Top Skills Word Bag ({getTopSkillsWordBag().length})
          </Typography>
          <div style={styles.wordGrid}>
            {getTopSkillsWordBag()
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([word], index) => (
                <div key={index} style={styles.wordItem}>
                  {word}
                </div>
              ))}
          </div>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18, fontFamily: "Roboto", mt: 3 }}>
            Word Cloud
          </Typography>
          
          <div style={{ marginTop: 10, display: "flex", gap: 16, alignItems: "center" }}>
          <Autocomplete
  value={selectedFixedCategory}
  onChange={(event, newValue) => setSelectedFixedCategory(newValue)}
  options={fixedCategories}
  getOptionLabel={(option) => option.label}
  renderInput={(params) => <TextField {...params} label="Category" />}
  sx={{ width: 300 }}
  isOptionEqualToValue={(option, value) => option.value === value?.value}
/>

</div>
{selectedFixedCategory && (
  <>
    <Typography variant="h6" sx={{ mt: 4 }}>
      Experience Word Cloud
    </Typography>
    <WordCloudComponent
      data={limitWordCloud(experienceWordCloud)}
      font="Roboto"
      width={800}
      height={400}
      rotate={0}
      fontSizeMapper={(word) => Math.max(12, Math.log2(word.value + 1) * 9)}
    />

    <Typography variant="h6" sx={{ mt: 4 }}>
      Role Word Cloud
    </Typography>
    <WordCloudComponent
      data={limitWordCloud(roleWordCloud)}
      font="Roboto"
      width={800}
      height={400}
      rotate={0}
      fontSizeMapper={(word) => Math.max(12, Math.log2(word.value + 1) * 9)}
    />

    <Typography variant="h6" sx={{ mt: 4 }}>
      Skills Word Cloud
    </Typography>
    <WordCloudComponent
      data={limitWordCloud(skillsWordCloud)}
      font="Roboto"
      width={800}
      height={400}
      rotate={0}
      fontSizeMapper={(word) => Math.max(12, Math.log2(word.value + 1) * 9)}
    />
  </>
)}


        </div>
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
    flexDirection: "column",
    height: "100vh", // Đảm bảo chiều cao toàn bộ viewport
    width: "100vw",
    overflow: "hidden",
  },
  chartContainer: {
    flex: 1, // Cho phép mở rộng chiều cao tối đa
    overflowY: "hidden",
    padding: "10px 20px 50px", // thêm padding dưới để tránh che nội dung cuối
    boxSizing: "border-box",
  },
  wordGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
    marginTop: "8px",
  },
  wordItem: {
    fontFamily: "Roboto",
    fontSize: "14px",
    padding: "4px 8px",
    backgroundColor: "#f3f3f3",
    borderRadius: "4px",
  }
};
