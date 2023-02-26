import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentPage } from './pages/content';
import { ChangePassword } from './pages/changepassword';
import { LoginPage } from './pages/login';
import { Register } from './pages/register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ContentPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
