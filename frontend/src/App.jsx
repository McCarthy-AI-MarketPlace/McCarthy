import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import Developer from "./pages/Developer";
import Dashboard from "./pages/Dashboard";
import Publish from "./pages/PublishTools";
import MyTools from "./pages/MyTools";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import EditTool from "./components/EditTool";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/edit-tool/:id" element={<EditTool />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* Admin-only routes */}
        <Route
          path="/publish"
          element={
            <PrivateRoute adminOnly={true}>
              <Publish />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-tools"
          element={
            <PrivateRoute adminOnly={true}>
              <MyTools />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
