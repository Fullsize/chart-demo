import styles from './baseIcoElement.module.css';
import React from 'react';
import { Flr, Flc, F22, F24B, F16B, F20B } from '@/components/Indicator';
import { IndSvgLgText2 } from '@/components/Indicator';
import indIcoBg01Url from '@images/ind-ico-bg-01.png';
import indIcoBg02Url from '@images/ind-ico-bg-02.png';

import indSvg01 from '@svg/ind-ico-01.svg';
import indSvg02 from '@svg/ind-ico-02.svg';
import indSvg03 from '@svg/ind-ico-03.svg';
import indSvg04 from '@svg/ind-ico-04.svg';
import indSvg05 from '@svg/ind-ico-05.svg';
import indSvg06 from '@svg/ind-ico-06.svg';
import indSvg07 from '@svg/ind-ico-07.svg';
import indSvg08 from '@svg/ind-ico-08.svg';
import indSvg09 from '@svg/ind-ico-09.svg';
import indSvg10 from '@svg/ind-ico-10.svg';
import indSvg11 from '@svg/ind-ico-11.svg';
import indSvg12 from '@svg/ind-ico-12.svg';
import indSvg13 from '@svg/ind-ico-13.svg';
import indEarth from '@svg/earth.webp';
import indSvg30 from '@svg/ind-ico-30.svg';

import bgNav1Url from '@images/bg_nav_01.png';
import bgNav2Url from '@images/bg_nav_02.png';
import bgNav3Url from '@images/bg_nav_03.png';

import bgNavAc1Url from '@images/bg_nav_ac_01.png';
import bgNavAc2Url from '@images/bg_nav_ac_02.png';
import bgNavAc3Url from '@images/bg_nav_ac_03.png';

import navP001Url from '@images/nav_p0_01.png';
import navP002Url from '@images/nav_p0_02.png';
import navP003Url from '@images/nav_p0_03.png';

import navP0Ac01Url from '@images/nav_p0_ac_01.png';
import navP0Ac02Url from '@images/nav_p0_ac_02.png';
import navP0Ac03Url from '@images/nav_p0_ac_03.png';

import userSvg from '@svg/user.svg';
import iconPositionSvg from '@svg/icon-position.svg';

const FlaIco = ({ bg = indIcoBg01Url, indSvg }: any) => {
    return (
        <Flr
            flex="none"
            alignItems="flex-start"
            justifyContent="center"
            height={64}
            width={64}
            backgroundImage={`url(${bg})`}
        >
            <img alt="" src={indSvg} width={32} height={32} style={{ marginTop: 5, marginLeft: 4 }}></img>
        </Flr>
    );
};

export const IndIco01 = () => {
    return <FlaIco indSvg={indSvg01}></FlaIco>;
};
export const IndIco02 = () => {
    return <FlaIco indSvg={indSvg02}></FlaIco>;
};
export const IndIco03 = () => {
    return <FlaIco indSvg={indSvg03}></FlaIco>;
};
export const IndIco04 = () => {
    return <FlaIco indSvg={indSvg04}></FlaIco>;
};
export const IndIco05 = () => {
    return <FlaIco indSvg={indSvg05}></FlaIco>;
};
export const IndIco06 = () => {
    return <FlaIco indSvg={indSvg06}></FlaIco>;
};
export const IndIco07 = () => {
    return <FlaIco indSvg={indSvg07}></FlaIco>;
};
export const IndIco08 = () => {
    return <FlaIco indSvg={indSvg08}></FlaIco>;
};
export const IndIco09 = () => {
    return <FlaIco indSvg={indSvg09}></FlaIco>;
};
export const IndIco10 = () => {
    return <FlaIco indSvg={indSvg10}></FlaIco>;
};
export const IndIco11 = () => {
    return <FlaIco indSvg={indSvg11}></FlaIco>;
};
export const IndIco12 = () => {
    return <FlaIco indSvg={indSvg12}></FlaIco>;
};
export const IndIco13 = () => {
    return <FlaIco indSvg={indSvg13}></FlaIco>;
};

export const IndIcon14 = ({ title, style }: any) => {
    return (
        <>
            <Flc style={{ gap: 10, position: 'relative' }}>
                <Flc style={{}}>
                    <img src={indEarth} width={160} height={160} style={{ alignSelf: 'center' }} />
                </Flc>
                <Flc
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ transform: 'translateY(-70%)' }}>
                        <F20B>{title}</F20B>
                    </div>
                </Flc>
            </Flc>
        </>
    );
};

