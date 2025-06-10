// components/ProcessedCountChart.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProcessedCountChart({ data }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Resume Count Before and After Processing</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="before" fill="#82ca9d" />
            <Bar dataKey="after" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
