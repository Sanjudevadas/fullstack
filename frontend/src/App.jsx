import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Jobs from "./components/Jobs";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-tr from-indigo-100 via-sky-100 to-rose-100 font-[system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif]">
        <Header />
        <main className="flex-grow mt-24 px-4">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRole="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
