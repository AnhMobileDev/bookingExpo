import { ReactNode, memo } from 'react';

export const SectionWrapper = memo(({ title, children }: { title?: string | ReactNode; children?: ReactNode }) => {
  return (
    <div className="w-full h-fit p-20px bg-white">
      {title && <h3 className="text-16px font-semibold uppercase mb-20px">{title}</h3>}
      <div className="w-full flex flex-col space-y-20px">{children}</div>
    </div>
  );
});
