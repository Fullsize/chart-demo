import React, { ReactNode, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import MdDialog from './../MdDialog';
import { Flr, FlaIndTitle10Dialog } from '@/components/Indicator';
import dialogBgUrl from './../GrIndDialog/ind_dialog_max_bg2.png';
import iconClose from "./../GrIndDialog/ind_dialog_close_2.png";

const ScaleContent = ({ children, scaleValue = 2 }: any) => {
    return (
        <div
            style={{
                width: `${93 / scaleValue}%`,
                height: `${100 / scaleValue}%`,
                transform: `scale(${scaleValue})`,
                transformOrigin: 'left top',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: "0px 40px"
                
            }}
        >
            {children}
        </div>
    );
};
export function GrComMaxDialog({
    expandScale = true,
    children,
    icon,
    title,
    scaleValue,
    ...props
}: {
    title: any;
    expandScale?: boolean;
    children?: ReactNode;
    icon: any;
    scaleValue?: number;
}) {
    const [open, setOpen] = useState(false);
    return (
        <MdDialog
            open={open}
            onShow={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            {...props}
            icon={icon}
            content={
                <FlaIndTitle10Dialog
                    title={title}
                    childrenStyle={{ height: '100%' }}
                    width={1600}
                    height={700}
                    backgroundImage={`url(${dialogBgUrl})`}
                    titleChildren={
                        <Flr>
                            <img src={iconClose}
                                className="amplify"
                                style={{
                                    fontSize: '30px',
                                    color: 'rgba(95, 151, 255, 1)',
                                    cursor: "pointer"
                                }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setOpen(false);
                                }}
                            ></img>
                        </Flr>
                    }
                >
                    {expandScale ? <ScaleContent scaleValue={scaleValue}>{children}</ScaleContent> : children}
                </FlaIndTitle10Dialog>
            }
        ></MdDialog>
    );
}
