import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from './AuthPage/AuthPage';
import MainPage from './MainPage/MainPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App
