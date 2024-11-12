/*
 * @Author: sungy
 * @Date: 2023-08-01 14:55:43
 * @LastEditors: sungy
 * @LastEditTime: 2023-09-25 11:52:09
 * @Description: loading组件
 */
import React from 'react';
import styles from './index.module.css';

export default function Loading() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div
                className={styles['loading-container']}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                }}
            >
                <div className={styles['loading-wave']}>
                    <div className={styles['rect1']}></div>
                    <div className={styles['rect2']}></div>
                    <div className={styles['rect3']}></div>
                    <div className={styles['rect4']}></div>
                    <div className={styles['rect5']}></div>
                </div>
            </div>
        </div>
    );
}
