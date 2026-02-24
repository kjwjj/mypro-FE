import { useState } from 'react'
import './App.css'
import Home from './componets/Home/Home'
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './componets/Login/Login'
import BoardList from './componets/Boards/BoardList'
import Navbar from './componets/Navbars/Navbar'
import Footer from './componets/Footers/Footer'
import NewsList from './componets/News/NewsList'
import BoardDetail from './componets/Boards/BoardDetail'
import Agree from './componets/SignUp/Agree'
import Loan from './componets/Loan/Loan'
import Service from './componets/Question/Service'
import DashBoard from './componets/Admin/DashBoard';
import SignUpForm from './componets/SignUpForm/SingUpForm';
import MyPageForm from './componets/MyPage/MyPageForm';
import Privacy from './componets/Footers/Privacy';
import Terms from './componets/Footers/Terms';
import ScrollToTop from './componets/ScrollTop/ScrollTop';
import MapPage from './componets/Map/MapPage';
import Recommend from './componets/Recommend/Recommend';
import AddObject from './componets/Map/AddObject';
import NotFound from './componets/NotFound/NotFound';
import FindEmail from './componets/Find/FindEmail'
import FindPassWord from './componets/Find/FindPassWord'
import AddBoard from './componets/Boards/AddBoard';
import BoardEdit from './componets/Boards/BoardEdit';
import EditObject from './componets/Map/EditObject';
import ProtectedRoute from './componets/ProtectedRoute';
import UsersInfo from './componets/Admin/UsersInfo';
import ObjectInfo from './componets/Admin/ObjectInfo';
import NoticeInfo from './componets/Admin/NoticeInfo';
import MailInfo from './componets/Admin/MailInfo';

function App() {
  const location = useLocation(); // ← 여기서 가져오기

  // Navbar 숨길 경로들
  const hideNavbarPaths = ["/login",
    "/signup",
    "/signup/form",
    "/demo",
    "/dashboard",
    "/dashboard/userinfo",
    "/dashboard/objectinfo",
    "/dashboard/noticeinfo",
    "/dashboard/mailinfo"
  ];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  // Footer 숨길 경로들
  const hideFooterPaths = ["/login",
    "/signup",
    "/signup/form",
    "/demo",
    "/dashboard",
    "/dashboard/userinfo",
    "/dashboard/objectinfo",
    "/dashboard/noticeinfo",
    "/dashboard/mailinfo"
  ];
  const hideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!hideNavbar && <Navbar />}

      <main className="flex-fill">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <DashBoard />
            </ProtectedRoute>}
          />
          {/* 회원관리 */}
          <Route
            path="/dashboard/userinfo"
            element={
              <ProtectedRoute requireAdmin={true}>
                <UsersInfo />
              </ProtectedRoute>
            }
          />
          {/* 매물관리 */}
          <Route
            path="/dashboard/objectinfo"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ObjectInfo />
              </ProtectedRoute>
            }
          />
          {/* 게시글관리 */}
          <Route
            path="/dashboard/noticeinfo"
            element={
              <ProtectedRoute requireAdmin={true}>
                <NoticeInfo />
              </ProtectedRoute>
            }
          />
          {/* 문의관리 */}
          <Route
              path="/dashboard/mailinfo"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <MailInfo />
                </ProtectedRoute>
              }
            />
          <Route path="/newslist" element={<NewsList />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/addboard" element={
            <ProtectedRoute>
              <AddBoard />
            </ProtectedRoute>}
          />
          <Route path="/board/edit/:id" element={<BoardEdit />} />
          <Route path="/boardlist/:id" element={<BoardDetail />} />
          <Route path="/signup" element={<Agree />} />
          <Route path="/signup/form" element={<SignUpForm />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/service" element={<Service />} />
          <Route path="/mypage" element={
            <ProtectedRoute>
              <MyPageForm />
            </ProtectedRoute>}
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/recommend" element={
            <ProtectedRoute>
              <Recommend />
            </ProtectedRoute>}
          />
          <Route path="/addobject" element={
            <ProtectedRoute>
              <AddObject />
            </ProtectedRoute>}
          />
          <Route path="/editobject" element={
            <ProtectedRoute>
              <EditObject />
            </ProtectedRoute>} />
          <Route path="/find-id" element={<FindEmail />} />
          <Route path="/forgot-password" element={<FindPassWord />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
