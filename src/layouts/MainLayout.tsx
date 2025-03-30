import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/layouts/MainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // 导航菜单项
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/products', label: '产品服务' },
    { path: '/news', label: '新闻动态' },
    { path: '/about', label: '关于我们' },
  ];
  
  // 处理滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 关闭移动菜单
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  // 切换移动菜单
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="main-layout">
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link to="/" className="logo">
            <img src="/images/logo.svg" alt="蟹联网" />
          </Link>
          
          <nav className="main-nav">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="actions">
            <Link to="/register" className="btn btn-register">注册</Link>
            <Link to="/login" className="btn btn-login">登录</Link>
            <button 
              className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`} 
              onClick={toggleMobileMenu}
              aria-label="打开菜单"
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>
      
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <main>
        {children}
      </main>
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>蟹联网产品</h3>
            <ul>
              <li><Link to="/products/platform">云码平台</Link></li>
              <li><Link to="/products/management">中国大闸蟹业务管理系统</Link></li>
              <li><Link to="/products/tracing">物联仓管理</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>关于</h3>
            <ul>
              <li><Link to="/about">使用条款</Link></li>
              <li><Link to="/privacy">隐私政策</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>联系我们</h3>
            <ul>
              <li>如需帮助，请发送邮件至：admin@hecrab.com</li>
              <li>商务合作：admin@hecrab.com</li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>公众号</h3>
            <img src="/images/qrcode.png" alt="公众号二维码" className="qr-code" />
          </div>
        </div>
        
        <div className="copyright">
          <p>苏ICP备20220302761号-1 © Copyright 江苏蟹联科技有限公司 All rights reserved | 增值电信许可证</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 