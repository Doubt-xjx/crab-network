import React from 'react';
import { motion } from 'framer-motion';
import '../styles/pages/Products.scss';

const Products = () => {
  const products = [
    {
      id: 1,
      name: '蟹联网云码平台',
      description: '基于区块链技术的产品溯源平台，为企业提供透明、安全、不可篡改的产品信息记录，包括产品产地、生产日期、质检报告等全生命周期数据。',
      image: '/images/product1.jpg',
      features: [
        '区块链技术保障信息真实性',
        '一物一码，全程溯源',
        '消费者扫码查询，提升品牌信任',
        '数据分析，助力企业决策'
      ]
    },
    {
      id: 2,
      name: '中国大闸蟹业务管理系统',
      description: '专为大闸蟹养殖、加工、销售企业打造的一体化管理系统，涵盖从养殖、加工到销售的全流程管理，提高生产效率，降低管理成本。',
      image: '/images/product2.jpg',
      features: [
        '养殖池塘环境监测',
        '饵料投放记录与分析',
        '生长周期管理',
        '销售订单处理',
        '库存与配送管理'
      ]
    },
    {
      id: 3,
      name: '物联仓管理',
      description: '结合物联网技术和智能设备，为仓储管理提供智能化解决方案，实现货物的自动化管理和实时监控，提高仓储效率和准确性。',
      image: '/images/product3.jpg',
      features: [
        '智能货架监控',
        '温湿度实时监测',
        '出入库自动记录',
        '库存预警',
        '物流信息对接'
      ]
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="products-page">
      <div className="hero">
        <div className="content">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            我们的产品
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            蟹联网为企业提供一系列基于区块链和物联网技术的创新解决方案，助力企业数字化转型。
          </motion.p>
        </div>
      </div>

      <div className="products-container">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="product-card"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="content">
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              <div className="features">
                <h3>主要功能</h3>
                <ul>
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-primary">了解更多</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="cta-section">
        <div className="content">
          <h2>寻找适合您企业的解决方案</h2>
          <p>无论您是大闸蟹养殖企业，还是其他食品生产商，我们都能为您提供定制化的产品溯源和管理解决方案。</p>
          <button className="btn btn-primary">联系我们获取方案</button>
        </div>
      </div>
    </div>
  );
};

export default Products; 