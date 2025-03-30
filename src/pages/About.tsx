import React from 'react';
import { motion } from 'framer-motion';
import { TimelineDemo } from '../components/ui/timelineDemo';
import '../styles/pages/About.scss';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: '张三',
      position: '创始人 & CEO',
      bio: '拥有15年互联网行业经验，曾任某知名科技公司技术VP。致力于将区块链技术应用于实体产业，推动传统行业数字化转型。',
      avatar: '/images/avatar1.jpg'
    },
    {
      id: 2,
      name: '李四',
      position: '技术总监',
      bio: '区块链技术专家，全栈开发工程师。曾主导多个大型分布式系统的设计与实现，对物联网与区块链的结合有深入研究。',
      avatar: '/images/avatar2.jpg'
    },
    {
      id: 3,
      name: '王五',
      position: '产品经理',
      bio: '拥有丰富的产品设计和用户体验经验，专注于打造简洁易用的企业级应用。深入了解食品行业痛点，为客户提供精准解决方案。',
      avatar: '/images/avatar3.jpg'
    },
    {
      id: 4,
      name: '赵六',
      position: '市场总监',
      bio: '市场营销专家，擅长品牌建设和渠道拓展。曾成功打造多个行业领先品牌，拥有广泛的行业资源和人脉。',
      avatar: '/images/avatar4.jpg'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="about-page">
      {/* 公司介绍部分 */}
      <section className="section intro-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>关于我们</h1>
            <p>打造透明、可信的供应链生态系统</p>
          </motion.div>
          
          <div className="intro-content">
            <motion.div 
              className="text-content"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <p>江苏蟹联科技有限公司成立于2020年，总部位于江苏南京，是一家专注于食品溯源领域的科技企业。公司致力于将区块链、物联网、人工智能等前沿技术应用于食品供应链全流程管理，为企业和消费者打造透明、安全的食品供应链生态系统。</p>
              <p>作为国内领先的食品溯源技术提供商，蟹联科技已为超过200家企业提供了数字化解决方案，覆盖大闸蟹、海鲜、禽畜、水果等多个食品品类。公司的"蟹联网"平台通过区块链技术记录食品从生产到销售的全过程数据，实现了"一物一码，全程可溯"，有效保障了食品安全，提升了品牌价值。</p>
            </motion.div>
            
            <motion.div 
              className="image-content"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <img src="/images/about-company.jpg" alt="蟹联科技办公环境" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 发展历程部分 */}
      <section className="section history-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>发展历程</h2>
            <p>蟹联科技从创立至今的重要里程碑</p>
          </motion.div>

          <TimelineDemo />
        </div>
      </section>

      {/* 企业文化部分 */}
      <section className="section culture-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>企业文化</h2>
            <p>我们的使命、愿景和核心价值观</p>
          </motion.div>
          
          <div className="culture-cards">
            <motion.div 
              className="culture-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="icon">
                <img src="/images/icon-mission.svg" alt="使命" />
              </div>
              <h3>使命</h3>
              <p>用科技连接食品供应链，让食品更安全，让消费更放心。</p>
            </motion.div>
            
            <motion.div 
              className="culture-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="icon">
                <img src="/images/icon-vision.svg" alt="愿景" />
              </div>
              <h3>愿景</h3>
              <p>成为中国领先的食品溯源科技企业，推动食品行业数字化转型。</p>
            </motion.div>
            
            <motion.div 
              className="culture-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="icon">
                <img src="/images/icon-values.svg" alt="价值观" />
              </div>
              <h3>核心价值观</h3>
              <p>诚信、创新、责任、协作、客户至上</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 团队成员部分 */}
      <section className="section team-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>核心团队</h2>
            <p>由行业资深专家组成的精英团队</p>
          </motion.div>
          
          <motion.div 
            className="team-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map(member => (
              <motion.div 
                key={member.id} 
                className="team-member"
                variants={fadeInUp}
              >
                <div className="avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="position">{member.position}</p>
                <p className="bio">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 