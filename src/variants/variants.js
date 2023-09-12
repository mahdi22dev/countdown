export const Variants = {
  animate: {
    opacity: 1,
    y: "0px",
    transition: {
      type: "spring",
      stiffness: 230,
      damping: 25,
      velocity: 10,
      duration: 0.2,
      opacity: { duration: 0.5 },
    },
  },
  initial: {
    opacity: 0,
    y: "-20px",
    transition: { duration: 0.3 },
  },
};
