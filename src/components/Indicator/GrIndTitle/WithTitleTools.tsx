/*
 * @Author: sungy
 * @Date: 2024-06-25 14:37:54
 * @LastEditors: sungy
 * @LastEditTime: 2024-10-24 19:55:09
 * @Description:
 */

import React, { useState, useRef, useContext } from 'react';
import { EcharsToolsProvider } from '@/components/BaseEchars/EcharsToolsProvider';
import { Flr } from '../BaseElement';
import { FlaIndTitle7 } from './index';
import { IndSourceProvider, IndSourceContext } from '@/components/Indicator';
import _ from 'lodash';
import { useIndSource } from './IndSource';
export function withTitleChildrenTools(Components: any) {
    const C = ({ titleChildren, title, ...props }: any) => {
        const [tools, setTools] = useState<any>();
        //有些代码不需要小工具以及titlechildren 只写了一个背景 所以返回为空 不允许有元素返回以造成占位问题
        const renderTitleChildren = (title: any,titleChildren: any, tools: any) => {
            if((titleChildren || title) && tools) {
                return (
                    <Flr gap={15} marginLeft={'auto'}>
                        {titleChildren}
                        {tools}  
                    </Flr>
                );
            }else {
                return titleChildren;
            }

        };
        return (
            <EcharsToolsProvider
                title={title}
                value={(c: React.ReactNode) => {
                    setTools(c);
                }}
            >
                {Components == FlaIndTitle7 && titleChildren && tools ? (
                    <Components title={title} {...props} tools={titleChildren} titleChildren={tools}></Components>
                ) : (
                    <Components
                        title={title}
                        {...props}
                        titleChildren={renderTitleChildren(title, titleChildren, tools)}
                    ></Components>
                )}
            </EcharsToolsProvider>
        );
    };
    return C;
}
function compacteArrStr(v1: any, v2: any) {
    const m = `${v1 ?? ''},${v2 ?? ''}`;
    const trMArr: any = m?.split?.(',');
    const trCompact: any = _.compact(trMArr);
    return _.uniq(trCompact)?.join(',');
}

export function withTitleIndSource(Components: any) {
    const C = ({ ...props }: any) => {
        const ref = useRef<any>({});
        const [indSource, setIndSource] = useState<any>();
        const indStr = useIndSource(indSource);
        const setIndHooks: any = useContext(IndSourceContext);
        return (
            <IndSourceProvider
                value={(id: any, hooksApi: any) => {
                    setIndHooks?.(id, hooksApi);

                    const param: any = hooksApi?.getApiParams?.();
                    if (param) {
                        const { indexFullCodeList, indexCodeList, typeCodeList, groupCodeList } = param?.params ?? {};
                        ref.current = {
                            indexFullCodeList: compacteArrStr(ref.current.indexFullCodeList, indexFullCodeList),
                            indexCodeList: compacteArrStr(ref.current.indexCodeList, indexCodeList),
                            typeCodeList: compacteArrStr(ref.current.typeCodeList, typeCodeList),
                            groupCodeList: compacteArrStr(ref.current.groupCodeList, groupCodeList),
                        };
                    }
                    setIndSource(ref.current);
                }}
            >
                <Components indSource={indStr} {...props}></Components>
            </IndSourceProvider>
        );
    };
    return C;
}
