/*
 * @Description: 基于Hook的中间件
 * @Version: 1.0
 * @Autor: Sungy
 * @Date: 2022-04-18 17:25:15
 * @LastEditors: sungy
 * @LastEditTime: 2024-03-25 18:55:35
 */

function linkMiddleWare(hook: any) {
  return function useNext(args: any, config: any) {
    let next: any = hook;
    const use = config?.use;
    if (use) {
      for (let i = use.length; i-- > 0; ) {
        next = use[i](next, config);
      }
    }
    return next(args, config);
  };
}

function useMiddleWareHandler() {
  return { ...arguments };
}

const useMiddleware = linkMiddleWare(useMiddleWareHandler);
export { useMiddleware };
