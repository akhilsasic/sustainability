import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import * as XLSX from 'xlsx';
import './PieChart.css'; // Import your CSS file
import excelFile from './emission data.xlsx'; // Import your Excel file

const PieChart1 = ({ selectedScope }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchDataForScope1();
  }, [selectedScope]);

  const fetchDataForScope1 = async () => {
    try {
      const response = await fetch(excelFile);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming data for scope 1 is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);

      // Processing data for scope 1
      const monthlyEmissions = {};

      parsedData.forEach(row => {
        const dateParts = row['Date'].split('/'); // Assuming 'Date' contains the date in dd/mm/yyyy format
        const monthYear = `${dateParts[1]}/${dateParts[2]}`; // Extracting month and year

        if (!monthlyEmissions[monthYear]) {
          monthlyEmissions[monthYear] = parseFloat(row['GHG Emissions']); // Assuming 'GHG Emissions' contains emission values
        } else {
          monthlyEmissions[monthYear] += parseFloat(row['GHG Emissions']);
        }
      });

      const processedData = Object.keys(monthlyEmissions).map(key => ({
        name: key, // Using month and year as the name
        value: monthlyEmissions[key], // Total emissions for that month and year
      }));

      setPieData(processedData);
    } catch (error) {
      console.error('Error fetching or processing pie chart data:', error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define colors for pie slices

  return (
    <div className="pie-chart">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart1;
