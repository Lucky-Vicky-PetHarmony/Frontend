import React from "react";
import './common.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./main/components/Main";
import LoginModal from "./login/components/LoginModal";
import JoinModal from "./join/components/JoinModal";
import FindAccount from "./login/components/find/FindAccount";
import BoardList from './board/component/boardList/BoardList';
import BoardView from './board/component/boardView/BoardView';
import BoardPost from "./board/component/BoardPost/BoardPost";
import Oauth from "./login/components/Oauth";
import MyPage from "./mypage/components/MyPage";
import Layout from "./layout/Layout";
import Adoption from "./ adoption/components/Adoption";
import Matching from "./matching/components/Matching";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/join" element={<JoinModal />} />
          <Route path="/find-account" element={<FindAccount />} />
          <Route path="/oauth" element={<Oauth />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/board/view/:boardId" element={<BoardView />} />
          <Route path="/board/post" element={<BoardPost />} />
          <Route path="/board/edit-post" element={<BoardPost />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/matching" element={<Matching />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
