import React from 'react';
import './Visualization.css';
import Graph from '../graphs/Graph';

const Visualization = () => {
  return (
    <div className="visualization">

       <div className="visualization-nav">
          <span>Emissions Overview</span>
          <span>Scope 1</span>
          <span>Scope 2</span>
          <span>Scope 3</span>
          <div className="underline"></div>
        </div>

      <div className= "visual-box">

            <div className="visualization-header">
                <div className="emissions-info">
                <h2>Emissions</h2>
                <p>Reporting Period: January - December 2023</p>
                <p>Amount: ----- m2CO2e</p>
                <div className="scope-options">
                    <label htmlFor="scopeSelect">Select Scope:</label>
                    <select name="scopeSelect" id="scopeSelect">
                    <option value="scope1">Scope 1</option>
                    <option value="scope2">Scope 2</option>
                    <option value="scope3">Scope 3</option>
                    </select>
                </div>
                </div>
            </div>

            <div className="graph">
                 <Graph /> 
            </div>
      </div>

    </div>
  );
}

export default Visualization;
