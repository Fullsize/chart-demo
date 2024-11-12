import React, { useState, useEffect } from 'react';
import { Flc, Flr, F16, GrZs2 } from '@/components/Indicator';
import icon from './icon.png';
import icon_active from './icon_active.png';
import bg_url from './bg.png';

export const IndLegend = ({
    data = [],
    fieldNames = {},
    activeKey = '',
    key = 'index_full_code',
    onChange,
    ...props
}: any) => {
    const { name: nameKey = 'name', val: valKey = 'val', unit: unitKey = 'unit' } = fieldNames;

    const newData = data.map((item: any, i: number) => ({
        ...item,
        name: item?.[nameKey],
        val: item?.[valKey],
        unit: item?.[unitKey],
    }));

    const [select, setSelect] = useState(activeKey);

    useEffect(() => {
        setSelect(activeKey);
    }, [activeKey]);

    return (
        <Flc gap={20} justifyContent="normal" overflow="hidden" width="100%" {...props}>
            {newData.map((item: any, i: number) => (
                <div
                    style={{
                        width: '100%',
                        minWidth: 240,
                        backgroundImage: `url(${bg_url})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% auto',
                        backgroundPosition: 'bottom center',
                        paddingTop: 10,
                        paddingBottom: 10,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        if (onChange) {
                            onChange(item);
                        }
                        setSelect(item?.[key]);
                    }}
                    key={item?.[key] + i}
                >
                    <Flr>
                        <Flr>
                            <img src={select === item?.[key] ? icon_active : icon} style={{ marginRight: 6 }} />
                            <F16 color="#fff">{item?.name ?? '--'}</F16>
                        </Flr>
                        <Flr>
                            <F16 marginRight={6}>增速</F16>
                            <GrZs2 value={item?.val ?? '--'} unit={item?.unit ?? '--'}></GrZs2>
                        </Flr>
                    </Flr>
                </div>
            ))}
        </Flc>
    );
};
