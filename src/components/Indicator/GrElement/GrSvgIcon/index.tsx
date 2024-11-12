import React from 'react';
import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

export const MapSvg: React.FC = () => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path d="M682.666667 213.333333L342.208 0 0 213.664V1024l341.333333-213.333333 341.333334 213.333333 341.333333-213.333333V0L682.666667 213.333333zM85.333333 870.037333V260.992L298.666667 127.786667v608.896l-2.56 1.578666L85.333333 870.037333z m298.666667-133.354666V126.890667l253.354667 158.752 2.645333 1.674666v609.386667l-253.44-158.4-2.56-1.621333z m554.666667 26.688l-213.333334 133.333333v-609.386667l2.56-1.6L938.666667 153.962667v609.408z" />
        </svg>
    );
};

export const RankSvg: React.FC = () => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path d="M0 938.688h1024V1024H0v-85.312zM0 213.312h298.688v640H0v-640z m85.312 85.376V768h128V298.688h-128z m640-85.376H1024v640h-298.688v-640z m85.376 85.376V768h128V298.688h-128zM341.312 0h341.376v853.312H341.312V0z m85.376 85.312V768h170.624V85.312H426.688z"></path>
        </svg>
    );
};

type CustomIconComponentProps = GetProps<typeof Icon>;

/**
 * 地图图标
 * @param props
 * @returns
 */
export const MapIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={MapSvg} {...props} />;
};

/**
 * 排名图标
 * @param props
 * @returns
 */
export const RankIcon = (props: Partial<CustomIconComponentProps>) => {
    return <Icon component={RankSvg} {...props} />;
};
