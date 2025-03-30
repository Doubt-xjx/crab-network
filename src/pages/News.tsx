import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages/News.scss';

// 定义新闻文章的类型
interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
}

const News = () => {
  // 新闻分类
  const categories = ['全部', '公司动态', '行业资讯', '技术文章', '产品更新'];
  
  // 新闻文章数据
  const articles: NewsArticle[] = [
    {
      id: 1,
      title: '蟹联网完成1000万元A轮融资，加速区块链溯源技术研发',
      summary: '近日，蟹联网宣布完成1000万元A轮融资，本轮融资由某知名风投领投，多家行业投资机构跟投。蟹联网表示，本轮融资将主要用于区块链溯源技术研发和市场拓展。',
      date: '2023-06-15',
      category: '公司动态',
      image: '/images/news1.jpg'
    },
    {
      id: 2,
      title: '蟹联网与江苏省淡水水产研究所达成战略合作',
      summary: '日前，蟹联网与江苏省淡水水产研究所签署战略合作协议，双方将在大闸蟹养殖技术、数字化管理等方面展开深入合作，共同推动大闸蟹产业升级。',
      date: '2023-05-20',
      category: '公司动态',
      image: '/images/news2.jpg'
    },
    {
      id: 3,
      title: '区块链技术在食品溯源中的应用与挑战',
      summary: '区块链技术因其去中心化、不可篡改的特性，正逐渐成为食品溯源领域的重要技术支撑。本文深入分析了区块链技术在食品溯源中的应用场景、实施难点及未来发展趋势。',
      date: '2023-04-10',
      category: '技术文章',
      image: '/images/news3.jpg'
    },
    {
      id: 4,
      title: '蟹联网溯源平台2.0版本发布，新增AI识别功能',
      summary: '蟹联网溯源平台2.0版本正式发布，新版本新增AI图像识别功能，可自动识别大闸蟹品种和规格，提高溯源效率和准确性。同时，平台用户界面进行了全面优化，提升了用户体验。',
      date: '2023-03-05',
      category: '产品更新',
      image: '/images/news4.jpg'
    },
    {
      id: 5,
      title: '《食品安全法实施条例》修订版实施，溯源成为重点',
      summary: '近日，新修订的《食品安全法实施条例》正式实施，新条例进一步强化了食品溯源管理要求，明确食品生产经营者应当建立食品安全追溯体系，实现食品来源可查、去向可追。',
      date: '2023-02-15',
      category: '行业资讯',
      image: '/images/news5.jpg'
    },
    {
      id: 6,
      title: '物联网技术在水产养殖中的创新应用',
      summary: '随着物联网技术的发展，智能化养殖正成为水产业的新趋势。本文介绍了物联网技术在水质监测、饵料投放、疾病预警等方面的创新应用，以及与区块链技术的融合发展前景。',
      date: '2023-01-20',
      category: '技术文章',
      image: '/images/news6.jpg'
    }
  ];
  
  // 状态管理
  const [activeCategory, setActiveCategory] = useState('全部');
  
  // 根据分类筛选文章
  const filteredArticles = activeCategory === '全部' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);
  
  // 动画效果
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="news-page">
      <div className="page-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            新闻资讯
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            了解蟹联网最新动态、行业资讯和技术趋势
          </motion.p>
        </div>
      </div>
      
      <div className="news-container">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <motion.div 
          className="articles-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredArticles.map(article => (
            <motion.div 
              key={article.id} 
              className="article-card"
              variants={itemVariants}
            >
              <div className="article-image">
                <img src={article.image} alt={article.title} />
                <div className="article-category">{article.category}</div>
              </div>
              <div className="article-content">
                <div className="article-date">{article.date}</div>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <button className="read-more-btn">阅读全文</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn next">下一页</button>
        </div>
      </div>
      
      <div className="newsletter-section">
        <div className="container">
          <motion.div 
            className="newsletter-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>订阅我们的通讯</h2>
            <p>定期获取最新的行业资讯、技术趋势和产品更新</p>
            <div className="subscribe-form">
              <input type="email" placeholder="您的邮箱地址" />
              <button className="btn btn-primary">订阅</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default News; 