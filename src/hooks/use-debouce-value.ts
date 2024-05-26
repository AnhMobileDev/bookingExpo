import { useEffect, useState } from 'react';

type Props = {
  defaultValue: any;
  debouceTime?: number;
};

export const useDebouceValue = ({ defaultValue, debouceTime = 1000 }: Props) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(defaultValue);
    }, debouceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [defaultValue, debouceTime]);
  return value;
};
