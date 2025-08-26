import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ViewClaims from './pages/ViewClaims';
import ClaimDetails from './pages/ClaimDetails';
import AddClaim from './pages/AddClaim';
import EditClaim from './pages/EditClaim';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Smart Claims</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/claims" />} />
          <Route path="/claims" element={<ViewClaims />} />
          <Route path="/claims/:id" element={<ClaimDetails />} />
          <Route path="/add-claim" element={<AddClaim />} />
          <Route path="/edit-claim/:id" element={<EditClaim />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
