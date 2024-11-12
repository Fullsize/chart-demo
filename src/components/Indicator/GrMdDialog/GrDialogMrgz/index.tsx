import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import MdDialog from '../MdDialog';
import { Flc, IndCssLgText14 } from '@/components/Indicator';
import bg from './bg1.png';
import styles from './index.module.css';
import icoUrl from '@/components/Indicator/GrIndTitle/GrIndTitle10/icon.png';

export const GrDialogMrgz = forwardRef(
    (
        {
            title,
            children,
            icon,
            size = 'normal',
            iconStyle,
        }: {
            title: any;
            children?: any;
            size?: 'normal' | 'big';
            icon?: any;
            iconStyle?: any;
        },
        ref: any,
    ) => {
        const [dialogTitle, setDialogTitle] = useState(title);
        const [open, setOpen] = useState(false);
        const sizeInfo =
            size === 'normal'
                ? {
                    width: 1000,
                    height: 540,
                }
                : {
                    width: 1590,
                    height: 877,
                };

        useImperativeHandle(ref, () => ({
            close: () => {
                setOpen(false);
            },
            open: () => {
                setOpen(true);
            },
            setTitle: (title: any) => {
                setDialogTitle(title);
            },
        }));

        useEffect(() => {
            setDialogTitle(title);
        }, [title]);

        return (
            <MdDialog
                open={open}
                onShow={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                iconStyle={iconStyle}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                icon={icon}
                content={
                    <Flc
                        width={sizeInfo.width}
                        height={sizeInfo.height}
                        gap={30}
                        style={{
                            backgroundImage: `url(${bg})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            padding: '14px 32px',
                            boxSizing: 'border-box',
                            position: 'relative',
                        }}
                    >
                        <div className={styles.close} onClick={() => setOpen(false)}></div>
                        <IndCssLgText14 fontSize="26px" display={'flex'} justifyContent={'center'}>
                            {/* <F26B textAlign="center" color="#fff"> */}
                            <img src={icoUrl} width={36} height={36} alt=""></img>
                            {dialogTitle}
                            {/* </F26B> */}
                        </IndCssLgText14>
                        <Flc flex={1} overflow="hidden">
                            {children}
                        </Flc>
                    </Flc>
                }
            ></MdDialog>
        );
    },
);
