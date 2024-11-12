import { Flr, F16, GrDialogMrgz, trIndDataToArr, GrValUnit4, GrZs2, GrValUnit6 } from '@/components/Indicator';
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

export const TrSxMrgzIndCard5 = ({
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

    const trData = trIndDataToArr(data);
    const indexFullCodeList = trData
        .filter(
            (cur: any) =>
                cur?.index_full_code !== 'F01ZB00200505LX0105' &&
                cur?.index_full_code !== 'F01ZB00200506LX0105' &&
                cur?.index_full_code !== 'F01ZB00200516LX0105' &&
                cur?.index_full_code !== 'F01ZB00430146LX0105' &&
                cur?.index_full_code !== 'F01ZB00200517LX0105' &&
                cur?.index_full_code !== 'F01ZB00200518LX0105' &&
                cur?.index_full_code !== 'F01ZB00200519LX0105' &&
                cur?.index_full_code !== 'F01ZB00200520LX0105',
        )
        .reduce((pre: any, cur: any) => pre + cur?.index_full_code + ',', '');
    // 去除涨跌
    return (
        <div
            style={{
                display: 'flex',
                minWidth: 144,
                minHeight: 40,
                backgroundSize: '72px 20px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `0px 28px`,
                flexDirection: 'column',
                gap: 18,
                padding: '19px 14px',
                background: 'linear-gradient( 180deg, #293444 0%, #252D3D 100%)',
                boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.12)',
                borderRadius: '6px',
                border: '1px solid #2F3C52',
                ...style,
            }}
            onClick={() => {
                onChange?.(data);
            }}
        >
            <F16 width={'200px'} whiteSpace="break-spaces" display="inline-block">
                <span>
                    {trData[0]?.[titleKey]}{' '}
                    <span style={{ display: 'inline-block' }}>
                        <GrDialogMrgz
                            title={trData?.[0]?.[titleKey] ?? '--'}
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
                                    indexReplaceChart:
                                        'ZB00200505&line,ZB00200506&line,ZB00200516&line,ZB00430146&line,ZB00200517&line,ZB00200518&line,ZB00200519&line,ZB00200520&line',
                                }}
                                data_deconstruction={{
                                    measure: "index_code_full_cname"
                                }}
                            />
                        </GrDialogMrgz>
                    </span>
                </span>
            </F16>
            <GrValUnit4 value={trData[0]?.val} unit={trData[0]?.unit_name}></GrValUnit4>
            <Flr>
                <GrValUnit6 value={trData[1]?.val} unit={trData[1]?.unit_name}></GrValUnit6>
                <GrZs2 value={trData[2]?.val} unit={trData[2]?.unit_name}></GrZs2>
            </Flr>
        </div>
    );
};

export const TrSxMrgzIndCard5Arr = ({ apiData, fieldNames = {}, childrenStyle, style, ...props }: any) => {
    return (
        <Flr
            style={{
                gap: '10px',
                ...style,
            }}
        >
            {apiData?.map?.((item: any, i: any) => {
                return (
                    <TrSxMrgzIndCard5
                        key={'TrSxMrgzIndCard' + i}
                        data={item}
                        style={{ ...childrenStyle }}
                        fieldNames={fieldNames}
                        {...props}
                    ></TrSxMrgzIndCard5>
                );
            })}
        </Flr>
    );
};
