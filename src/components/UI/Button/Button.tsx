import { twMerge } from "tailwind-merge";
import { type ReactNode } from "react";

export type ButtonProps = {
  className?: string;
  children: ReactNode;
};

const Button = ({ children, className = "" }: ButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        "rounded-lg border border-neutral-500 bg-neutral-600 cursor-pointer py-2 px-3 uppercase text-xs font-medium leading-[130%] tracking-[0.5px] focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
