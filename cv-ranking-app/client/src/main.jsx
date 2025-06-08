import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import EditPage from './pages/EditPage';
import RankingPage from './pages/RankingPage';
import SettingPage from './pages/SettingPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/edit/:sessionId" element={<EditPage />} />
        <Route path="/ranking/:sessionId" element={<RankingPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
