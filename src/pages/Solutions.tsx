import React from 'react';
import { motion } from 'framer-motion';
import '../styles/pages/Solutions.scss';

const Solutions = () => {
  const solutions = [
    {
      id: 1,
      title: '农业溯源解决方案',
      description: '基于区块链技术的农产品全流程溯源系统，实现从种植、采摘到销售的全链条信息记录与查询，保障食品安全，提升品牌价值。',
      icon: '/images/solution-agri.svg',
      features: [
        '产地环境信息记录',
        '种植过程管理',
        '采摘信息实时上链',
        '物流信息跟踪',
        '终端扫码查询'
      ]
    },
    {
      id: 2,
      title: '大闸蟹产业链管理',
      description: '针对大闸蟹行业特点定制开发的一体化管理平台，覆盖养殖、加工、物流、销售等环节，实现产业链数字化升级与价值提升。',
      icon: '/images/solution-crab.svg',
      features: [
        '养殖环境监测',
        '生长周期管理',
        '加工流程溯源',
        '防伪溯源码生成',
        '经销商管理系统',
        '消费者互动平台'
      ]
    },
    {
      id: 3,
      title: '物联网仓储解决方案',
      description: '结合物联网感知技术与区块链存储技术，打造智能化仓储管理系统，实现货物的自动化管理与全程可信监控。',
      icon: '/images/solution-warehouse.svg',
      features: [
        '环境智能监测',
        '货物自动盘点',
        '入库出库管理',
        '温湿度异常预警',
        '库存自动分析'
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
    <div className="solutions-page">
      {/* 头部标题区 */}
      <section className="hero-section">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            行业解决方案
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            我们针对不同行业特点，提供定制化的区块链溯源与供应链管理解决方案，
            帮助企业实现数字化转型，提升运营效率与品牌价值
          </motion.p>
        </div>
      </section>

      {/* 解决方案列表 */}
      <section className="solutions-section">
        <div className="container">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className="solution-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="icon">
                <img src={solution.icon} alt={solution.title} />
              </div>
              <div className="content">
                <h2>{solution.title}</h2>
                <p className="description">{solution.description}</p>
                <div className="features">
                  <h3>主要功能</h3>
                  <ul>
                    {solution.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-primary">了解详情</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 联系咨询区 */}
      <section className="contact-section">
        <div className="container">
          <div className="content">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              需要定制化解决方案？
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              我们的专业团队可根据您的具体需求，提供个性化的解决方案
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <button className="btn btn-primary">联系咨询</button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions; 