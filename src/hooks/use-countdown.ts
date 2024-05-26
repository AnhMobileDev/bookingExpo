import { useEffect, useMemo, useState, useRef } from 'react';
import dayjs from 'dayjs';

const isNumber = (value: unknown): value is number => typeof value === 'number';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (target?: TDate) => {
  if (!target) {
    return 0;
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(target).valueOf() - Date.now();
  return left < 0 ? 0 : left;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountdown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  const target = useMemo<TDate>(() => {
    if ('leftTime' in options) {
      return isNumber(leftTime) && leftTime > 0 ? Date.now() + leftTime : undefined;
    } else {
      return targetDate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftTime, targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, target]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

// eslint-disable-next-line import/no-default-export
export default useCountdown;
