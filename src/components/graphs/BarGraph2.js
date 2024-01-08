import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import excelFile from '../graphs/emission data.xlsx'; // Import your Excel file
import './BarGraph.css'; // Import the CSS file

const getMonthName = (monthNumber) => {
  const monthNames = [
    'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
  ];
  return monthNames[parseInt(monthNumber, 10) - 1];
};

const BarGraph2 = ({ selectedScope }) => {
  const [graphData, setGraphData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2021');

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedScope, selectedYear]);

  const fetchData = async (year) => {
    try {
      const response = await fetch(excelFile);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      const workbook = XLSX.read(data, { type: 'array' });
      const sheetNames = workbook.SheetNames;
      console.log('Sheet names:', sheetNames); // Log sheet names to verify

      const sheetIndex = 1; // Assuming 'scope2' data is on the second sheet
      const selectedSheetName = sheetNames[sheetIndex];
      console.log('Selected sheet name:', selectedSheetName); // Log the selected sheet name

      const worksheet = workbook.Sheets[selectedSheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);

      console.log('Parsed data:', parsedData); // Log parsed data

      const monthVsEmission = {};

      parsedData.forEach(row => {
        const date = row['Date'];
        const yearFromData = date.split('/')[2];

        if (yearFromData === year) {
          const month = date.split('/')[1];
          const emissions = parseFloat(row['GHG Emissions']);

          const key = month.toString();

          if (!monthVsEmission[key]) {
            monthVsEmission[key] = emissions;
          } else {
            monthVsEmission[key] += emissions;
          }
        }
      });

      const sortedMonths = Object.keys(monthVsEmission).sort((a, b) => parseInt(a) - parseInt(b));

      const formattedData = sortedMonths.map(month => ({
        month: getMonthName(month),
        emissions: monthVsEmission[month],
      }));

      console.log('Formatted data:', formattedData); // Log formatted data

      setGraphData(formattedData);
    } catch (error) {
      console.error('Error fetching or processing graph data:', error);
    }
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  };

  return (
    <div className="bar-graph">
      <div className='head-graph'>
        <h2>Emission data of {selectedYear}</h2>
        <div className="year-selector">
          <label htmlFor="year">Year: </label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
      <div className="graph-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graphData}>
            <XAxis dataKey="month" textAnchor="middle" />
            <YAxis />
            <Tooltip cursor={{ fill: 'rgba(0, 177, 92, 0.15)' }} />
            <Legend />
            <Bar
              dataKey="emissions"
              name={`Total Emission`}
              fill="rgba(0, 177, 92, 0.50)"
              stroke="none"
              barCategoryGap={5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarGraph2;
