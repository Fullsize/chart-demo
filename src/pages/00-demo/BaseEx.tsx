import React from 'react';
import { Flc, Flr, F20B, F16B } from '@/components/Indicator';

export function ExFlc({ children, ...props }: any) {
    return (
        <Flc justifyContent="normal" alignItems="flex-start" flexWrap="wrap" flex={1} {...props}>
            <Ex {...props}>{children}</Ex>
        </Flc>
    );
}

export function ExFlr({ children, ...props }: any) {
    return (
        <Flr justifyContent="normal" alignItems="flex-start" flexWrap="wrap" flex={1} {...props}>
            <Ex {...props}>{children}</Ex>
        </Flr>
    );
}

export function ExFlaAuto({ children, ...props }: any) {
    return (
        <div
            style={{
                padding: 5,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                ...props,
            }}
        >
            {children}
        </div>
    );
}

export function ExContent({ children }: any) {
    let cType;
    if (typeof children?.type == 'string') {
        cType = children?.type;
    } else {
        cType = children?.type?.name || children?.type?.type?.name;
    }
    const isEx = cType == 'ExFlc' || cType == 'ExFlr' || cType == 'ExFlaAuto';

    return children ? (
        <Flc justifyContent="center" border="2px solid #ffffff36" borderRadius={5} margin={10}>
            {isEx ? (
                <F20B
                    backgroundColor="#ffffff12"
                    borderBottom="2px solid #ffffff36"
                    textAlign="center"
                    lineHeight={'40px'}
                    color="orange"
                >
                    {children?.props?.title}
                </F20B>
            ) : (
                <F16B
                    backgroundColor="#ffffff12"
                    borderBottom="2px solid #ffffff36"
                    textAlign="left"
                    padding="0 10px"
                    lineHeight={'30px'}
                >
                    {cType}
                </F16B>
            )}
            {
                <Flr margin="10px" justifyContent="center">
                    {children}
                </Flr>
            }
        </Flc>
    ) : (
        <></>
    );
}

export function Ex({ children }: any) {
    if (Array.isArray(children)) {
        return (
            <>
                {children?.map?.((item: any, i: any) => {
                    return <ExContent key={i}>{item}</ExContent>;
                })}
            </>
        );
    } else {
        return <ExContent>{children}</ExContent>;
    }
}

let sign = 1;
/**
 * @deprecated 请使用新的函数 `getMockData` 代替。
 */
export const useMockData = function (data: any) {
    return {
        ok: true,
        data: data,
        sign: sign++,
    };
};

export function getMockData(data: any) {
    return {
        ok: true,
        data: data,
        sign: sign++,
    };
}
