/*
 * @Author: sungy
 * @Date: 2023-11-23 10:55:43
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-12 18:15:33
 * @Description: 页面入口文件
 */
import './DeepBlue.css';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Empty from '@/components/Empty';
const { darkAlgorithm, compactAlgorithm } = theme;

const cyanTheme = {
    colorBgContainer: 'rgba(40, 48, 66, 1)',
    colorBgBase: 'rgba(215, 230, 249, 0)',
    colorBorder: '#5f97ff80',
    colorPrimary: 'rgba(0, 255, 255, 1)',
    colorPrimaryBorder: 'rgba(32, 241, 242, 1)',
    colorPrimaryHover: 'rgba(32, 241, 242, 1)',
};

export function DeepBlueTheme({ children }: any) {
    return (
        <ConfigProvider
            renderEmpty={() => {
                return <Empty />;
            }}
            locale={zhCN}
            theme={{
                token: {
                    colorBgContainer: 'rgb(50,68,87)',
                    colorText: 'rgba(255, 255, 255, 1)',
                    colorPrimary: '#00AFAF',
                    colorBorder: 'rgb(69, 88, 104)',
                    colorBgBase: '#232b38',
                    colorBgElevated: '#232b38',
                    colorBgSpotlight: '#232b38',
                    fontSize: 16,
                    sizeStep: 4,
                    sizeUnit: 4,
                    colorLink: '#b7dbff',
                    wireframe: false,
                    colorPrimaryBg: 'rgb(11 35 59 / 0%)',
                    colorPrimaryBorder: 'rgba(32, 241, 242, 1)',
                    colorPrimaryHover: 'rgba(32, 241, 242, 1)',
                    borderRadius: 4,
                },
                algorithm: [darkAlgorithm, compactAlgorithm],
                components: {
                    DatePicker: {
                        colorPrimary: '#00AFAF',
                        cellActiveWithRangeBg: 'rgb(88, 114, 161)',
                        cellRangeBorderColor: 'rgb(88, 114, 161)',
                    },
                    Checkbox: {
                        ...cyanTheme,
                        borderRadiusSM: 4,
                    },
                    Radio: {
                        ...cyanTheme,
                    },
                    Tabs: {
                        ...cyanTheme,
                    },
                    Select: {
                        optionSelectedBg: '#00AFAF',
                    },
                    Popover: {
                        borderRadius: 6,
                        titleMinWidth: 30,
                        colorBgBase: '#011F3C',
                        colorBorder: 'rgba(198,225,255,0.2)',
                        boxShadow: '0px 0px 5px 0px #1765C1',
                        boxShadowSecondary: '0px 0px 5px 0px #1765C1',
                        boxShadowTertiary: '0px 0px 5px 0px #1765C1',
                    },
                    Table: {
                        bodySortBg: 'rgb(24, 36, 96)',
                        borderColor: '#354361',
                        fontSize: 14,
                        fontWeightStrong: 400,
                        borderRadius: 0,
                        colorLink: 'rgb(255, 255, 255)',
                        colorPrimary: 'rgb(255, 255, 255)',
                        colorText: 'rgba(255, 255, 255, 0.88)',
                        colorTextHeading: 'rgb(255, 255, 255)',
                        colorBgContainer: 'rgba(24, 41, 120,0.1)',
                        headerBg: '#303E55',
                        headerColor: '#D2E9FF',
                        headerSplitColor: 'rgba(1,1,1,0)',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
