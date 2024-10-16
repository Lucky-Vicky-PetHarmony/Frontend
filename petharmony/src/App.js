import React, { useState, useEffect } from "react";
import './common.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import useModalStore from "./store/useModalStore";
import ScrollToTop from "./common/scroll/ScrollToTop";
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
import AdoptionList from "./adoption/components/AdoptionList";
import Matching from "./matching/components/Matching";
import ReportList from "./admin/components/ReportList";
import AdoptionDetail from "./adoption/components/AdoptionDetail";
import Authority from "./common/authority/Authority";
import ProtectedRoute from "./common/authority/ProtectedRoute";
import MatchingList from "./matching/components/MatchingList";
import Loading from "./common/Loading/Loading";

function App() {
  const login = useAuthStore((state) => state.login);
  const [initialized, setInitialized] = useState(false);
  const activeModal = useModalStore((state) => state.activeModal);
  const findAccountMode = useModalStore((state) => state.findAccountMode);
  const isLogin = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    if (token && email && name && role && userId) {
      login(token, email, name, role, userId);
    }
    setInitialized(true);  // 초기화 완료 설정
  }, [login]);

  if (!initialized) {
    return <Loading />;
  }

  return (
    <Router>
      <Layout>
        {activeModal === 'login' && <LoginModal />}
        {activeModal === 'join' && <JoinModal />}
        {activeModal === 'findAccount' && <FindAccount mode={findAccountMode} />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main isLogin={isLogin} />} />
          <Route path="/oauth" element={<Oauth />} />
          <Route path="/board/list" element={<BoardList isLogin={isLogin} />} />
          <Route path="/board/view/:boardId" element={<BoardView isLogin={isLogin} />} />
          <Route path="/board/post" element={<BoardPost />} isLogin={isLogin} />
          <Route path="/board/edit-post" element={<BoardPost isLogin={isLogin} />} />
          <Route
            path="/mypage/*"
            element={
              <ProtectedRoute requiredRole="[ROLE_USER]">
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/adoption" element={<AdoptionList />} />
          <Route path="/adoption/:desertionNo" element={<AdoptionDetail />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/matching-list" element={<MatchingList />} />
          <Route path="/authority" element={<Authority />} />
          <Route
            path="/admin/report"
            element={
              <ProtectedRoute requiredRole="[ROLE_ADMIN]">
                <ReportList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
