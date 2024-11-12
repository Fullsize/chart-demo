import React, { useState } from 'react';
import MdDialog from '../MdDialog';
import { Flc, F26B, IndCssLgText14 } from '@/components/Indicator';
import bg from './bg.png';
import styles from './index.module.css';
import icoUrl from '@/components/Indicator/GrIndTitle/GrIndTitle10/icon.png';

export function GrDialogMrgzBig({ title, children, icon ,setIsVisible,isVisible}: { title: any; children?: any; icon?: any;setIsVisible?: any ,isVisible?:any}) {
    // const [open, setOpen] = useState(false);
    return (
        <MdDialog
            open={isVisible}
            onShow={() => {
                setIsVisible(true);
            }}
            onClose={() => {
                setIsVisible(false);
            }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            icon={icon}
            content={
                <Flc
                    width={1590}
                    height={877}
                    gap={30}
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        padding: '43px 32px',
                        boxSizing: 'border-box',
                        position: 'relative',
                    }}
                >
                    <div className={styles.close} onClick={() => setIsVisible(false)}></div>
                    <IndCssLgText14 fontSize="26px" display={'flex'} justifyContent={'center'} height={'60px'} >
                        {/* <F26B textAlign="center" color="#fff"> */}
                        <img src={icoUrl} width={36} height={36} alt=""></img>{title}
                        {/* </F26B> */}
                    </IndCssLgText14>
                    <Flc flex={1} padding={'0 45px'}>{children}</Flc>
                </Flc>
            }
        ></MdDialog>
    );
}
