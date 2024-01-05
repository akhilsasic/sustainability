// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import './BarGraph.css'; // Import the CSS file
// import * as XLSX from 'xlsx';
// import excelFile from '../graphs/emission data.xlsx'; // Import your Excel file

// const BarGraph = ({ selectedScope }) => {
//   const [graphData, setGraphData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(excelFile);
//         const arrayBuffer = await response.arrayBuffer();
//         const data = new Uint8Array(arrayBuffer);

//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
//         const worksheet = workbook.Sheets[sheetName];
//         const parsedData = XLSX.utils.sheet_to_json(worksheet);

//         console.log('Parsed Data:', parsedData);

//         // Extracting year and emission values based on the selected scope
//         const yearVsEmission = {};

//         parsedData.forEach(row => {
//           const scope = row['Scope '];
//           const category = row['Category'];
//           const date = row['Date'];
//           const emissions = parseFloat(row['GHG Emissions']); // Assuming GHG Emissions column contains numerical values

//           console.log('Scope:', scope);
//           console.log('Category:', category);
//           console.log('Date:', date);
//           console.log('Emissions:', emissions);

//           if (scope === selectedScope) {
//             const year = new Date(date).getFullYear().toString();

//             if (!yearVsEmission[year]) {
//               yearVsEmission[year] = emissions;
//             } else {
//               yearVsEmission[year] += emissions;
//             }
//           }
//         });

//         console.log('Year vs Emission:', yearVsEmission);

//         const labels = Object.keys(yearVsEmission);
//         const dataValues = Object.values(yearVsEmission);

//         const graphData = {
//           labels: labels,
//           datasets: [
//             {
//               label: `Emission for ${selectedScope}`,
//               backgroundColor: 'rgba(75,192,192,0.4)',
//               borderColor: 'rgba(75,192,192,1)',
//               borderWidth: 1,
//               hoverBackgroundColor: 'rgba(75,192,192,0.6)',
//               hoverBorderColor: 'rgba(75,192,192,1)',
//               data: dataValues,
//             },
//           ],
//         };

//         console.log('Graph Data:', graphData);

//         setGraphData(graphData);
//       } catch (error) {
//         console.error('Error fetching or processing graph data:', error);
//       }
//     };

//     fetchData();
//   }, [selectedScope]);

//   return (
//     <div className="bar-graph">
//       <h2>Year vs Emission Bar Graph for {selectedScope}</h2>
//       <div className="graph-container">
//         <Bar
//           data={graphData}
//           options={{
//             maintainAspectRatio: false,
//             scales: {
//               yAxes: [{
//                 ticks: {
//                   beginAtZero: true,
//                 },
//               }],
//             },
//           }}
//         />
        
//       </div>
//     </div>
//   );
// };

// export default BarGraph;


import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarGraph.css'; // Import the CSS file
import * as XLSX from 'xlsx';
import excelFile from '../graphs/emission data.xlsx'; // Import your Excel file

const BarGraph = ({ selectedScope }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(excelFile);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);

        console.log('Parsed Data:', parsedData);

        // Extracting year and emission values based on the selected scope
        const yearVsEmission = {};

        parsedData.forEach(row => {
          const scope = row['Scope '];
          const date = new Date(row['Date']);
          const emissions = parseFloat(row['GHG Emissions']); // Assuming GHG Emissions column contains numerical values

          console.log('Scope:', scope);
          console.log('Date:', date);
          console.log('Emissions:', emissions);

          if (scope === selectedScope) {
            const year = date.getFullYear().toString();

            if (!yearVsEmission[year]) {
              yearVsEmission[year] = emissions;
            } else {
              yearVsEmission[year] += emissions;
            }
          }
        });

        console.log('Year vs Emission:', yearVsEmission);

        const formattedData = Object.keys(yearVsEmission).map(year => ({
          year,
          emissions: yearVsEmission[year],
        }));

        console.log('Formatted Data:', formattedData);

        setGraphData(formattedData);
      } catch (error) {
        console.error('Error fetching or processing graph data:', error);
      }
    };

    fetchData();
  }, [selectedScope]);

  return (
    <div className="bar-graph">
      <h2>Year vs Emission Bar Graph for {selectedScope}</h2>
      <div className="graph-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graphData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="emissions"
              name={`Emission for ${selectedScope}`}
              fill="rgba(75,192,192,0.4)"
              stroke="rgba(75,192,192,1)"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarGraph;
