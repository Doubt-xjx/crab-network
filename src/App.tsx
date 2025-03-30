import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Solutions from './pages/Solutions';
import News from './pages/News';
import About from './pages/About';
import './styles/globals.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
