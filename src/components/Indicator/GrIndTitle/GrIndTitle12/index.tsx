import React from 'react';
import { Flr, Flc, IFlaIndTitleProps, IIndTitleProps, IndCssLgText5 } from '@/components/Indicator';
import bg_url from './bg.png';

export const IndTitle12 = ({ title, ...props }: IIndTitleProps) => {
    return (
        <Flr
            style={{
                width: 460,
                height: 28,
                backgroundImage: `url(${bg_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'auto 100%',
                paddingLeft: 28,
            }}
            {...props}
        >
            <IndCssLgText5 fontSize="16px" overflow="visible" whiteSpace="break-spaces">
                {title}
            </IndCssLgText5>
        </Flr>
    );
};

export const FlaIndTitle12 = ({ title, titleChildren, children, childrenStyle, ...props }: IFlaIndTitleProps) => {
    return (
        <Flc overflow="hidden" boxSizing="border-box" {...props}>
            <IndTitle12 title={title}></IndTitle12>
            <Flc
                width="100%"
                flex={1}
                justifyContent="flex-start"
                boxSizing="border-box"
                overflow="hidden"
                padding={10}
                {...childrenStyle}
                color={'#D2E9FF'}
            >
                {children}
            </Flc>
        </Flc>
    );
};
