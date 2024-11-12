/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-12 11:30:57
 * @Description:企业预测
 */
import React from 'react';
import { ExFlc, ExFlr } from '../BaseEx';
import {
    IndTitle6,
    FlaIndTitle6,
    IndTitle7,
    FlaIndTitle7,
    GrZs2,
    GrPm2,
    IndTitle8,
    FlaIndTitle8,
    IndTitle12,
    FlaIndTitle12,
    FlaIndTitle13,
    IndTitle9,
    BaseBg01,
    BaseBg02,
    FlaIndCardBg1,
    FlaIndCardBg1Ac,
    IndProgress,
    IndProgress1,
    IndCssLgText5,
    IndCssLgText6,
    IndCssLgText7,
    IndCssLgText9,
    IndCssLgText10,
    IndIconNumber,
    IndBtn01Left,
    IndBtn01LeftAc,
    IndBtn01Right,
    IndBtn01RightAc,
    GrZs2Bg,
    GrValUnit2,
    GrValUnitProgress1,
    GrCollapsePanel2,
    GrIndText,
    GrIndTextHighlight,
    GrIndTextHtml,
    GrIndTitle14,
    GrIndTitle15,
    GrIndTextHtml_RE,
} from '@/components/Indicator';
import { Radio } from 'antd';

