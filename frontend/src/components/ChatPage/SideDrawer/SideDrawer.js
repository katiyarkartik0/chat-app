import React, { useState } from 'react';
import './SideDrawer.css';

const SideDrawer = ({showSideDrawer,setShowSideDrawer}) => {

  // Replace this with your actual list of people data
  const people = ['Person 1', 'Person 2', 'Person 3'];

  return (
    <div className={`side-drawer ${showSideDrawer?"open":""}`}>
      <div className="header">
        <h3>People</h3>
        <button className="close-btn" onClick={()=>setShowSideDrawer(false)}>
          &times;
        </button>
      </div>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideDrawer;
