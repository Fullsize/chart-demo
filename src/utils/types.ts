import type React from "react";

export type PropsWithStyle<T = unknown> = T & {
  style?: React.CSSProperties;
  className?: React.HTMLAttributes<HTMLElement>['className'];
};

export interface IApiResponse<T> {
  ok: boolean,
  sign: number,
  data: T;
  getTimeName?: () => string;
}