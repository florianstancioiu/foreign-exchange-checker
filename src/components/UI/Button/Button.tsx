import { twMerge } from "tailwind-merge";
import { type ReactNode } from "react";
import { type ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  onClick?: () => void;
};

const Button = ({
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="button"
      className={twMerge(
        "rounded-lg border border-neutral-500 bg-neutral-600 light:bg-blue-600 light:border-blue-700 cursor-pointer py-2 px-3 uppercase text-xs font-medium leading-[130%] tracking-[0.5px] focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg transition hover:bg-neutral-500",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
