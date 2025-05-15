import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Landing from './pages/Landing';
import Tools from './pages/Tools';
import Support from './pages/Support';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';

// Wrapper to access location and conditionally render Header
function AppWrapper() {
  const location = useLocation();
  const noHeaderRoutes = ['/signin', '/signup'];

  const showHeader = !noHeaderRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
