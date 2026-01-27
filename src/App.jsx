import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/boardlist" element={<BoardList />} />
        <Route path="/boardlist/:id" element={<BoardDetail />} />
        <Route path="/signup" element={<Agree />} />
        <Route path="/loan" element={<Loan />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App
