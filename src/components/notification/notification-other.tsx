import { memo } from 'react';

import { NotificationEmpty } from './notification-empty';
import { PropsNotificationChildren } from './notification';

export const NotificationOther = memo(({ items, handleLoadmore }: PropsNotificationChildren) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden max-h-[486px]" onScroll={handleLoadmore}>
      {items && items.length > 0 ? (
        items.map((item, idx) => {
          return (
            <div
              key={idx}
              className="p-12px mb-16px hover:cursor-pointer rounded shadow-[0_1px_3px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-grayscale-black font-semibold text-[14px] leading-[20px]">{item.title}</h2>
              <span className="text-grayscale-light text-[10px] font-normal">{item.createdAt}</span>
              <br />
              <span className="text-grayscale-black text-[12px] font-normal leading-[16px]">{item.body}</span>
              <img src={'https://picsum.photos/200/100'} alt={item.body} className="mt-3 w-full h-[100px] bg-cover" />
            </div>
          );
        })
      ) : (
        <NotificationEmpty />
      )}
    </div>
  );
});
