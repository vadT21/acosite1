// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import DescriptionPage from "./pages/DescriptionPage/DescriptionPage";
import MetaCreationPage from "./pages/MetaCreationPage/MetaCreationPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import TotalPage from "./pages/TotalPage/TotalPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/description" element={<DescriptionPage />} />
          <Route path="/meta-creation" element={<MetaCreationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/total" element={<TotalPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
