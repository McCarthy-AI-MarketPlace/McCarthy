import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Explore from "./pages/Explore";
import Developer from "./pages/Developer";
import Dashboard from "./pages/Dashboard";
import Publish from "./pages/PublishTools";
import MyTools from "./pages/MyTools";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import EditTool from "./components/EditTool";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToolInfo from "./pages/ToolInfo";
import ExploreTool from "./pages/ExploreTool";

export default function App() {
  return (
    <Router>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        containerClassName="custom-toast-container"
        toastClassName="custom-toast"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/edit-tool/:id" element={<EditTool />} />
        <Route path="/chatgpt" element={<ToolInfo />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
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
        <Route
          path="/my-tools/:userId"
          element={
            <PrivateRoute superAdminOnly={true}>
              <MyTools />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute superAdminOnly={true}>
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route path="/explore/:id" element={<ExploreTool />} />
      </Routes>
      <Footer />
    </Router>
  );
}
