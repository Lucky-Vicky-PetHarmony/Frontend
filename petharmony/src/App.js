import React, { useEffect } from "react";
import './common.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import useModalStore from "./store/useModalStore";
import Main from "./main/components/Main";
import LoginModal from "./login/components/LoginModal";
import JoinModal from "./join/components/JoinModal";
import FindAccount from "./login/components/find/FindAccount";
import BoardList from './board/components/boardList/BoardList';
import BoardView from './board/components/boardView/BoardView';
import BoardPost from "./board/components/BoardPost/BoardPost";
import Oauth from "./login/components/Oauth";
import MyPage from "./mypage/components/MyPage";
import Layout from "./layout/Layout";
import Adoption from "./adoption/components/Adoption";
import Matching from "./matching/components/Matching";
import ReportList from "./admin/components/ReportList";

function App() {
  const login = useAuthStore((state) => state.login);
  const activeModal = useModalStore((state) => state.activeModal);
  const findAccountMode = useModalStore((state) => state.findAccountMode);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    if (token && email && name && role) {
      login(token, email, name, role);
    }
  }, [login]);

  return (
    <Router>
      <Layout>
        {activeModal === 'login' && <LoginModal />}
        {activeModal === 'join' && <JoinModal />}
        {activeModal === 'findAccount' && <FindAccount mode={findAccountMode} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/oauth" element={<Oauth />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/board/view/:boardId" element={<BoardView />} />
          <Route path="/board/post" element={<BoardPost />} />
          <Route path="/board/edit-post" element={<BoardPost />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/admin/report" element={<ReportList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
