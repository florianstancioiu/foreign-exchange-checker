import { type ReactNode } from "react";

export type DetailsContainerProps = {
  headerContent: ReactNode;
  children: ReactNode;
};

const DetailsContainer = ({
  headerContent,
  children,
}: DetailsContainerProps) => {
  return (
    <div className="p-4 border border-neutral-600 bg-neutral-700 rounded-2xl md:p-5">
      {headerContent}
      <div className="mt-4 flex gap-y-3 flex-col">{children}</div>
    </div>
  );
};

export default DetailsContainer;
