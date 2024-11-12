import React, { useState, useEffect, CSSProperties } from 'react';
import { Flc, Flr, F16, F16B, F18B } from '@/components/Indicator';

interface IBaseGrIndTabProps {
    data: any[];
    active?: any;
    onChange?: any;
    beforeStyle?: CSSProperties;
    afterStyle?: CSSProperties;
    flaLabelStyle?: CSSProperties;
    data_deconstruction?: {
        lable: string; // 指标名称
        value: string; // 单位
    };
    style?: CSSProperties;
    itemStyle?: CSSProperties;
    selectStyle?: any;
    [p: string]: unknown;
}

const TabSingleSelect = ({ data, active, onChange, style, children, selectStyle }: any) => {
    const [acStyle, setAcStyle] = useState({});
    useEffect(() => {
        let unStyle = {};
        if (active == data) {
            unStyle = selectStyle.active;
        }
        setAcStyle(unStyle);
    }, [active, data]);

    return (
        <div
            style={{
                cursor: 'pointer',
                userSelect: 'none',
                transition: '0.25s',
                position: 'relative',
                ...selectStyle.default,
                ...style,
                ...acStyle,
            }}
            onClick={() => {
                onChange?.(data);
            }}
        >
            <div style={selectStyle?.beforeStyle}></div>
            {children}
            <div style={selectStyle?.afterStyle}></div>
        </div>
    );
};

const BaseGrIndTab = ({
    data = [],
    data_deconstruction = {
        lable: 'lable',
        value: 'value',
    },
    active,
    onChange,
    itemStyle,
    style,
    selectStyle,
    flaLabelStyle,
    ...props
}: IBaseGrIndTabProps) => {
    const [select, setSelect] = useState(active);

    useEffect(() => {
        setSelect(active);
    }, [active, data]);

    const FlaLabel = selectStyle?.FlaLabel
        ? selectStyle.FlaLabel
        : ({ children }: any) => {
            return (
                <Flr justifyContent="center" padding="8px 10px" {...flaLabelStyle}>
                    <F16 textAlign="center" minWidth={60}>
                        {children}
                    </F16>
                </Flr>
            );
        };

    return (
        <Flc gap={10} justifyContent="center" overflow="auto" padding={5} {...style} {...props}>
            {data?.map?.((item: any) => {
                const lable = item[data_deconstruction.lable ?? 'lable'];
                const value = item[data_deconstruction.value ?? 'value'];
                const Icon = item['icon'];
                const iconProps = item['iconProps'];

                return (
                    <TabSingleSelect
                        key={value}
                        active={select}
                        data={value}
                        style={itemStyle}
                        onChange={(v: any) => {
                            if (onChange) {
                                onChange(v, item);
                            } else {
                                setSelect(v);
                            }
                        }}
                        selectStyle={selectStyle}
                    >
                        <FlaLabel icon={Icon} iconProps={iconProps}>
                            {lable}
                        </FlaLabel>
                    </TabSingleSelect>
                );
            })}
        </Flc>
    );
};

