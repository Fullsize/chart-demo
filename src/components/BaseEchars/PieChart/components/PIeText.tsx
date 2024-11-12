import { F16, Flr, GrValUnit } from "@/components/Indicator";
import { IPieDataModel } from "..";

interface IDisplayInfo {
    displayInfo: IPieDataModel
}
import styles from './index.module.css';

/**
 * 显示占比的文字效果  这里可以同时写N种展示效果以及 不同的背景组合
 * @param props 
 * @returns 
 */

const PieText = (props: IDisplayInfo) => {
    const { name, value , zb_val, unit_name, val1, unit_name1 } = props.displayInfo;
    return (
        <>
            <div className={styles['bgImgDiv']}></div>
            <div className={styles['info']}>
                <F16 color="#fff">{name}</F16>
                <Flr>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            marginRight: 10,
                        }}
                    >
                        占比
                    </span>
                    <GrValUnit value={zb_val} unit={unit_name1 || "%"}></GrValUnit>
                </Flr>
            </div>
        </>
    );
};
export default PieText;