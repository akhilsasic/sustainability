import React, { useState, useEffect } from 'react';
import './ExcelData.css'; // Import the CSS file
import * as XLSX from 'xlsx';
import excelFile from './EmissionsData.xlsx'; // Import the Excel file

const ExcelData2 = () => {
  const [excelData, setExcelData] = useState([]);
  const [totalGHGEmissions, setTotalGHGEmissions] = useState(0);

  useEffect(() => {
    const readFile = async () => {
      try {
        const response = await fetch(excelFile);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Filtering out empty rows
        const filteredData = parsedData.filter(row =>
          Object.values(row).some(cell => cell !== '')
        );

        // Calculate the sum of total GHG Emissions (assuming it's in the 3rd column)
        const sumGHGEmissions = filteredData.reduce((sum, row) => {
          const value = parseFloat(row[2]);
          return isNaN(value) ? sum : sum + value;
        }, 0);

        setTotalGHGEmissions(sumGHGEmissions);

        setExcelData(filteredData);
      } catch (error) {
        console.error('Error fetching or parsing Excel file:', error);
      }
    };

    readFile(); // Call the function to read the Excel file
  }, []);

  return (
    <div className="parsed-excel-data">
      <div className="sheet-head">
        <h3>Emission Data</h3>
        <div>Total Emission: <span style={{ color: '#00b15c', fontWeight: '500', fontSize: '1.2em'}}>{isNaN(totalGHGEmissions) ? 0 : totalGHGEmissions}</span> mtC0<sub>2</sub>e</div>
      </div> 
      <ul>
        {excelData.map((row, index) => (
          <li className="table-row" key={index}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`col col-${cellIndex + 1}`} data-label={`Column ${cellIndex + 1}`}>
                {cell}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExcelData2;
