import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginModal from "./login/components/LoginModal";
import JoinModal from "./join/components/JoinModal";
import FindAccount from "./login/components/find/FindAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginModal />} />
        <Route path="/join" element={<JoinModal />} />
        <Route path="/find-account" element={<FindAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
