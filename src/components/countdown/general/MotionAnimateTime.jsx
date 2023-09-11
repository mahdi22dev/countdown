"use client";
import { motion } from "framer-motion";
import { Variants } from "../../../../variants/variants";
const MotionAnimateTime = ({ time, size }) => {
  return (
    <motion.p
      layout
      variants={Variants}
      initial={"initial"}
      animate={"animate"}
      className={`font-extrabold ${size}`}
      key={time}
    >
      {time}
    </motion.p>
  );
};

export default MotionAnimateTime;
