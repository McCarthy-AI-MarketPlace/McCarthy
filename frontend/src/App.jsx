import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Explore from "./pages/Explore";

import Header from "./components/Header";

import React from "react";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Explore" element={<Explore />} />
      </Routes>
      <Footer />
    </Router>
  );
}
