import React from "react";
import { Timeline } from "./timeline";
import Image from "./image";
import '../../styles/timeline.css';

export function TimelineDemo() {
  // 蟹联网的发展历程数据
  const data = [
    {
      year: "2018",
      title: "蟹联网成立",
      content: (
        <div>
          <p className="timeline-description">
            公司在南京成立，提出"让每一只蟹联上网"的品牌理念，开始研发河蟹溯源系统
          </p>
          <div className="timeline-image-grid">
            <Image
              src="/src/assets/images/productionPlace.svg"
              alt="蟹联网成立"
              width={500}
              height={500}
              className="timeline-image"
            />
          </div>
        </div>
      ),
    },
    {
      year: "2019",
      title: "完成首轮融资，推出溯源码产品",
      content: (
        <div>
          <p className="timeline-description">
            获得天使轮投资，成功研发并推出基于区块链技术的河蟹溯源系统，与首批10家养殖企业达成合作
          </p>
          <div className="timeline-image-grid">
            <Image
              src="/src/assets/images/brand.svg"
              alt="溯源码产品"
              width={500}
              height={500}
              className="timeline-image"
            />
          </div>
        </div>
      ),
    },
    {
      year: "2020",
      title: "产品线扩展，客户规模扩大",
      content: (
        <div>
          <p className="timeline-description">
            推出养殖管理系统和品牌营销平台，客户数量突破100家，产品溯源覆盖量超过100万只/年
          </p>
          <div className="timeline-image-grid">
            <Image
              src="/src/assets/images/electronicVouchers.svg"
              alt="产品线扩展"
              width={500}
              height={500}
              className="timeline-image"
            />
            <Image
              src="/src/assets/images/reserve.svg"
              alt="客户规模扩大"
              width={500}
              height={500}
              className="timeline-image"
            />
          </div>
        </div>
      ),
    },
    {
      year: "2021",
      title: "完成A轮融资，技术能力升级",
      content: (
        <div>
          <p className="timeline-description">
            获得A轮融资，成立物联网实验室，研发智能硬件设备，实现养殖环境实时监测与控制
          </p>
          <div className="timeline-achievements">
            <div className="achievement">✅ 物联网实验室成立</div>
            <div className="achievement">✅ 智能硬件设备研发完成</div>
            <div className="achievement">✅ 养殖环境实时监测系统上线</div>
            <div className="achievement">✅ 新增合作伙伴50家</div>
          </div>
        </div>
      ),
    },
    {
      year: "2022",
      title: "构建生态体系，行业影响力提升",
      content: (
        <div>
          <p className="timeline-description">
            推出"蟹联网生态计划"，整合供应链资源，搭建行业交流平台，成为行业标准制定参与单位
          </p>
          <div className="timeline-image-grid">
            <Image
              src="/src/assets/images/anzhuo.svg"
              alt="生态体系构建"
              width={500}
              height={500}
              className="timeline-image"
            />
          </div>
        </div>
      ),
    },
    {
      year: "2023",
      title: "全面数字化解决方案落地，业务规模新突破",
      content: (
        <div>
          <p className="timeline-description">
            发布全新升级的蟹联网平台，整合多项服务模块，客户数量突破500家，产品溯源覆盖量超过500万只/年
          </p>
          <div className="timeline-achievements">
            <div className="achievement">✅ 全新蟹联网平台发布</div>
            <div className="achievement">✅ 客户数量突破500家</div>
            <div className="achievement">✅ 产品溯源覆盖量超过500万只/年</div>
            <div className="achievement">✅ 荣获"数字农业创新企业"称号</div>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="timeline-demo">
      <Timeline data={data} />
    </div>
  );
} 