import React from "react";
import './common.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginModal from "./login/components/LoginModal";
import JoinModal from "./join/components/JoinModal";
import FindAccount from "./login/components/find/FindAccount";
import BoardList from './board/component/boardList/BoardList';
import BoardView from './board/component/boardView/BoardView';
import BoardPost from "./board/component/BoardPost/BoardPost";
import Oauth from "./login/components/Oauth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/join" element={<JoinModal />} />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/boardList" element={<BoardList />} />
        <Route path="/BoardView" element={<BoardView />} />
        <Route path="/BoardPost" element={<BoardPost />} />
      </Routes>
    </Router>
  );
}

export default App;
