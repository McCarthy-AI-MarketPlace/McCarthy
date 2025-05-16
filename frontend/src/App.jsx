<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";


import Header from "./components/Header";
=======
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Landing from './pages/Landing';
import Tools from './pages/Tools';
import Support from './pages/Support';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
// <<<<<<< master
// =======

// // Wrapper to access location and conditionally render Header
// function AppWrapper() {
//   const location = useLocation();
//   const noHeaderRoutes = ['/signin', '/signup'];

//   const showHeader = !noHeaderRoutes.includes(location.pathname.toLowerCase());
// >>>>>>> master
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42

  return (
<<<<<<< HEAD
    <Router>
      <Header />

=======
// <<<<<<< master
//     <Router>
//       <Header />
// =======
//     <>
//       {showHeader && <Header />}
// >>>>>>> master
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
<<<<<<< HEAD
      <Footer />
=======
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
    </Router>
  );
}

export default App;
