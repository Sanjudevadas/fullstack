import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    
    </div>
  );
}

export default App;
