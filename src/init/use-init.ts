import { useEffect, useState } from 'react';

import { init } from './init';

export function useInit() {
  const [initResult, setInitResult] = useState<boolean>();

  useEffect(() => {
    init().then(() => setInitResult(true));
  }, []);

  return initResult;
}
