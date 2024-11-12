/*
 * @Description: 封装基础的 Fetch 请求
 * @Version: 1.0
 * @Autor: Sungy
 * @Date: 2022-04-12 16:04:00
 * @LastEditors: sungy
 * @LastEditTime: 2024-03-26 14:03:46
 */
import { resHandle } from '../utils';
import { useState, useMemo, useRef } from 'react';

let count = 1;

// Fetch API
function useFetchApi(option: any, config: any) {
  const fetchRef = useRef(option);
  const [fetchState, setFetchState] = useState<object>({
    ok: undefined,
    data: undefined,
  });
  // Fetch 请求
  const runFetch = (fetchOption: any) => {
    const fetOps =
      typeof fetchOption == 'function' ? fetchOption() : fetchOption;
    if (!fetOps) {
      return;
    }
    const { url, option } = fetOps;
    if (config?.loading) {
      const controller = new AbortController();
      option.signal = controller.signal;
      setFetchState({ loading: true, signal: controller });
    }
    let isOk = false;
    let apiData: any;
    fetch(url, option)
      .then((res) => {
        if (res.status === 200) {
          isOk = true;
        }
        return resHandle(res);
      })
      .then((resData) => {
        count++;
        apiData = resData;
      })
      .catch((error) => {
        count++;
        apiData = error;
        // console.error("【Fetch-Error】", error);
      })
      .finally(() => {
        if (isOk) {
          setFetchState({ ok: true, data: apiData, sign: count });
        } else {
          setFetchState({
            ok: false,
            error: '请求服务失败，请检查接口',
            sign: count,
          });
          // console.error("【Http-Error】", apiData);
        }
      });
  };

  // 初始化
  useMemo(() => {
    runFetch(fetchRef.current);
  }, []);

  // 手动触发接口
  function dispatch(option: any) {
    fetchRef.current = option;
    runFetch(option);
  }
  return [fetchState, dispatch];
}

// 【中间件】Fetch 请求
function fetchHooksMiddleware(useNextHook: any, config: any) {
  return (fetchOption: any) => {
    const fetRes = useFetchApi(fetchOption, config);
    const res = useNextHook(fetRes);
    return res[0];
  };
}

export { useFetchApi, fetchHooksMiddleware };
