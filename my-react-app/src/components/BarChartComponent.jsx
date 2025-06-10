// BarChartComponent.js
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';

// Hàm sinh màu ngẫu nhiên
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const BarChartComponent = ({ data }) => {
  // Gán màu cho mỗi entry
  const coloredData = data.map(entry => ({
    ...entry,
    fill: getRandomColor()
  }));

  return (
    <BarChart width={500} height={300} data={coloredData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value) => [`value: ${value}`]} />
      <Legend />
      <Bar dataKey="value">
        {coloredData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarChartComponent;
