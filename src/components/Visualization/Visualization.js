// import React, { useState } from 'react';
// import './Visualization.css';
// import ExcelFile from '../graphs/ExcelData';
// import ExcelFile2 from '../graphs/ExcelData2';
// import Navbar from '../Navbar/Navbar';

// const Visualization = () => {
//   const [selectedScope, setSelectedScope] = useState('scope1');
//   const [selectedView, setSelectedView] = useState('sheet');

//   const renderExcelData = () => {
//     switch (selectedScope) {
//       case 'scope1':
//         return <ExcelFile />;
//       case 'scope2':
//         return <ExcelFile2 />;
//       default:
//         return <ExcelFile />;
//     }
//   };

//   const renderView = () => {
//     switch (selectedView) {
//       case 'sheet':
//         return renderExcelData();
//       case 'bar':
//         // Return bar graph component
//         return <div>Bar Graph</div>;
//       case 'area':
//         // Return area chart component
//         return <div>Area Chart</div>;
//       case 'line':
//         // Return line graph component
//         return <div>Line Graph</div>;
//       default:
//         return renderExcelData();
//     }
//   };

//   return (
//     <div className="visualization">
//       <div className="visualization-nav">
//         <span>Emissions Overview</span>
//         <span>Scope 1</span>
//         <span>Scope 2</span>
//         <span>Scope 3</span>
//         <div className="underline"></div>
//       </div>

//       <div className="visual-box">
//         <div className="visualization-header">
//           <div className="emissions-info">
//             <h2>Emissions</h2>
//             <p>Reporting Period: January - December 2023</p>
//             <p>Amount: ----- m2CO2e</p>
//             <div className="scope-options">
//               <label htmlFor="scopeSelect">Select Scope:</label>
//               <select
//                 name="scopeSelect"
//                 id="scopeSelect"
//                 value={selectedScope}
//                 onChange={(event) => setSelectedScope(event.target.value)}
//               >
//                 <option value="scope1">Scope 1</option>
//                 <option value="scope2">Scope 2</option>
//                 {/* ... other scopes as needed ... */}
//               </select>
//             </div>
//             <div className="view-options">
//               <label htmlFor="viewSelect">Select View: </label>
//               <select
//                 name="viewSelect"
//                 id="viewSelect"
//                 value={selectedView}
//                 onChange={(event) => setSelectedView(event.target.value)}
//               >
//                 <option value="sheet">Sheet</option>
//                 <option value="bar">Bar Graph</option>
//                 <option value="area">Area Chart</option>
//                 <option value="line">Line Graph</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="graph">
//           {renderView()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Visualization;

import React, { useState } from 'react';
import './Visualization.css';
import ExcelFile from '../graphs/ExcelData';
import ExcelFile2 from '../graphs/ExcelData2';
import Navbar from '../Navbar/Navbar';
import BarFile from '../graphs/BarGraph'; // Import your BarGraph components
import BarFile2 from '../graphs/BarGraph2'; // Import your BarGraph components

const Visualization = () => {
  const [selectedScope, setSelectedScope] = useState('scope1');
  const [selectedView, setSelectedView] = useState('sheet');

  const renderExcelData = () => {
    switch (selectedScope) {
      case 'scope1':
        return <ExcelFile />;
      case 'scope2':
        return <ExcelFile2 />;
      default:
        return <ExcelFile />;
    }
  };

  const renderBarGraph = () => {
    switch (selectedScope) {
      case 'scope1':
        return <BarFile />;
      case 'scope2':
        return <BarFile2 />;
      default:
        return <BarFile />;
    }
  };

  const renderView = () => {
    switch (selectedView) {
      case 'sheet':
        return renderExcelData();
      case 'bar':
        return renderBarGraph();
      case 'area':
        return <div>Area Chart</div>;
      case 'line':
        return <div>Line Graph</div>;
      default:
        return renderExcelData();
    }
  };

  return (
    <div className="visualization">
      <div className="visualization-nav">
        <span>Emissions Overview</span>
        <span>Scope 1</span>
        <span>Scope 2</span>
        <span>Scope 3</span>
        <div className="underline"></div>
      </div>

      <div className="visual-box">
        <div className="visualization-header">
          <div className="emissions-info">
            <h2>Emissions</h2>
            <p>Reporting Period: January - December 2023</p>
            <p>Amount: ----- m2CO2e</p>
            <div className="scope-options">
              <label htmlFor="scopeSelect">Select Scope:</label>
              <select
                name="scopeSelect"
                id="scopeSelect"
                value={selectedScope}
                onChange={(event) => setSelectedScope(event.target.value)}
              >
                <option value="scope1">Scope 1</option>
                <option value="scope2">Scope 2</option>
                {/* ... other scopes as needed ... */}
              </select>
            </div>
            <div className="view-options">
              <label htmlFor="viewSelect">Select View: </label>
              <select
                name="viewSelect"
                id="viewSelect"
                value={selectedView}
                onChange={(event) => setSelectedView(event.target.value)}
              >
                <option value="sheet">Sheet</option>
                <option value="bar">Bar Graph</option>
                <option value="area">Area Chart</option>
                <option value="line">Line Graph</option>
              </select>
            </div>
          </div>
        </div>

        <div className="graph">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Visualization;
