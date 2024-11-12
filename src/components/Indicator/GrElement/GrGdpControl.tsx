import React, { useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Flr, F24B, IndCssLgText4, IndButtonBg } from '@/components/Indicator';

export const GrGdpControl = ({ value, step = 100, onChange, ...style }: any) => {
    const [v, setV] = useState<any>(value);

    useEffect(() => {
        setV(value);
    }, [value]);

    function onValueChange(stepValue: any) {
        let nv: any = parseFloat(v) + parseFloat(stepValue);
        nv = nv.toFixed(2);
        setV(nv);
        onChange && onChange(nv);
    }

    return (
        <IndButtonBg userSelect="none" {...style}>
            <Flr flex={1} padding="0px 15px">
                <MinusOutlined
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                    onClick={() => {
                        onValueChange(0 - step);
                    }}
                />
                <F24B overflow="visible">
                    <IndCssLgText4>{v}</IndCssLgText4>
                </F24B>
                <PlusOutlined
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                    onClick={() => {
                        onValueChange(step);
                    }}
                />
            </Flr>
        </IndButtonBg>
    );
};
