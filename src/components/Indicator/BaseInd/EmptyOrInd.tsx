/*
 * @Author: sungy
 * @Date: 2023-12-05 10:05:05
 * @LastEditors: sungy
 * @LastEditTime: 2024-08-29 10:12:11
 * @Description: 显示空指标组件
 */
import React, { useEffect, useState } from 'react';
import Empty from '@/components/Empty';
import { Flr, useSetIndSource } from '@/components/Indicator';

export const EmptyOrInd = ({ apiData, children }: any) => {
    const [msg, setMsg] = useState<any>(null);
    useSetIndSource(apiData);
    useEffect(() => {
        setMsg(null);
        if (apiData?.ok === true) {
            const { empty, data } = apiData?.data ?? {};
            if (empty === true) {
                const msg: any = apiData?.data?.msg;
                setMsg(msg);
            } else if (Array.isArray(data) && data.length <= 0) {
                setMsg('暂无数据');
            } else if (Array.isArray(apiData?.data) && apiData?.data?.length <= 0) {
                setMsg('暂无数据');
            } else {
                setMsg(false);
            }
        } else if (apiData?.ok === false) {
            setMsg('数据异常,请检查接口请求');
        }
    }, [apiData?.sign]);

    return (
        <>
            {msg === false ? (
                children
            ) : msg === null ? (
                <></>
            ) : (
                <Empty
                    msg={
                        Array.isArray(msg) ? (
                            <>
                                {msg.map((item: string, i: number) => {
                                    return i < 3 ? <Flr key={i}>{item}</Flr> : <></>;
                                })}
                                {msg.length > 3 && (
                                    <a
                                        onClick={() => {
                                            setMsg(msg.join('，'));
                                        }}
                                    >
                                        更多...
                                    </a>
                                )}
                            </>
                        ) : (
                            msg
                        )
                    }
                ></Empty>
            )}
        </>
    );
};
