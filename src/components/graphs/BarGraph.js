import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import excelFile from './EmissionsData.xlsx';
import './BarGraph.css';

const getMonthName = (monthNumber) => {
  const monthNames = [
    'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
  ];
  return monthNames[parseInt(monthNumber, 10) - 1];
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #ced4da',
    borderRadius: '4px',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : null,
    color: state.isFocused ? 'white' : 'black', // Set text color to white when focused
    width: '120px', // Adjust width as needed
  }),
  
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#00b15c' : null, // Highlight on hover
    color: state.isFocused ? 'white' : 'black', // Set text color to white only within the dropdown when focused
    ':hover': {
      backgroundColor: '#00b15c',
      color: 'white',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black', // Set the color of the selected value
  }),
};

const BarGraph = ({ selectedScope }) => {
  const [graphData, setGraphData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    fetchData(selectedYear, selectedCategory);
  }, [selectedScope, selectedYear, selectedCategory]);

  const fetchData = async (year, category) => {
    try {
      const response = await fetch(excelFile);
      const arrayBuffer = await response.arrayBuffer();
      const fileData = new Uint8Array(arrayBuffer);

      const workbook = XLSX.read(fileData, { type: 'array' });
      const sheetNames = workbook.SheetNames;

      const sheetIndex = 0;
      const selectedSheetName = sheetNames[sheetIndex];

      const worksheet = workbook.Sheets[selectedSheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      setParsedData(sheetData);

      const monthVsEmission = {};

      sheetData.forEach((row) => {
        const date = row['Date'];
        const yearFromData = date.split('/')[2];
        const rowCategory = row['Category'].trim();

        if (
          (year === 'All' || yearFromData === year) &&
          (category === 'All' || rowCategory === category)
        ) {
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

      const formattedData = sortedMonths.map((month) => ({
        month: getMonthName(month),
        emissions: monthVsEmission[month],
      }));

      setGraphData(formattedData);
    } catch (error) {
      console.error('Error fetching or processing graph data:', error);
    }
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  const uniqueCategories = Array.from(new Set(parsedData.map((row) => row['Category'].trim())));

  return (
    <div className="bar-graph">
      <div className="head-graph">
        <h2>
          Emission data for {selectedYear === 'All' ? 'All Years' : selectedYear}
          {selectedCategory !== 'All' && ` for ${selectedCategory}`}
        </h2>
        <div className="year-selector">
          <label htmlFor="year">Year: </label>
          <Select
            id="year"
            value={{ value: selectedYear, label: selectedYear }}
            onChange={handleYearChange}
            options={[
              { value: 'All', label: 'All Years' },
              { value: '2020', label: '2020' },
              { value: '2021', label: '2021' },
              { value: '2022', label: '2022' },
              { value: '2023', label: '2023' },
            ]}
            styles={customStyles}
          />
        </div>
        <div className="category-selector">
          <label htmlFor="category">Category: </label>
          <Select
            id="category"
            value={{ value: selectedCategory, label: selectedCategory }}
            onChange={handleCategoryChange}
            options={[
              { value: 'All', label: 'All Categories' },
              ...uniqueCategories.map((category) => ({ value: category, label: category })),
            ]}
            styles={customStyles}
          />
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

export default BarGraph;
