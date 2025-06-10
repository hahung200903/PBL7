import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const categories = ["AI", "Bussiness Analyst", "Devops", "Human Resource", "Project Manage", "Software Engineer", "Tester", "UX_UI"];

export default function Dashboard() {
  const [resumeCounts, setResumeCounts] = useState([]);
  const [processedCounts, setProcessedCounts] = useState([]);
  const [wordClouds, setWordClouds] = useState({});
  const [vocabularies, setVocabularies] = useState({ role: [], experience: [], skills: [] });
  const [selectedCategory, setSelectedCategory] = useState('AI');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Mock data thay cho API
    setResumeCounts(categories.map(cat => ({ category: cat, count: Math.floor(Math.random() * 100 + 20) })));
    setProcessedCounts(categories.map(cat => ({ category: cat, before: Math.floor(Math.random() * 100 + 50), after: Math.floor(Math.random() * 70 + 20) })));
    setWordClouds(
      Object.fromEntries(
        categories.map(cat => [cat, {
          role: `https://via.placeholder.com/150?text=${cat}+Role`,
          experience: `https://via.placeholder.com/150?text=${cat}+Experience`,
          skills: `https://via.placeholder.com/150?text=${cat}+Skills`
        }])
      )
    );
    setVocabularies({
      role: Array.from({ length: 50 }, (_, i) => `Role${i + 1}`),
      experience: Array.from({ length: 40 }, (_, i) => `Exp${i + 1}`),
      skills: Array.from({ length: 60 }, (_, i) => `Skill${i + 1}`)
    });
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleImport = () => {
    // Mock import function
    console.log(`Importing ${file?.name} into category ${selectedCategory}`);
  };

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h4">Resume Dashboard</Typography>

      {/* Import PDF */}
      <Card>
        <CardContent>
          <Typography variant="h6">Import Resume PDF</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                  {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" onClick={handleImport}>Import</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Resume counts per category */}
      <Card>
        <CardContent>
        <Typography variant="h6">Resume Count Per Category (Before Processing)</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resumeCounts}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resume counts before and after processing */}
      <Card>
        <CardContent>
          <Typography variant="h6">Resume Count Before and After Processing</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedCounts}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="before" fill="#82ca9d" />
              <Bar dataKey="after" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vocabulary summary */}
      <Card>
        <CardContent>
          <Typography variant="h6">Vocabulary Size (Role, Skills, Experience)</Typography>
          <Grid container spacing={2}>
            {['role', 'skills', 'experience'].map(type => (
              <Grid item xs={4} key={type}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">{type.toUpperCase()}</Typography>
                    <Typography variant="h5">{vocabularies[type]?.length || 0}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Word Clouds */}
      <Card>
        <CardContent>
          <Typography variant="h6">Word Clouds</Typography>
          <Grid container spacing={4}>
            {categories.map(cat => (
              ['role', 'experience', 'skills'].map(field => (
                <Grid item xs={4} key={cat + field}>
                  <Typography variant="subtitle2">{cat} - {field}</Typography>
                  <img src={wordClouds[cat]?.[field]} alt={`${cat}-${field}`} style={{ width: '100%' }} />
                </Grid>
              ))
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}