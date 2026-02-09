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

function App() {

  // Navbar 숨길 경로들
  const hideNavbarPaths = ["/login", "/signup", "/signup/form"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  // Footer 숨길 경로들
  const hideFooterPaths = ["/signup", "/signup/form"];
  const hideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!hideNavbar && <Navbar />}

      <main className="flex-fill">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newslist" element={<NewsList />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/boardlist/:id" element={<BoardDetail />} />
          <Route path="/signup" element={<Agree />} />
          <Route path="/signup/form" element={<SignUpForm />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/service" element={<Service />} />
          <Route path="/mypage" element={<MyPageForm />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
