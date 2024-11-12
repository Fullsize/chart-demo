// Fetch 结果处理
export const resHandle = (res: any) => {
  const contentType = res.headers.get('Content-Type');
  if (contentType.indexOf('application/json') >= 0) {
    return res.json();
  } else if (contentType.indexOf('application/zip') >= 0) {
    return res.blob();
  } else {
    return res.text();
  }
};
