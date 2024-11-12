/*
 * @Author: sungy
 * @Date: 2023-09-05 15:27:03
 * @LastEditors: sungy
 * @LastEditTime: 2024-04-22 16:44:47
 * @Description: 河北Store
 */
import { create } from 'zustand';
// import { getLoginUser } from '@/service/request';

const useStore: any = create((set: any) => ({
    navPathName: [],
    setNavPathName: (data: any) => set(() => ({ navPathName: data })),
    echartsTheme: 'ectFgw',
    setEchartsTheme: (data: any) => set(() => ({ echartsTheme: data })),
    userAuthMenu: null,
    setUserAuthMenu: (data: any) => set(() => ({ userAuthMenu: data })),
}));

export default useStore;
