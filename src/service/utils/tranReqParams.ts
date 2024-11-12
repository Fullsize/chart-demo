/*
 * @Description:
 * @Version: 1.0
 * @Autor: Sungy
 * @Date: 2022-04-14 14:45:13
 * @LastEditors: sungy
 * @LastEditTime: 2024-03-26 14:56:38
 */

// 处理Fetch 请求体参数
function tranReqParamsBodyParams(params: any) {
  let bodyParams;
  if (!params) {
    return undefined;
  } else if (typeof params == 'object') {
    bodyParams = params;
  } else if (typeof params == 'string') {
    bodyParams = params;
  }
  return bodyParams;
}

// 处理请求参数转换为URL参数形式
function tranReqParamsToUrlParams(params: any) {
  // 字符串不处理
  if (typeof params == 'string' || typeof params == 'number') {
    return params;
  }
  // 复合类型转换Url参数形式
  let result = '';
  for (const item in params) {
    result += '&' + item + '=' + encodeURIComponent(params[item]);
  }
  if (result) {
    //去掉第一个&
    result = result.slice(1);
    result = '?' + result;
  }
  return result;
}

// 构造 Fetch 请求参数
function getFetchOption(reqPath: string, reqParams?: any, method?: string) {
  let url = reqPath;
  const option: any = { method: method };
  if (
    method == 'GET' ||
    (method == 'DELETE' &&
      (typeof reqParams == 'string' || typeof reqParams == 'number'))
  ) {
    url += tranReqParamsToUrlParams(reqParams).toString();
  } else {
    option.body = tranReqParamsBodyParams(reqParams);
  }
  return { url, option };
}

// 将函数获取参数转换为Json
function getParmsJson(reqParams: any) {
  if (typeof reqParams == 'function') {
    try {
      return reqParams();
    } catch (error) {}
  } else {
    return reqParams;
  }
}

export {
  getParmsJson,
  getFetchOption,
  tranReqParamsBodyParams,
  tranReqParamsToUrlParams,
};
