import React from 'react';
import { Flr, Flc, GrValUnit4, F18, GrZs3, F14 } from '@/components/Indicator';
import { trIndDataToArrSx } from '../utils';

import bg0 from './card_bg0.png';
import bg1 from './card_bg1.png';

import icon0 from './icon0.png';
import icon1 from './icon1.png';
import icon2 from './icon2.png';

const mapIco: any = [icon0, icon1, icon2];

function getIcon(index: number) {
    const icon = mapIco[index];
    if (icon) {
        return icon;
    }
    return icon0;
}

type grNameValueType = {
    apiData: any;
    iconNum?: number;
    fieldNames?: any;
    [key: string]: any;
};

export const TrSxMrgzIndCard = ({ iconNum = 0, fieldNames = {}, apiData, ...style }: grNameValueType) => {
    const data = apiData?.data?.[0];
    const trData = trIndDataToArrSx(data);
    const {
        name: nameKey = 'index_code_full_cname',
        typeName: typeNameKey = 'index_code_full_type_name',
        val: valKey = 'val',
        unit: unitKey = 'unit_name',
    } = fieldNames;
    const size: any = trData?.length === 1 ? 'small' : '';
    return (
        <Flc
            style={{
                width: 260,
                minHeight: size === 'small' ? 96 : 130,
                boxSizing: 'border-box',
                padding: '10px 16px',
                backgroundImage: `url(${getIcon(iconNum)}),url(${size === 'small' ? bg1 : bg0})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `208px ${size === 'small' ? '40px' : '70px'},0 0`,
                ...style,
            }}
        >
            <Flc gap={4} height="100%" flex={1}>
                <F18 width={160} lineHeight="18px" whiteSpace="break-spaces">
                    {trData?.[0]?.[nameKey] ?? '--'}
                </F18>
                {<GrValUnit4 value={trData?.[0]?.[valKey]} unit={trData?.[0]?.[unitKey]}></GrValUnit4>}
                <Flr justifyContent="flex-start" gap={20}>
                    {(trData.filter((v: any) => v?.type_code !== 'LX0101') ?? []).map((item: any, i: number) => (
                        <Flc key={i} gap={6}>
                            <F14 color="rgba(224,244,255,0.8)">{item?.[typeNameKey] ?? '--'}</F14>
                            <GrZs3 value={item?.[valKey]} unit={item?.[unitKey]} lastCompare="up"></GrZs3>
                        </Flc>
                    ))}
                </Flr>
            </Flc>
        </Flc>
    );
};

export const TrSxMrgzIndCardArr = ({ apiData, fieldNames = {}, childrenStyle, style, ...props }: any) => {
    return (
        <Flr
            style={{
                ...style,
            }}
        >
            {apiData?.data?.map?.((item: any, i: any) => {
                return (
                    <TrSxMrgzIndCard
                        key={'TrSxMrgzIndCard' + i}
                        apiData={{
                            ok: true,
                            data: Array.isArray(item) ? item : [item],
                            sign: apiData?.sign,
                        }}
                        style={{ ...childrenStyle }}
                        fieldNames={fieldNames}
                        {...props}
                    ></TrSxMrgzIndCard>
                );
            })}
        </Flr>
    );
};
