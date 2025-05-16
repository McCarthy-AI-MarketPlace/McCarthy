import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";


import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
