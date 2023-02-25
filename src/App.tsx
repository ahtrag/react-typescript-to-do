import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentPage } from './pages/content';
import { ForgotPassword } from './pages/forgotpassword';
import { LoginPage } from './pages/login';
import { Register } from './pages/register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ContentPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