export default function P() {
    return (
        <ExFlc>
            <ExFlr title="基础元素">
                <ExFlc title="渐变文字">
                    <IndCssLgText5 fontSize="30px">渐变svg标题</IndCssLgText5>
                    <IndCssLgText6 fontSize="30px" fontWeight="bold">
                        渐变svg标题
                    </IndCssLgText6>
                    <IndCssLgText7 fontSize="30px" fontWeight="bold">
                        渐变svg标题
                    </IndCssLgText7>
                    <IndCssLgText9 fontSize="30px" fontWeight="bold">
                        渐变svg标题
                    </IndCssLgText9>
                    <IndCssLgText10 fontSize="30px" fontWeight="bold">
                        渐变svg标题
                    </IndCssLgText10>
                </ExFlc>
                <ExFlc title="排名数字">
                    <IndIconNumber number={1} />
                    <IndIconNumber number={2} />
                    <IndIconNumber number={3} />
                    <IndIconNumber number={4} />
                    <IndIconNumber number={10} />
                    <IndIconNumber number={12} />
                </ExFlc>
                <ExFlc title="进度条">
                    <IndProgress width={180} percent={100} />
                    <IndProgress width={180} percent={40} color="yellow" />
                    <IndProgress width={180} percent={70} color="#6cf619" />
                    <IndProgress width={180} percent={65} color="#e12ae4" />
                </ExFlc>
                <ExFlc title="进度条">
                    <IndProgress1 width={180} percent={90} color="yellow" />
                    <IndProgress1 width={180} percent={70} color="#fff" />
                    <IndProgress1 width={180} percent={65} color="rgba(230, 140, 10, 1)" />
                    <IndProgress1 width={180} percent={30} />
                </ExFlc>
                <ExFlr title="导航类" width={300}>
                    <IndBtn01Left>示例菜单</IndBtn01Left>
                    <IndBtn01LeftAc>示例菜单</IndBtn01LeftAc>
                    <IndBtn01Right>示例菜单</IndBtn01Right>
                    <IndBtn01RightAc>示例菜单</IndBtn01RightAc>
                </ExFlr>
                <ExFlr title="图标/背景" width={500}>
                    <FlaIndCardBg1></FlaIndCardBg1>
                    <FlaIndCardBg1Ac></FlaIndCardBg1Ac>
                    <BaseBg01 />
                    <BaseBg02 />
                </ExFlr>
            </ExFlr>
            <ExFlr title="标题指标类" maxWidth={1300}>
                <ExFlr title="高亮文字组件">
                    <GrIndText width={300}>
                        2023年全年，建材工业上市企业数量为
                        <GrIndTextHighlight>1210</GrIndTextHighlight>
                        家，较2023年前三季度新增
                        <GrIndTextHighlight>16</GrIndTextHighlight>
                        家。
                    </GrIndText>
                    <GrIndTextHtml width={300}>
                        {'2024年一季度，医药制造业上市企业数<span>4</span>家，较2023年全年新增<span>0<span>家'}
                    </GrIndTextHtml>

                    <GrIndTextHtml_RE width={300}>
                        {'2024年一季度，医药制造业上市企业数<span>4</span>家，较2023年全年新增<span>0<span>家'}
                    </GrIndTextHtml_RE>
                </ExFlr>
                <ExFlr title="业务指标组合-name/value/unit">
                    <GrValUnit2 value={2500} unit={'万元'}></GrValUnit2>
                    <GrZs2 value={34} unit={'%'}></GrZs2>
                    <GrZs2 value={-34} unit={'%'} lastCompare="up"></GrZs2>
                    <GrZs2 value={34} unit={'%'} lastCompare="down"></GrZs2>
                    <GrZs2 value={34} unit={'%'} lastCompare="equal"></GrZs2>
                    <GrZs2Bg value={34} unit={'%'} lastCompare="equal"></GrZs2Bg>
                    <GrValUnitProgress1 value={34} unit={'%'}></GrValUnitProgress1>
                    <GrPm2 value={34}></GrPm2>
                </ExFlr>

                <ExFlr title="FlaIndTitle6 - /容器" width={1100} maxWidth={1100}>
                    <IndTitle6 width={600} title="标题二"></IndTitle6>
                    <IndTitle6 width={1000} title="标题二">
                        {
                            <Radio.Group>
                                {['选项一', '选项二'].map((item) => {
                                    return (
                                        <Radio key={item} value={item}>
                                            {item}
                                        </Radio>
                                    );
                                })}
                            </Radio.Group>
                        }
                    </IndTitle6>
                    <FlaIndTitle6 width={700} height={100} title="标题二(容器)" titleChildren="标题内容">
                        内容
                    </FlaIndTitle6>
                </ExFlr>
                <ExFlr title="FlaIndTitle7 - /容器" width={1100} maxWidth={1100}>
                    <IndTitle7 width={600} title="标题二"></IndTitle7>
                    <IndTitle7 width={1000} title="标题二">
                        {
                            <Radio.Group>
                                {['选项一', '选项二'].map((item) => {
                                    return (
                                        <Radio key={item} value={item}>
                                            {item}
                                        </Radio>
                                    );
                                })}
                            </Radio.Group>
                        }
                    </IndTitle7>
                    <FlaIndTitle7 width={700} height={100} title="标题二(容器)" titleChildren="标题内容">
                        内容
                    </FlaIndTitle7>
                </ExFlr>
                <ExFlr title="IndTitle8 - 指标" maxWidth={600}>
                    <IndTitle8 width={400} title="标题一"></IndTitle8>
                    <FlaIndTitle8 title="标题二(容器)" titleChildren="202312">
                        内容
                    </FlaIndTitle8>
                </ExFlr>
                <ExFlr title="IndTitle9 - 指标" maxWidth={600}>
                    <IndTitle9 title="标题二"></IndTitle9>
                </ExFlr>

                <ExFlr title="IndTitle14 - 指标">
                    <GrIndTitle15
                        title="标题二(容器)"
                        style={{ width: 400, height: 200 }}
                        bgStyle={{
                            transform: 'scaleX(-1)',
                        }}
                    >
                        <div style={{ height: 100 }}>内容</div>
                    </GrIndTitle15>
                    <GrIndTitle15 title="标题二(容器)" style={{ width: 400, height: 200 }}>
                        <div style={{ height: 100 }}>内容</div>
                    </GrIndTitle15>
                    <GrIndTitle14 title="标题二(容器)" titleChildren="标题内容" style={{ width: 400, height: 200 }}>
                        <div style={{ height: 100 }}>内容</div>
                    </GrIndTitle14>
                </ExFlr>
                <ExFlr title="IndTitle12 - 指标">
                    <IndTitle12 title="标题一" width={300}></IndTitle12>
                    <FlaIndTitle12 title="标题二(容器)">
                        <div style={{ height: 100 }}>内容</div>
                    </FlaIndTitle12>
                </ExFlr>
                <ExFlr title="IndTitle13 - 指标">
                    <FlaIndTitle13 title="标题13 - (容器)">
                        <div style={{ height: 1000 }}>内容</div>
                        <div style={{ height: 1000 }}>内容</div>
                    </FlaIndTitle13>
                    <FlaIndTitle13 title={null} height={930}>
                        <GrCollapsePanel2 header="地区生产总值">
                            <div style={{ height: 300 }}>内容</div>
                        </GrCollapsePanel2>
                        <GrCollapsePanel2 header="地区生产总值">
                            <div style={{ height: 300 }}>内容</div>
                        </GrCollapsePanel2>
                        <GrCollapsePanel2 header="地区生产总值">
                            <div style={{ height: 300 }}>内容</div>
                        </GrCollapsePanel2>
                        <GrCollapsePanel2 header="地区生产总值">
                            <div style={{ height: 300 }}>内容</div>
                        </GrCollapsePanel2>
                    </FlaIndTitle13>
                </ExFlr>
                <ExFlr title="折叠面板">
                    <GrCollapsePanel2 header="地区生产总值">
                        <div style={{ height: 300 }}>内容</div>
                    </GrCollapsePanel2>
                </ExFlr>
            </ExFlr>
        </ExFlc>
    );
}
