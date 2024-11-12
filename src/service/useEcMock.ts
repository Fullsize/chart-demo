import React, { useState } from 'react';
import { generateUUID } from '@/utils';

let sign = 1;
export const useEcMock = function (data: any) {
    return [
        {
            ok: true,
            data: data,
            sign: sign++,
        },
        () => {},
    ];
};

export const useEcMockF = function (
    res: {
        loading: boolean;
        error?: any;
        data: any;
    },
    data: any,
) {
    return {
        loading: res ? res?.loading : true,
        ok: !res?.loading && !res?.error,
        data: data,
        sign: generateUUID(),
    };
};