export const IndIco30 = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${indIcoBg02Url})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 76,
                width: 86,
                flex: 'none',
            }}
        >
            <img alt="" src={indSvg30} width={32} height={34} style={{ marginBottom: 5 }}></img>
        </div>
    );
};

export const UserIco = ({ ...props }) => {
    return <img alt="" src={userSvg} width={18} height={18} {...props}></img>;
};

export const PositionIco = ({ ...props }) => {
    return <img alt="" src={iconPositionSvg} width={18} height={18} {...props}></img>;
};

const BgNav = ({ bgImg, children, ...props }: any) => {
    return (
        <Flc position="relative" justifyContent="center" {...props}>
            <F22 margin="0px 40px 10px" color="#FFF">
                {children}
            </F22>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    display: 'flex',
                    height: 29,
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${bgImg[0]})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 80,
                        width: 80,
                        minWidth: 80,
                    }}
                ></div>
                <div style={{ backgroundImage: `url(${bgImg[1]})`, flex: 1 }}></div>
                <div
                    style={{
                        backgroundImage: `url(${bgImg[2]})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 80,
                        width: 80,
                        minWidth: 80,
                    }}
                ></div>
            </div>
        </Flc>
    );
};
export const BaseBgNav = ({ children }: any) => {
    return <BgNav bgImg={[bgNav1Url, bgNav2Url, bgNav3Url]}>{children}</BgNav>;
};
export const BaseBgNavAc = ({ children }: any) => {
    return <BgNav bgImg={[bgNavAc1Url, bgNavAc2Url, bgNavAc3Url]}>{children}</BgNav>;
};

const BgP0Nav = ({ bgImg, children, ...props }: any) => {
    return (
        <Flc position="relative" justifyContent="center" {...props}>
            <F24B margin="0px 10px 5px" zIndex={1}>
                <IndSvgLgText2>{children}</IndSvgLgText2>
            </F24B>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    display: 'flex',
                    height: 46,
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${bgImg[0]})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 13,
                        width: 13,
                        minWidth: 13,
                    }}
                ></div>
                <div
                    style={{
                        backgroundImage: `url(${bgImg[1]})`,
                        backgroundSize: '100% 100%',
                        flex: 1,
                    }}
                ></div>
                <div
                    style={{
                        backgroundImage: `url(${bgImg[2]})`,
                        backgroundSize: '100% 100%',
                        maxWidth: 13,
                        width: 13,
                        minWidth: 13,
                    }}
                ></div>
            </div>
        </Flc>
    );
};
export const BaseP0Nav = ({ children }: any) => {
    return <BgP0Nav bgImg={[navP001Url, navP002Url, navP003Url]}>{children}</BgP0Nav>;
};

export const BaseP0AcNav = ({ children }: any) => {
    return <BgP0Nav bgImg={[navP0Ac01Url, navP0Ac02Url, navP0Ac03Url]}>{children}</BgP0Nav>;
};

export const BaseP1Nav = ({ children }: any) => {
    return (
        <div className={[styles['nav-container'], styles['nav-p1']].join(' ')}>
            <F22 color="#95C8FD" textShadow="0px 2px 0px rgba(1, 3, 5, 0.5)" marginBottom={4}>
                {children}
            </F22>
        </div>
    );
};
export const BaseP1AcNav = ({ children }: any) => {
    return (
        <div className={[styles['nav-container'], styles['nav-p1-ac']].join(' ')}>
            <F22 color="#FFFFFF" textShadow="0px 2px 0px #033796">
                {children}
            </F22>
        </div>
    );
};

export const BaseP2Nav = ({ children }: any) => {
    return (
        <div className={[styles['nav-container'], styles['nav-p2']].join(' ')}>
            <F16B color="#95C8FD" textShadow="0px 2px 0px rgba(1, 3, 5, 0.5)">
                {children}
            </F16B>
        </div>
    );
};

export const BaseP2AcNav = ({ children }: any) => {
    return (
        <div className={[styles['nav-container'], styles['nav-p2-ac']].join(' ')}>
            <F16B color="#FFFFFF" textShadow="0px 2px 0px #033796">
                {children}
            </F16B>
        </div>
    );
};
