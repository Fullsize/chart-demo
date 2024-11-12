/*
 * @Author: sungy
 * @Date: 2023-08-10 11:40:25
 * @LastEditors: sungy
 * @LastEditTime: 2024-01-25 17:51:14
 * @Description: 请求Hooks 入口
 */
import { useEcApiPost } from './index';

export const useHbIndAxisApi = (
  url?: Array<any>,
): [Array<any>, (arg: [object | undefined, object | undefined]) => void] => {
  const [res1, getApi1] = useEcApiPost(url?.[0] ?? '/api/v4/query/v7Card');
  const [res2, getApi2] = useEcApiPost(
    url?.[1] ?? '/api/v4/query/timeTrendChart',
  );

  function dispatch(pram: [any, any]) {
    if (Array.isArray(pram)) {
      if (pram[0]) {
        getApi1(pram[0]);
      }
      if (pram[0]) {
        getApi2(pram[1]);
      }
    }
  }
  return [[res1, res2], dispatch];
};
