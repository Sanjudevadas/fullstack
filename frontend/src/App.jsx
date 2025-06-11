import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/login" element={<LoginForm/>} />
              <Route path="/register" element={<RegisterForm />} />

          </Routes>
          <Footer/>
        </div>
      </Router>
    
    </div>
  );
}

export default App;
