import React from 'react';
import { Flc, F16, F14, Flr } from '@/components/Indicator';
import { trIndDataToArrSx } from '../utils';

import icon0 from './icon0.png';
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import icon4 from './icon4.png';
import icon5 from './icon5.png';
import icon6 from './icon6.png';
import icon7 from './icon7.png';

const mapIco: any = {
    0: icon0,
    湿度: icon1,
    风向: icon2,
    降水: icon3,
    能见度: icon4,
    风速: icon5,
    气压: icon6,
    太阳辐射: icon7,
};

function getIcon(index: number) {
    const icon = mapIco[index];
    if (icon) {
        return icon;
    }
    return icon0;
}

type grNameValueType = {
    data: any;
    fieldNames?: any;
    [key: string]: any;
};

export const TrSxTqCard = ({ fieldNames = {}, data, ...style }: grNameValueType) => {
    const { name: nameKey = 'index_code_cname', val: valKey = 'val', unit: unitKey = 'unit_name' } = fieldNames;
    const trData = trIndDataToArrSx(data);
    return (
        <Flc
            style={{
                flex: 1,
                gap: 5,
                height: 100,
                textAlign: 'center',
                justifyContent: 'flex-start',
                background: 'linear-gradient( 180deg, rgba(77,86,109,0.04) 0%, rgba(61,72,95,0.62) 100%)',
                boxShadow: 'inset 0px -1px 3px 0px rgba(110,126,159,0.66)',
                borderRadius: '7px',
                paddingTop: 15,
                ...style,
            }}
        >
            <img src={getIcon(data?.[nameKey])} style={{ height: 24, width: 24, margin: '0px auto' }} />
            <Flr justifyContent="center">
                {trData?.map((item: any, i: number) => (
                    <F16 color="#FFF" key={i} fontFamily="D-DIN">
                        {i == 0 ? '' : '/'}
                        {item?.[valKey] ?? '--'}
                        {item?.[unitKey]}
                    </F16>
                ))}
            </Flr>
            <Flr justifyContent="center">
                {trData?.map((item: any, i: number) => (
                    <F14 color="#B1DDFF" key={i}>
                        {i == 0 ? '' : '/'}
                        {item?.[nameKey]}
                    </F14>
                ))}
            </Flr>
        </Flc>
    );
};
