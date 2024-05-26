import { ReactNode, memo } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  items: { title: string; to?: string | null }[];
  title?: string | ReactNode;
  rightContent?: ReactNode;
  centerContent?: ReactNode;
};

export const SubHeader = memo((props: Props) => {
  const { items = [], title, rightContent, centerContent } = props;

  return (
    <div className="flex justify-between items-center bg-white px-6 h-[84px]">
      <div>
        {items.length > 0 &&
          items.map((item, idx) => {
            return (
              <div className="inline" key={idx}>
                {item.to ? (
                  <Link to={item.to} className="text-xs text-grayscale-light">
                    {item.title}
                  </Link>
                ) : (
                  <span className="text-xs text-grayscale-light">{item.title}</span>
                )}
                {!(items.length - 1 === idx) && <span className="px-2 text-xs text-grayscale-light">/</span>}
              </div>
            );
          })}
        <h2 className="pt-2 font-semibold text-2xl">{title ?? items[items.length - 1].title}</h2>
      </div>
      <div className="flex-1">{centerContent}</div>
      <div>{rightContent}</div>
    </div>
  );
});
