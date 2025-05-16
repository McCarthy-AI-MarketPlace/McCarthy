import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";


import Header from "./components/Header";

 import React from 'react'
import Developer from "./pages/Developer";
 
 export default function App() {
   return (
     <Router>
       <Header />

       <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/developer" element={<Developer />} />
       </Routes>
       <Footer />
     </Router>
   );
 }
  

