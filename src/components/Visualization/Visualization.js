import React, { useState } from 'react';
import Select from 'react-select';
import './Visualization.css';
import ExcelFile from '../graphs/ExcelData';
import ExcelFile2 from '../graphs/ExcelData2';
import ExcelFile3 from '../graphs/ExcelData3';
import Navbar from '../Navbar/Navbar';
import BarFile from '../graphs/BarGraph';
import BarFile2 from '../graphs/BarGraph2';
import BarFile3 from '../graphs/BarGraph3';
import PieChart1 from '../graphs/PieChart1';
import PieChart2 from '../graphs/PieChart2';
import LineGraph from '../graphs/LineGraph';
import LineGraph2 from '../graphs/LIneGraph2';
import LineGraph3 from '../graphs/LineGraph3';

const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #ced4da',
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : null,
      color: state.isFocused ? 'white' : 'black', // Set text color to white when focused
      width: '120px', // Set the width to 120px
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
    menu: (provided) => ({
      ...provided,
      width: '120px', // Set the width of the dropdown menu when expanded
    }),
  };
  
  

const Visualization = () => {
  const [selectedScope, setSelectedScope] = useState('scope1');
  const [selectedView, setSelectedView] = useState('sheet');

  const renderExcelData = () => {
    switch (selectedScope) {
      case 'scope1':
        return <ExcelFile />;
      case 'scope2':
        return <ExcelFile2 />;
      case 'scope3':
        return <ExcelFile3 />;  
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
      case 'scope3':
        return <BarFile3 />;  
      default:
        return <BarFile />;
    }
  };

  const renderPieChart = () => {
    switch (selectedScope) {
      case 'scope1':
        return <PieChart1 />;
      case 'scope2':
        return <PieChart2 />;
      default:
        return <PieChart1 />;
    }
  };

  const renderLineGraph = () => {
    switch (selectedScope) {
      case 'scope1':
        return <LineGraph />;
      case 'scope2':
        // Add your specific component for scope2 if needed
        return <LineGraph2 />;
      case 'scope3':
        return <LineGraph3 />;  
      default:
        return <LineGraph />;
    }
  };

  const renderView = () => {
    switch (selectedView) {
      case 'sheet':
        return renderExcelData();
      case 'bar':
        return renderBarGraph();
      case 'area':
        return renderPieChart();
      case 'line':
        return renderLineGraph();
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
              <Select
                id="scopeSelect"
                value={{ value: selectedScope, label: selectedScope }}
                onChange={(selectedOption) => setSelectedScope(selectedOption.value)}
                options={[
                  { value: 'scope1', label: 'Scope 1' },
                  { value: 'scope2', label: 'Scope 2' },
                  { value: 'scope3', label: 'Scope 3' },

                  // ... other scopes as needed ...
                ]}
                styles={customStyles}
              />
            </div>
            <div className="view-options">
              <label htmlFor="viewSelect">Select View: </label>
              <Select
                id="viewSelect"
                value={{ value: selectedView, label: selectedView }}
                onChange={(selectedOption) => setSelectedView(selectedOption.value)}
                options={[
                  { value: 'sheet', label: 'Sheet' },
                  { value: 'bar', label: 'Bar Graph' },
                  { value: 'area', label: 'Area Chart' },
                  { value: 'line', label: 'Line Graph' },
                ]}
                styles={customStyles}
              />
            </div>
          </div>
        </div>

        <div className="graph">{renderView()}</div>
      </div>
    </div>
  );
};

export default Visualization;
