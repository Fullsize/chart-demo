/*
 * @Author: sungy
 * @Date: 2023-08-09 11:24:30
 * @LastEditors: zhipengHuang
 * @LastEditTime: 2024-08-07 19:30:55
 * @Description:企业预测
 */
import React, { useState } from 'react';
import { ExFlc, ExFlr, ExFlaAuto } from '../BaseEx';
import {
    Flr,
    Flc,
    F14,
    F14B,
    F14O5,
    F16,
    F16L2,
    F16B,
    F16BL2,
    F18,
    F18B,
    F20,
    F20B,
    F26,
    F26B,
    F28,
    F28B,
    F32,
    F32B,
    IndIco01,
    IndIco02,
    IndIco03,
    IndIco04,
    IndIco05,
    IndIco06,
    IndIco07,
    IndIco08,
    IndIco09,
    IndIco10,
    IndIco11,
    IndIco12,
    IndIco13,
    IndIco30,
    BaseBg01,
    BaseBg02,
    BaseBgNav,
    BaseBgNavAc,
    BaseP0Nav,
    BaseP0AcNav,
    BaseP1Nav,
    BaseP1AcNav,
    BaseP2Nav,
    BaseP2AcNav,
    IndTitle1,
    FlaIndTitle1,
    IndTitle2,
    FlaIndTitle2,
    FlaIndTitle3,
    IndTitle3,
    IndTitle5,
    FlaIndTitle5,
    IndTitle6,
    FlaIndTitle6,
    IndTitle7,
    FlaIndTitle7,
    FlaIndCardBg1,
    IndSvgLgText,
    IndSvgLgText2,
    IndSvgLgText3,
    IndSvgLgText4,
    IndCssLgText4,
    IndImgBg1,
    IndImgBg2,
    IndImgBg3,
    IndImgBg6,
    IndLineBg,
    IndLineCss,
    IndBtn1Bg,
    IndBtn2Bg,
    IndBtn3Bg,
    IndBtn4Bg,
    IndButtonBg,
    GrIndYjB,
    GrIndYjR,
    GrIndYjG,
    IndPmNum,
    GrValUnit,
    GrValUnit2,
    GrZs,
    GrZs2,
    GrZsF26,
    GrGdpControl,
    IndProgress,
    IndProgress1,
    IndCssLgText5,
    IndCssLgText6,
    IndCssLgText7,
    IndIconNumber,
    GrPm,
    IndTitle8,
    FlaIndTitle8,
    IndTitle9,
    IndBtn01Left,
    IndBtn01LeftAc,
    IndBtn01Right,
    IndBtn01RightAc,
    GrPm2,
    GrIndMapRed,
    GrIndMapGreen,
    GrIndMapBlue,
    GrIndRankRed,
    GrIndRankGreen,
    GrIndRankBlue,
    IndTitle7NoBg,
    IndIcon14,
    IndTitle17,
    FlaIndTitle17,
    IndTitle18,
    FlaIndTitle18,
    IndProgress2,
    TrSxIndCard1,
    TrSxIndCard2,
    TrSxIndCard2Arr,
    TrSxCompareCard,
} from '@/components/Indicator';
import { Radio } from 'antd';
import { trCardMockDataArr } from './mockData';

