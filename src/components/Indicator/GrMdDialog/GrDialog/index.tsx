import React, { useState } from 'react';
import { FullscreenOutlined, CloseCircleOutlined } from '@ant-design/icons';
import MdDialog from '../MdDialog';
import { Flr, FlaIndTitle10Dialog } from '@/components/Indicator';

export function GrDialog({ title, children, icon }: { title: any; children?: any; icon?: any }) {
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
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            icon={icon}
            content={
                <FlaIndTitle10Dialog
                    title={title}
                    width={816}
                    height={512}
                    childrenStyle={{ height: '100%' }}
                    titleChildren={
                        <Flr>
                            <CloseCircleOutlined
                                className="amplify"
                                style={{
                                    fontSize: '30px',
                                    color: 'rgba(95, 151, 255, 1)',
                                }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setOpen(false);
                                }}
                            ></CloseCircleOutlined>
                        </Flr>
                    }
                >
                    {children}
                </FlaIndTitle10Dialog>
            }
        ></MdDialog>
    );
}
