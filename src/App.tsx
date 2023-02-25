import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentPage } from './pages/content';
import { LoginPage } from './pages/login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