export default function P() {
    const [trCardSelect, setTrCardSelect] = useState();
    return (
        <>
            <ExFlr gap={20} flexWrap="nowrap">
                <ExFlr title="基础元素">
                    <ExFlaAuto title="字号">
                        <Flc>
                            <F14>F14-字号</F14>
                            <F14B>F14B-字号</F14B>
                            <F14O5>F14O5-字号</F14O5>
                            <F16>F16-字号</F16>
                            <F16B>F16B-字号</F16B>
                            <F16L2>F16L2-字号</F16L2>
                            <F16BL2>F16BL2-字号</F16BL2>
                            <F18>F18-字号</F18>
                            <F18B>F18B-字号</F18B>
                            <F20>F20-字号</F20>
                            <F20B>F20B-字号</F20B>
                            <F26>F26-字号</F26>
                            <F26B>F26B-字号</F26B>
                            <F28>F28-字号</F28>
                            <F28B>F28B-字号</F28B>
                            <F32>F32-字号</F32>
                            <F32B>F32B-字号</F32B>
                        </Flc>
                    </ExFlaAuto>
                    <ExFlc title="渐变文字">
                        <IndSvgLgText style={{ fontSize: 32, height: 50 }}>渐变svg标题</IndSvgLgText>
                        <IndSvgLgText2 style={{ fontSize: 30, height: 50 }}>渐变svg标题</IndSvgLgText2>
                        <IndSvgLgText3 style={{ fontSize: 30, height: 50 }}>渐变svg标题</IndSvgLgText3>
                        <IndSvgLgText4 style={{ fontSize: 30, height: 50 }}>渐变svg标题</IndSvgLgText4>
                        <IndCssLgText4 fontSize="30px">渐变svg标题</IndCssLgText4>
                        <IndCssLgText5 fontSize="30px">渐变svg标题</IndCssLgText5>
                        <IndCssLgText6 fontSize="30px" fontWeight="bold">
                            渐变svg标题
                        </IndCssLgText6>
                        <IndCssLgText7 fontSize="30px" fontWeight="bold">
                            渐变svg标题
                        </IndCssLgText7>
                    </ExFlc>
                    <ExFlc title="排名数字">
                        <IndIconNumber number={1} />
                        <IndIconNumber number={2} />
                        <IndIconNumber number={3} />
                        <IndIconNumber number={4} />
                        <IndIconNumber number={10} />
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
                    <ExFlc title="进度条">
                        <IndProgress2 width={180} percent={90} />
                        <IndProgress2 width={180} percent={70} color="rgba(177, 192, 236, 1)" />
                        <IndProgress2 width={180} percent={65} color="rgba(234, 157, 132, 1)" />
                        <IndProgress2 width={180} percent={30} color="rgba(132, 221, 234, 1)" />
                    </ExFlc>
                    <ExFlr title="图标/背景" width={500}>
                        <IndIco01 />
                        <IndIco02 />
                        <IndIco03 />
                        <IndIco04 />
                        <IndIco05 />
                        <IndIco06 />
                        <IndIco07 />
                        <IndIco08 />
                        <IndIco09 />
                        <IndIco10 />
                        <IndIco11 />
                        <IndIco12 />
                        <IndIco13 />
                        <IndIcon14 title="测试名称" />

                        <IndIco30 />
                        <BaseBgNav>企业信息</BaseBgNav>
                        <BaseBgNavAc>企业信息</BaseBgNavAc>
                        <BaseP0Nav>企业信息</BaseP0Nav>
                        <BaseP0AcNav>企业信息</BaseP0AcNav>
                        <BaseP1Nav>二级菜单</BaseP1Nav>
                        <BaseP1AcNav>二级菜单</BaseP1AcNav>
                        <BaseP2Nav>三级菜单</BaseP2Nav>
                        <BaseP2AcNav>三级菜单</BaseP2AcNav>

                        <IndBtn01Left>示例菜单</IndBtn01Left>
                        <IndBtn01LeftAc>示例菜单</IndBtn01LeftAc>
                        <IndBtn01Right>示例菜单</IndBtn01Right>
                        <IndBtn01RightAc>示例菜单</IndBtn01RightAc>

                        <FlaIndCardBg1></FlaIndCardBg1>
                        <BaseBg01 />
                        <BaseBg02 />

                        <IndBtn2Bg width={22} lineHeight="22px">
                            标
                        </IndBtn2Bg>
                        <IndBtn3Bg width={22} lineHeight="22px">
                            标
                        </IndBtn3Bg>
                        <IndBtn4Bg width={22} lineHeight="22px">
                            标
                        </IndBtn4Bg>
                        <IndBtn1Bg padding="0 10px">
                            <F20>5</F20>个
                        </IndBtn1Bg>
                        <IndBtn2Bg padding="0 10px">
                            <F20>8</F20>个
                        </IndBtn2Bg>
                        <IndBtn3Bg padding="0 10px">
                            <F20>8</F20>个
                        </IndBtn3Bg>
                        <IndBtn4Bg padding="0 10px">
                            <F20>8</F20>个
                        </IndBtn4Bg>

                        <IndButtonBg></IndButtonBg>

                        <GrIndYjB />
                        <GrIndYjR />
                        <GrIndYjG />

                        <ExFlr title="svg icon" style={{ width: '100%' }}>
                            <GrIndMapRed />
                            <GrIndMapGreen />
                            <GrIndMapBlue />

                            <GrIndRankRed />
                            <GrIndRankGreen />
                            <GrIndRankBlue />
                        </ExFlr>

                        <ExFlr title="IndPmNum">
                            <IndPmNum color="#E82828FF">1</IndPmNum>
                            <IndPmNum color="#FEDE48FF">2</IndPmNum>
                            <IndPmNum color="#FFF">3</IndPmNum>
                            <IndPmNum>4</IndPmNum>
                            <IndPmNum color="#ff00f7" lineHeight="25px">
                                自定义
                            </IndPmNum>
                        </ExFlr>
                    </ExFlr>
                    <ExFlr title="标题/背景" width={600}>
                        <IndImgBg1 width={300} />
                        <IndImgBg2 width={300} />
                        <IndImgBg3 width={300} />
                        <IndLineBg width={300} />
                        <IndLineCss width={300} />
                        <IndImgBg6 width={300} />
                    </ExFlr>
                </ExFlr>
                <ExFlr title="标题指标类" maxWidth={1500}>
                    <ExFlr title="山西新增指标卡" style={{ width: '800px' }}>
                        <TrSxIndCard1
                            apiData={{
                                ok: true,
                                sign: 4,
                                data: [
                                    {
                                        unitCode: '',
                                        val: 1,
                                        type_code: 'LX0101',
                                        index_code_full_type_name: '当期值',
                                        unit_name: '个',
                                        index_full_code: 'F01ZB002501LX0101',
                                        index_code_full_cname: '省级重点项目数',
                                        index_code_cname: '省级重点项目数',
                                        time_name: '',
                                        type: null,
                                        updated_by: null,
                                        time_freq: null,
                                        index_code: 'ZB002501',
                                        group_code: 'F01',
                                        group_name: '全部',
                                        explain_code: null,
                                        region_name: '山西省',
                                        region_code: '140000',
                                        last_compare: '亿元',
                                    },
                                ],
                            }}
                        />
                        <TrSxIndCard2Arr
                            apiData={trCardMockDataArr}
                            selected={trCardSelect}
                            onChange={(item) => setTrCardSelect(item)}
                        />
                        <TrSxCompareCard
                            style={{ width: 700 }}
                            apiData={{
                                ok: true,
                                sign: 5,
                                data: [
                                    {
                                        index_code_full_cname: '主导产业年度规划产值',
                                        unit_name: '亿元',
                                        type_code: 'LX0316',
                                        val: 300,
                                        index_code_full_type_name: '年度目标值',
                                        type: 'bar',
                                        time_code: '2024年',
                                        town_name: '杏花村汾酒专业镇',
                                    },
                                    {
                                        index_code_full_cname: '主导产业实际产值',
                                        unit_name: '亿元',
                                        type_code: 'LX0301',
                                        val: 109.93,
                                        index_code_full_type_name: '累计值',
                                        type: 'bar',
                                        time_code: '2024年',
                                        town_name: '杏花村汾酒专业镇',
                                    },
                                ],
                            }}
                        ></TrSxCompareCard>
                    </ExFlr>
                    <ExFlr title="业务指标组合-name/value/unit">
                        <GrValUnit value={34} layout="vertical" unit={'万元'}></GrValUnit>
                        <GrValUnit value={34} unit={'万元'}></GrValUnit>
                        <GrValUnit2 value={34} layout="vertical" unit={'万元'}></GrValUnit2>
                        <GrValUnit2 value={34} unit={'万元'}></GrValUnit2>

                        <GrZs value={34} unit={'万元'}></GrZs>
                        <GrZs value={-25} unit={'%'}></GrZs>
                        <GrZsF26 value={-25} unit={'%'}></GrZsF26>
                        <GrZs2 value={-34} unit={'%'}></GrZs2>
                        <GrZs2 value={34} layout="vertical" unit={'%'}></GrZs2>

                        <GrPm value={34}></GrPm>
                        <GrPm2 value={34}></GrPm2>
                    </ExFlr>
                    <ExFlr title="GDP调节器">
                        <GrGdpControl width={200} value={334.45}></GrGdpControl>
                        <GrGdpControl width={200} value={334.45} step={10}></GrGdpControl>
                    </ExFlr>

                    <ExFlr title="IndTitle1 - 指标/容器" maxWidth={600}>
                        <IndTitle1 width={400} title="标题一"></IndTitle1>
                        <FlaIndTitle1 width={400} height={100} title="标题一(容器)">
                            内容
                        </FlaIndTitle1>
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
                    <ExFlr title="IndTitle2 - 指标/容器" maxWidth={600}>
                        <IndTitle2 width={300} title="标题二"></IndTitle2>
                        <IndTitle2 width={550} title="标题二">
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
                        </IndTitle2>
                        <FlaIndTitle2 width={400} height={100} title="标题二(容器)" titleChildren="标题内容">
                            内容
                        </FlaIndTitle2>
                    </ExFlr>
                    <ExFlr title="IndTitle3 - 指标/容器" maxWidth={600}>
                        <IndTitle3 width={300} title="标题二"></IndTitle3>
                        <IndTitle3 width={550} title="标题二">
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
                        </IndTitle3>
                        <FlaIndTitle3 width={400} height={100} title="标题二(容器)" titleChildren="标题内容">
                            内容
                        </FlaIndTitle3>
                    </ExFlr>
                    <ExFlr title="FlaIndTitle5 - /容器" maxWidth={600}>
                        <IndTitle5 width={300} title="标题二"></IndTitle5>
                        <IndTitle5 width={550} title="标题二">
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
                        </IndTitle5>
                        <FlaIndTitle5 width={400} height={100} title="标题二(容器)" titleChildren="标题内容">
                            内容
                        </FlaIndTitle5>
                    </ExFlr>
                    <ExFlr title="FlaIndTitle6 - /容器" width={1300} maxWidth={1300}>
                        <IndTitle6 width={600} title="标题二"></IndTitle6>
                        <IndTitle6 width={1200} title="标题二">
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
                    <ExFlr title="FlaIndTitle7 - /容器" width={1300} maxWidth={1300}>
                        <IndTitle7 width={600} title="标题二"></IndTitle7>
                        <IndTitle7NoBg width={600} title="标题7-无背景">
                            内容
                        </IndTitle7NoBg>
                        <IndTitle7 width={1200} title="标题二">
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
                    <ExFlr title="FlaIndTitle17 - /容器" width={1300} maxWidth={1300}>
                        <IndTitle17 width={600} title="标题二"></IndTitle17>
                        <IndTitle17 width={1200} title="标题二">
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
                        </IndTitle17>
                        <FlaIndTitle17 width={700} height={100} title="标题二(容器)" titleChildren="标题内容">
                            内容
                        </FlaIndTitle17>
                    </ExFlr>
                    <ExFlr title="IndTitle18 - 指标/容器" maxWidth={600}>
                        <IndTitle18 width={300} title="标题二"></IndTitle18>
                        <IndTitle18 width={550} title={null}>
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
                        </IndTitle18>
                        <IndTitle18 width={550} title="标题二">
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
                        </IndTitle18>
                        <FlaIndTitle18 width={400} height={100} title="标题二(容器)" titleChildren="标题内容">
                            内容
                        </FlaIndTitle18>
                    </ExFlr>
                </ExFlr>
            </ExFlr>
        </>
    );
}
