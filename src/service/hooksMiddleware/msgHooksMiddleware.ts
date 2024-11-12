/*
 * @Description:
 * @Version: 1.0
 * @Autor: Sungy
 * @Date: 2022-04-24 14:10:39
 * @LastEditors: sungy
 * @LastEditTime: 2024-03-26 15:05:41
 */
import { useEffect } from 'react';
import { message } from 'antd';

const warningMsg: any = {
  '45009': '您没有权限,请联系管理员！',
};
const errorMsg: any = {
  '20000': '系统错误',
};
// 错误消息通知
function codeMessage(errorInfo: any) {
  if (typeof errorInfo == 'object') {
    const { code, msg } = errorInfo;
    setTimeout(() => {
      if (warningMsg[code]) {
        message.warning(warningMsg[code]);
      } else if (errorMsg[code]) {
        message.error(errorMsg[code]);
      } else {
        message.error(msg);
      }
    }, 0);
  } else {
    setTimeout(() => {
      message.error(errorInfo);
    }, 0);
  }
}

// 极睿【中间件】Fetch 请求
export function msgHooksMiddleware1(useNextHook: any) {
  return (args: any) => {
    const [res, dispath] = useNextHook(args);

    useEffect(() => {
      if (res.ok === false) {
        codeMessage(res.error);
      }
    }, [res.sign]);

    return [res, dispath];
  };
}

export function msgHooksMiddleware(useNextHook: any) {
  return (args: Array<any>) => {
    const [res, dispath] = useNextHook(args);

    // TODO 中间件的功能

    return [res, dispath];
  };
}
