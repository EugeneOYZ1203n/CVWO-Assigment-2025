import './App.css'
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import PrivateRoute from './AuthPage/PrivateRoute';
import { Spinner } from '@chakra-ui/react';

// Lazy-load components
const AuthPage = React.lazy(() => import('./AuthPage/AuthPage'));
const MainPage = React.lazy(() => import('./MainPage/MainPage'));

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [userID, setUserID] = useState<number | null>(null);

  return (
    <Router>
      <Suspense fallback={<Spinner colorPalette="teal"/>}>
      <Routes>
        <Route path="/auth" element={<AuthPage setUsername={setUsername} setUserID={setUserID} />} />
        <Route path="/" element={
          <PrivateRoute user_id={userID} username={username}>
            <MainPage user_id={userID!} username={username}/>
          </PrivateRoute>} />
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App
