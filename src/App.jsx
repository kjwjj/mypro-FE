import { useState } from 'react'
import './App.css'
import Home from './componets/Home/Home'
import { Routes, Route } from "react-router-dom";
import Login from './componets/Login/Login'
import BoardList from './componets/Boards/BoardList'
import Navbar from './componets/Navbars/Navbar'
import Footer from './componets/Footers/Footer'
import NewsList from './componets/News/NewsList'
import BoardDetail from './componets/Boards/BoardDetail'
import Agree from './componets/SignUp/Agree'
import Loan from './componets/Loan/Loan'
import Service from './componets/Question/Service'

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newslist" element={<NewsList />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/boardlist/:id" element={<BoardDetail />} />
          <Route path="/signup" element={<Agree />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
