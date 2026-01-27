import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 기본 CSS
import "./index.css";

// 🔽 추가
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-design-system-react.min.css";

createRoot(document.getElementById('root')).render(
   <StrictMode>
     <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
)
