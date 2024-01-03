import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';

const Graph = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const file = '../graphs/emission data.xlsx'; // Replace with the correct path
        const workbook = XLSX.readFile(file);

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const filteredData = parsedData.filter(
          (row) => row[3]?.split('/')[2] === '2021'
        );

        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data from Excel file:', error);
        // Handle the error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const months = data.map((row) => row[3]?.split('/')[1]);
  const emissions = data.map((row) => parseFloat(row[2]));

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'GHG Emission',
        data: emissions,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Graph - Month vs GHG Emission (Year: 2021)</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Graph;
