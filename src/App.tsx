import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IMT_HeaderComponent from "./components/IMT_HeaderComponent";
import Home from "./pages/Home";
import { PortalUpdates } from "./pages/PortalUpdates";
import { ReleaseNotes } from "./pages/ReleaseNotes";

const App: React.FC = () => {
    return (
      <Router>
        <IMT_HeaderComponent />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portal-updates" element={<PortalUpdates />} />
          <Route path="/release-notes" element={<ReleaseNotes />} />
        </Routes>
      </Router>
    );
};

export default App;
