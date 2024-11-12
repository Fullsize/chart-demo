import routerBase from './routerBase';
import routerSx from './routerSx';
import routerDemo from './routerDemo';

export interface CustomRoute {
    path: string;
    name?: string;
    to?: string;
    children?: CustomRoute[];
    collapseChildren?: boolean;
    component?: boolean;
    isShowInMenu?: boolean;
}

export default [...routerBase, ...routerSx, ...routerDemo];
