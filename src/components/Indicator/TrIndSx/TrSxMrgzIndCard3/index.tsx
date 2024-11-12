import React from 'react';
import { Flr, Flc, GrValUnit5, F18, F16, F16B, IndCssLgText12, GrDialogMrgz } from '@/components/Indicator';
import { trIndDataToArrSx } from '../utils';

import ft_bg from './ft_bg.png';
import { DialogChildren } from '../TrSxMrgzIndCard2/dialogChildren';
import { PresetType } from '@/components/BaseAntd';

type grNameValueType = {
    data: any;
    select?: boolean;
    onChange?: (data: any) => void;
    fieldNames?: any;
    presetType?: PresetType;
    [key: string]: any;
};

export const TrSxMrgzIndCard3 = ({
    fieldNames = {},
    data,
    select = false,
    onChange,
    presetType,
    ...style
}: grNameValueType) => {
    const {
        title: titleKey = 'index_code_full_cname',
        name: nameKey = 'group_name',
        val: valKey = 'val',
        unit: unitKey = 'unit_name',
        code: codeKey = 'index_full_code',
    } = fieldNames;

    const trData = trIndDataToArrSx(data);
    const indexFullCodeList = trData.reduce((pre: any, cur: any) => pre + cur?.index_full_code + ',', '');

    return (
        <div
            style={{
                display: 'flex',
                minWidth: 144,
                minHeight: 40,
                backgroundImage: `url(${ft_bg})`,
                backgroundSize: '72px 20px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `0px 28px`,
                gap: 18,
                ...style,
            }}
            onClick={() => {
                onChange?.(data);
            }}
        >
            <F18
                width={72}
                whiteSpace="break-spaces"
                fontFamily="YouSheBiaoTiHei"
                textAlign="center"
                display="inline-block"
            >
                <IndCssLgText12>{data?.[titleKey]}</IndCssLgText12>
            </F18>

            <Flc gap={6} height="100%" flex={1} marginLeft={5} color={select ? '#00FFFF' : '#fff'}>
                <Flr justifyContent="flex-start" gap={12}>
                    <F16 color="#D2E9FF">{data?.[nameKey] ?? '--'}</F16>
                    {trData?.[0]?.[codeKey] && (
                        <>
                            <GrDialogMrgz
                                title={trData?.[0]?.[nameKey] ?? '--'}
                                icon={
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: 37,
                                            height: 16,
                                            lineHeight: '17px',
                                            textAlign: 'center',
                                            backgroundColor: '#445362',
                                            fontSize: '12px',
                                            transform: 'translateX(4px)',
                                            borderRadius: '6px 0 6px 0',
                                        }}
                                    >
                                        详情
                                    </span>
                                }
                            >
                                <DialogChildren
                                    indexData={trData?.[0]}
                                    indexFullCodeList={indexFullCodeList}
                                    presetType={presetType}
                                    requestParams={{
                                        indexReplaceChart: 'ZB00090402&line',
                                    }}
                                />
                            </GrDialogMrgz>
                        </>
                    )}
                </Flr>
                {<GrValUnit5 value={data?.[valKey]} unit={data?.[unitKey]}></GrValUnit5>}
            </Flc>
        </div>
    );
};
