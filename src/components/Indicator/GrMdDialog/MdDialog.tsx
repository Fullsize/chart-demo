/*
 * @Author: sungy
 * @Date: 2023-08-10 10:52:18
 * @LastEditors: sungy
 * @LastEditTime: 2024-05-14 15:13:42
 * @Description: 河北项目块标题
 */
import React, { memo, useContext, useEffect, useState } from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { EcharsThemeProvider } from '@/components/BaseEchars';

function MdDialog({ open, onShow, onClose, content, style, icon, iconStyle = {} }: any) {
    const [contShow, setContShow] = useState(false);
    const [mdShow, setMdshow] = useState(false);

    useEffect(() => {
        if (open) {
            setContShow(true);
            setTimeout(() => {
                setMdshow(true);
            }, 15);
        } else {
            setMdshow(false);
            setTimeout(() => {
                setContShow(false);
            }, 150);
        }
    }, [open]);

    return (
        <>
            {contShow &&
                ReactDOM.createPortal(
                    <div style={{ display: 'block', ...style }}>
                        <div className={mdShow ? 'md-show md-modal md-effect-16' : 'md-modal md-effect-16'}>
                            <div className="md-content">
                                <EcharsThemeProvider value="ectFgw">{content}</EcharsThemeProvider>
                            </div>
                        </div>
                        <div
                            className="md-overlay"
                            onClick={(event: any) => {
                                event.stopPropagation();
                                onClose(false);
                            }}
                        ></div>
                    </div>,
                    document.body,
                )}
            <div
                style={{ cursor: 'pointer', ...iconStyle }}
                onClick={(event: any) => {
                    event.stopPropagation();
                    onShow(true);
                }}
            >
                {icon}
            </div>
        </>
    );
}

export default memo(MdDialog);
