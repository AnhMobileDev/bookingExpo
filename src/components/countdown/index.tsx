import { useState } from 'react';
import dayjs from 'dayjs';

import { Time } from '../../assets/icon';
import useCountdown from '../../hooks/use-countdown';

interface Props {
  createdAt: string;
}

export const CountDownTimer = ({ createdAt }: Props) => {
  const [targetDate] = useState(dayjs(createdAt).add(15, 'minutes'));

  const [, { minutes, seconds }] = useCountdown({
    targetDate,
  });

  return (
    <div
      style={{ border: '1px solid #F5B102' }}
      className="flex gap-1 items-center justify-center py-1 px-2 bg-[#FFEFC4] rounded-full  w-[90px] h-8">
      <Time></Time>
      <div className="text-[#202C38]">
        <div>
          {minutes > 9 ? minutes : '0' + minutes}: {seconds > 9 ? seconds : '0' + seconds}
        </div>
      </div>
    </div>
  );
};
