import { type ReactNode } from "react";

export type EmptyPageProps = {
  title: string;
  content: ReactNode;
};

const EmptyPage = ({ title, content }: EmptyPageProps) => {
  return (
    <div className="py-10 px-0 flex flex-col justify-center items-center gap-y-4">
      <p
        className="font-normal text-neutral-100 leading-[120%] tracking-[-0.5px] text-xl light:text-neutral-900"
        data-testid="empty_page_title"
      >
        {title}
      </p>
      <div
        className="text-sm text-neutral-200 font-normal leading-[120%] tracking-[1px] text-center"
        data-testid="empty_page_content"
      >
        {content}
      </div>
    </div>
  );
};

export default EmptyPage;
