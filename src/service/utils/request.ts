// import { asyncThread } from "@/src/utils";

export const request = async (url: string, option: { [key: string]: any }) => {
  return fetch(url, {
    ...option,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',

      ...option.headers,
    },
  });
};
