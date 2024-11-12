import React from 'react';
import { Flc, IFlaIndTitleProps, F18B, IndCssLgText7 } from '@/components/Indicator';
import bg_url from './bg.png';

export const FlaIndTitle13 = ({ title, titleChildren, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc
            style={{
                boxSizing: 'border-box',
                width: 340,
                height: 680,
                background: `url(${bg_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                // padding: 20,
                paddingTop: 25,
                ...props.style,
            }}
            // {...props}
        >
            {title && (
                <IndCssLgText7 textAlign="center" fontSize={20} fontWeight="bold">
                    {title}
                </IndCssLgText7>
            )}
            <Flc
                width="100%"
                flex={1}
                boxSizing="border-box"
                overflow="hidden auto"
                padding="10px 5px 5px 5px"
                {...childrenStyle}
            >
                {children}
            </Flc>
        </Flc>
    );
};
