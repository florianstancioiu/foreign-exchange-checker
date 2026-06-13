import { twMerge } from "tailwind-merge";
import { type ReactNode } from "react";

export type ButtonProps = {
  className?: string;
  children: ReactNode;
};

const Button = ({ children, className = "" }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-lg border border-neutral-500 bg-neutral-600 cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
