import React from 'react';
import { Flr, Flc, GrValUnit2, F18, IndCssLgText9 } from '@/components/Indicator';

import icon1 from './体育公园健身设施.webp';
import icon2 from './健身步道.webp';
import icon3 from './健身广场.webp';
import icon4 from './足球场.webp';
import icon5 from './篮球场.webp';
import icon6 from './排球场.webp';
import icon7 from './网球场.webp';
import icon8 from './羽毛球场.webp';

import icon_new1 from './icon1.png';
import icon_new2 from '././icon2.png';
import icon_new34 from '././icon34.png';

import imgUrl from './0.png';

const mapIco: any = {
    体育公园健身设施: icon1,
    健身步道: icon2,
    健身广场: icon3,
    足球场: icon4,
    篮球场: icon5,
    排球场: icon6,
    网球场: icon7,
    羽毛球场: icon8,
    健康老年人数: icon_new1,
    基本健康人口数老年人数: icon_new2,
    '不健康，但生活能自理老年人数': icon_new34,
    生活不能自理老年人数: icon_new34,
};

function getIcon(title: string) {
    const icon = mapIco[title];
    if (icon) {
        return icon;
    }
    return imgUrl;
}

type grNameValueType = {
    apiData: any;
    iconUrl?: any;
    fieldNames?: any;
};

export const TrHbfgIndNameValue = ({ iconUrl, fieldNames = {}, apiData, ...style }: grNameValueType) => {
    const data = apiData?.data?.[0];
    const { name: nameKey = 'name', val: valKey = 'val', unit: unitKey = 'unit' } = fieldNames;

    return (
        <Flr justifyContent="start" float="left" {...style}>
            <img
                src={getIcon(data?.[nameKey])}
                style={{
                    width: 120,
                    height: 100,
                }}
            />
            <Flc gap={15}>
                <IndCssLgText9>
                    <F18>{data?.[nameKey] ?? '--'}</F18>
                </IndCssLgText9>
                {
                    <GrValUnit2
                        value={data?.[valKey]}
                        unit={data?.[unitKey]}
                        fontStyle={{
                            flex: 'none',
                        }}
                    ></GrValUnit2>
                }
            </Flc>
        </Flr>
    );
};

export const TrHbfgIndNameValueList = ({ apiData, fieldNames = {}, childrenStyle, style, ...props }: any) => {
    return (
        <div
            style={{
                ...style,
            }}
        >
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrHbfgIndNameValue
                        key={'TrHbfgIndCard2Arr' + i}
                        apiData={{
                            ok: true,
                            data: Array.isArray(item) ? item : [item],
                            sign: apiData?.sign,
                        }}
                        style={{ ...childrenStyle }}
                        fieldNames={fieldNames}
                        {...props}
                    ></TrHbfgIndNameValue>
                );
            })}
        </div>
    );
};
