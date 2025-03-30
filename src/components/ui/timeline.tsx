"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  year: string;
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans timeline-container"
      ref={containerRef}
    >
      <div ref={ref} className="relative timeline-inner">
        {data.map((item, index) => (
          <div
            key={index}
            className="timeline-item"
          >
            <div className="timeline-marker">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot"></div>
            </div>
            <div className="timeline-content">
              <h3 className="timeline-title">{item.title}</h3>
              <div className="timeline-text">{item.content}</div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="timeline-line"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="timeline-progress"
          />
        </div>
      </div>
    </div>
  );
}; 