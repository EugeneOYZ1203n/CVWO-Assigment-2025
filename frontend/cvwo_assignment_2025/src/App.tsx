import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from './AuthPage/AuthPage';
import MainPage from './MainPage/MainPage';
import { useState } from 'react';
import PrivateRoute from './AuthPage/PrivateRoute';

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [userID, setUserID] = useState<number | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage setUsername={setUsername} setUserID={setUserID} />} />
        <Route path="/" element={
          <PrivateRoute user_id={userID} username={username}>
            <MainPage user_id={userID!} username={username}/>
          </PrivateRoute>} />
      </Routes>
    </Router>
  )
}

export default App
