"use client";
import { cva } from "class-variance-authority";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: " btn-primary",
      primary_outline: "btn-primary btn-outline",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      disabled: "btn-disabled",
    },
    size: {
      default: "h-3 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export default function Button({ variant, size, text, className, ...props }) {
  const combinedClassName = `${buttonVariants({
    variant,
    size,
  })} ${className}`;

  return (
    <button {...props} className={combinedClassName}>
      {text}
    </button>
  );
}