const selectStylesCollections = [
    {
        default: {
            border: '2px solid rgb(9 239 230 / 30%)',
            borderRadius: 2,
        },
        active: {
            background:
                'linear-gradient(135deg, rgb(9 239 230 / 50%) 35%,rgb(9 239 230 / 25%) 55%, rgb(9 239 230 / 0%) 100%)',
            border: '2px solid rgb(9 239 230 / 100%)',
        },
    },
    {
        default: {
            boxShadow: 'inset 0px 0px 4px 1px rgba(17,123,226,0.5)',
            borderRadius: 16,
            background: 'rgba(17,123,226,0.25)',
            color: '#FFFFFF',
        },
        active: {
            boxShadow: 'inset 0px 0px 4px 2px rgba(255,255,255,0.4)',
            background: 'rgba(17,123,226,0.85)',
        },
        FlaLabel: ({ children }: any) => {
            return (
                <Flr justifyContent="center" padding="6px 16px">
                    <F18B textAlign="center" minWidth={60}>
                        {children}
                    </F18B>
                </Flr>
            );
        },
    },
    {
        default: {
            boxShadow: 'inset 0px 0px 4px 1px rgba(29, 221, 209, 0.4)',
            borderRadius: 16,
            background: 'rgba(29, 221, 209, 0.15)',
            color: '#FFFFFF',
        },
        active: {
            boxShadow: 'inset 0px 0px 4px 2px rgba(29, 221, 209, 0.9)',
            background: 'rgba(29, 221, 209, 0.35)',
        },
        FlaLabel: ({ children }: any) => {
            return (
                <Flr justifyContent="center" padding="6px 16px">
                    <F16B textAlign="center" minWidth={60}>
                        {children}
                    </F16B>
                </Flr>
            );
        },
    },
    {
        default: {
            border: '1px solid rgba(95, 151, 255,0.25)',
            color: 'rgba(255,255,255,0.65)',
            height: 24,
        },
        active: {
            color: 'rgba(255,255,255,1)',
            background: 'linear-gradient( 26deg, #3D7AEC 0%, #355AD0 100%)',
            backdropFilter: 'blur(11px)',
        },
        beforeStyle: {
            position: 'absolute',
            height: '100%',
            width: 2,
            top: -1,
            left: -4,
            border: '1px solid rgba(95, 151, 255,0.15)',
        },
        afterStyle: {
            position: 'absolute',
            height: '100%',
            width: 2,
            top: -1,
            right: -4,
            border: '1px solid rgba(95, 151, 255,0.15)',
        },
        FlaLabel: ({ children }: any) => {
            return (
                <Flr justifyContent="center" height="100%" padding="0px 16px">
                    <F16 textAlign="center" minWidth={60}>
                        {children}
                    </F16>
                </Flr>
            );
        },
    },
    // 添加icon+文本
    {
        default: {
            border: '1px solid rgba(95, 151, 255,0.25)',
            color: 'rgba(255,255,255,0.65)',
            height: 24,
        },
        active: {
            color: 'rgba(255,255,255,1)',
            background: 'linear-gradient( 26deg, #3D7AEC 0%, #355AD0 100%)',
            backdropFilter: 'blur(11px)',
        },
        FlaLabel: ({ icon: Icon, children, iconProps }: { icon: React.FC; children?: string[]; iconProps: any }) => {
            const renderFlag = !!(
                children && children?.map((item) => item && item.trim()).filter((item) => !!item).length
            );

            return (
                <Flr
                    style={{
                        gap: 10,
                        justifyContent: 'center',
                        height: '100%',
                        padding: '0px 16px',
                    }}
                >
                    <Icon {...iconProps} />
                    {renderFlag && (
                        <F16 textAlign="center" minWidth={60}>
                            {children}
                        </F16>
                    )}
                </Flr>
            );
        },
    },
    {
        default: {
            background: 'linear-gradient( 180deg, rgba(77,86,109,0.04) 0%, rgba(61,72,95,0.62) 100%)',
            border: '1px solid',
            borderImage: 'linear-gradient(180deg, rgba(66, 79, 90, 0.48), rgba(255, 255, 255, 0.46)) 1 1',
        },
        active: {
            color: '#fff',
            background: 'linear-gradient( 180deg, rgba(29,41,56,0) 0%, rgba(46,217,255,0.6) 100%)',
            border: '1px solid',
            borderImage:
                'linear-gradient(270deg, rgba(224, 232, 247, 0.3), rgba(171, 193, 233, 1), rgba(177, 198, 235, 0.92), rgba(224, 232, 247, 0.3)) 1 1',
        },
    },
];

export interface IGrIndTabProps {
    data: any[];
    active?: any;
    onChange?: any;
    flaLabelStyle?: React.CSSProperties;
    data_deconstruction?: {
        lable: string; // 指标名称
        value: string; // 单位
    };
    style?: CSSProperties;
    [p: string]: unknown;
}

export const GrIndTab = ({ ...props }: IGrIndTabProps) => {
    return <BaseGrIndTab {...props} selectStyle={{ ...selectStylesCollections[0] }} />;
};

export const GrIndTab1 = ({ ...props }: IGrIndTabProps) => {
    return <BaseGrIndTab {...props} selectStyle={{ ...selectStylesCollections[1] }} />;
};

export const GrIndTab2 = ({ ...props }: IGrIndTabProps) => {
    return <BaseGrIndTab {...props} selectStyle={{ ...selectStylesCollections[2] }} />;
};

export const GrIndTab3 = ({ ...props }: IGrIndTabProps) => {
    return <BaseGrIndTab {...props} selectStyle={{ ...selectStylesCollections[3] }} />;
};

/**
 * 支持icon+文本 混合
 * @param param0
 * @returns
 */
export const GrIndTab4 = ({ ...props }: IGrIndTabProps) => {
    return <BaseGrIndTab {...props} selectStyle={{ ...selectStylesCollections[4] }} />;
};

export const GrIndTab5 = ({ flaLabelStyle, ...props }: IGrIndTabProps) => {
    return (
        <BaseGrIndTab
            {...props}
            gap={4}
            selectStyle={{ ...selectStylesCollections[5] }}
            flaLabelStyle={{ padding: '6px 18px', ...flaLabelStyle }}
        />
    );
};
/**
 * 自动撑满宽度
 */

export const GrIndTab6 = ({ ...props }: IGrIndTabProps) => {
    return (
        <BaseGrIndTab
            {...props}
            gap={4}
            selectStyle={{ ...selectStylesCollections[5] }}
            itemStyle={{ flexGrow: '1' }}
            flaLabelStyle={{ padding: '6px 18px' }}
        />
    );
};
