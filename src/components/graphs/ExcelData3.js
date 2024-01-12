import React, { useState, useEffect } from 'react';
import './ExcelData.css'; // Import the CSS file
import * as XLSX from 'xlsx';
import excelFile from './EmissionsData.xlsx'; // Import the Excel file

const ExcelData3 = () => {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const readFile = async () => {
      try {
        const response = await fetch(excelFile);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[2];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Filtering out empty rows
        const filteredData = parsedData.filter(row =>
          Object.values(row).some(cell => cell !== '')
        );

        setExcelData(filteredData);
      } catch (error) {
        console.error('Error fetching or parsing Excel file:', error);
      }
    };

    readFile(); // Call the function to read the Excel file
  }, []);

  return (
    <div className="parsed-excel-data">
      <h3>Emission Data</h3>
      <ul>
        {excelData.map((row, index) => (
          <li className="table-row" key={index}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`col col-${cellIndex + 1}`} data-label={`Column ${cellIndex + 1}`}>{cell}</div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExcelData3;
