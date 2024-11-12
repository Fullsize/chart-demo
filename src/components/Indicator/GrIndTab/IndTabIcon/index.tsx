import React, { useState, memo, useEffect } from 'react';

// image source
import chart from './images/chart.png';
import chartSelect from './images/chart_selected.png';
import map from './images/map.png';
import mapSelect from './images/map_selected.png';
import word from './images/word.png';
import wordSelect from './images/word_selected.png';
import chartVal from './images/chartVal.png';
import chartValSelect from './images/chartVal_selected.png';
import chartZs from './images/chartZs.png';
import chartZsSelect from './images/chartZs_selected.png';

import styles from './index.module.css';
import classNames from 'classnames';

const metas = {
    chart: { defaultIcon: chart, label: '图表', selectedIcon: chartSelect },
    map: { defaultIcon: map, label: '地图', selectedIcon: mapSelect },
    word: { defaultIcon: word, label: '词云', selectedIcon: wordSelect },
    chartVal: { defaultIcon: chartVal, label: '累计值', selectedIcon: chartValSelect },
    chartZs: { defaultIcon: chartZs, label: '累计增速', selectedIcon: chartZsSelect },
} as const;

type KeyType = keyof typeof metas;

export interface IndTabIconProps {
    /**
     * 配置需要显示的Icon
     */
    icons?: KeyType[];
    /**
     * 当前激活key
     */
    active?: KeyType;
    /**
     * 监听icon change事件
     * @param key
     * @returns
     */
    onChange?: (key: string) => void;
}

/**
 * Icon Tab
 * @example <IndTabIcon />
            <IndTabIcon  icons={['word','chart','map']}  onChange={(key)=>console.log('IndIcon:',key)} />
 * @param props 
 * @returns 
 */
const IndTabIcon: React.FC<IndTabIconProps> = (props) => {
    const [active, setActive] = useState(() => props.active || props.icons?.[0] || 'map');

    const { icons = ['map', 'chart'], onChange } = props;

    const renderConf = icons.map((key) => {
        return { ...metas[key], key: key };
    });

    const onChangeTab = (value: KeyType) => {
        setActive(value);
        onChange && onChange(value);
    };

    useEffect(() => {
        setActive(active);
    }, [active]);

    return (
        <>
            <div className={styles['contaner']}>
                {renderConf.map((item) => {
                    const { defaultIcon, selectedIcon, label, key } = item;
                    const imgSrc = active === key ? selectedIcon : defaultIcon;
                    return (
                        <div
                            key={key}
                            onClick={() => onChangeTab(key)}
                            className={classNames(styles['item'], active === key ? styles['active'] : '')}
                        >
                            <img src={imgSrc} />
                            <span className={styles['text']}>{label}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default memo(IndTabIcon);
