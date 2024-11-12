import { useRef, useMemo } from 'react';
import { getParmsJson } from '../utils';

// 【中间件】 自动参数变化，发送请求
export function autoPramsHooksMiddleware(useNextHook: any) {
  return (args: any) => {
    const [reqPath, reqParams, method] = args;
    const [data, dispathFetch] = useNextHook([reqPath, undefined, method]);
    const paramsRef: any = useRef();

    useMemo(() => {
      const paramsJson = getParmsJson(reqParams);
      const paramsStr = JSON.stringify([reqPath, paramsJson, method]);

      if (paramsRef.current != paramsStr) {
        paramsRef.current = paramsStr;
        dispathFetch(paramsJson);
      }
    }, [args]);

    return [data, dispathFetch];
  };
}
