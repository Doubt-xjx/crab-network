import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroScene from '../components/HeroScene';
import '../styles/pages/Home.scss';

// 箭头图标组件
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
  </svg>
);

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <HeroScene />
        <div className="hero-content">
          <div className="hero-badge">
            <span>
            <img src="/images/tick.svg" alt="tick" width="16" height="16" />
              数字化养殖专家
            </span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            科学管理，让每一只蟹联上网
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            蟹联网打造在线电子卡券、物流订单、在线预约、品牌管理、产地管理、验蟹师等服务需求
          </motion.p>
          
          <motion.div
            className="download-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a href="#" className="btn btn-android">
              <img src="/images/anzhuo.svg" alt="安卓客户端" width="20" height="20" />
              <span>安卓客户端</span>
            </a>
            <a href="#" className="btn btn-ios">
              <img src="/images/ios.svg" alt="iOS客户端" width="20" height="20" />
              <span>iOS客户端</span>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Feature Cards Section */}
      <section className="feature-cards-section">
        <div className="feature-cards-container">
          <div className="feature-card">
            <h3>电子卡券</h3>
            <p>打造便捷线上卡券，随心选购，赠送领蟹电子卡券</p>
            <div className="card-icon">
              <img src="/images/electronicVouchers.svg" alt="电子卡券" />
            </div>
          </div>
          
          <div className="feature-card">
            <h3>在线预约</h3>
            <p>一键预约螃蟹采购及验蟹服务，节省时间精力</p>
            <div className="card-icon">
              <img src="/images/reserve.svg" alt="在线预约" />
            </div>
          </div>
          
          <div className="feature-card">
            <h3>品牌管理</h3>
            <p>从形象塑造到品质把控，全方位助力品牌管理</p>
            <div className="card-icon">
              <img src="/images/brand.svg" alt="品牌管理" />
            </div>
          </div>
          
          <div className="feature-card">
            <h3>产地管理</h3>
            <p>运用数字化技术，推动产地科学运营与持续发展</p>
            <div className="card-icon">
              <img src="/images/productionPlace.svg" alt="产地管理" />
            </div>
          </div>
        </div>
      </section>

      {/* 我们能做什么 Section */}
      <section className="we-can-do-section" id="services">
        <h2 className="section-title">我们能做什么</h2>
        
        {/* 产地出租 - 大卡片 */}
        <div className="service-card-main">
          <div className="service-content">
            <h3>产地出租</h3>
            <p>利用蟹联网管理后台进行科学化、数字化管理测绘产地，吸引经销商过来租用我的产地。</p>
            
            <ul className="service-features">
              <li>产地后台数据管理</li>
              <li>小程序精确化定点养殖</li>
              <li>提供产地认证</li>
              <li>打通溯源程序</li>
            </ul>
            
            <a href="#" className="more-btn">
              了解更多 <ArrowRightIcon />
            </a>
          </div>
          
          <div className="service-image skeleton"></div>
        </div>
        
        {/* 小卡片容器 */}
        <div className="service-cards-container">
          {/* 申请验蟹师吊牌 */}
          <div className="service-card">
            <div className="service-card-image skeleton"></div>
            <h3>申请验蟹师吊牌</h3>
            <p>完成验蟹师注册认证，同经销商达成合作进行螃蟹的质量检测。</p>
            <a href="#" className="more-btn">
              了解更多 <ArrowRightIcon />
            </a>
          </div>
          
          {/* 购买溯源卡扣 */}
          <div className="service-card">
            <div className="service-card-image skeleton"></div>
            <h3>购买溯源卡扣</h3>
            <p>消费者扫描溯源卡扣，诚三码合一，正宗品牌认证优质好蟹。</p>
            <p className="note">(暂支持固城湖螃蟹品牌认证)</p>
            <a href="#" className="more-btn">
              了解更多 <ArrowRightIcon />
            </a>
          </div>
          
          {/* 购买包装码 */}
          <div className="service-card">
            <div className="service-card-image skeleton"></div>
            <h3>购买包装码</h3>
            <p>品牌授权包装，一物一码，消费者完成三码合一认证，正宗品牌认证优质好蟹。</p>
            <p className="note">(暂支持固城湖螃蟹品牌认证)</p>
            <a href="#" className="more-btn">
              了解更多 <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>
      
      {/* 覆盖全流程部分 */}
      <section className="process-section">
        <div className="process-container">
          <h2 className="section-title">覆盖河蟹全流程、全场景溯源</h2>
          
          <div className="process-cards">
            <div className="process-card origin-card">
              <div className="process-card-content">
                <h3>产地码</h3>
                <p>标记螃蟹产地位置、面积等信息。</p>
              </div>
              <div className="process-card-image skeleton"></div>
            </div>
            
            <div className="process-card trace-card">
              <div className="process-card-image skeleton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div className="process-card-content">
                <h3>追溯码</h3>
                <p>依标准核发，查验螃蟹真实身份</p>
              </div>
            </div>
            
            <div className="process-card flow-card">
              <div className="process-card-image skeleton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
                </svg>
              </div>
              <div className="process-card-content">
                <h3>流通码</h3>
                <p>用于追踪螃蟹物流全过程</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 反馈表单部分 */}
      <section className="feedback-section" id="contact">
        {/* ... existing code ... */}
      </section>
    </div>
  );
};

export default Home; 