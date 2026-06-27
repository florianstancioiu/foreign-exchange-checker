import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { Link, useLocation } from "react-router";

export type LinkWithQueryProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  to: string;
};

const LinkWithQuery = ({ children, to, ...props }: LinkWithQueryProps) => {
  const { search } = useLocation();

  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
};

export default LinkWithQuery;
