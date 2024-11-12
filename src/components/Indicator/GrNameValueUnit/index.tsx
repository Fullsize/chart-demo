import { F14, F26, Flc, Flr } from '@/components/Indicator';

export const GrNameValueUnit1 = (props: { name: string; value: string; unit: string }) => {
    return (
        <Flc
            style={{
                width: '155px',
                height: '75px',
                boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.23)',
                borderRadius: '6px',
                border: '1px solid #323F57',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
            }}
        >
            <span style={{ color: '#D2E9FF' }}>{props.name}</span>
            <Flr style={{ alignItems: 'baseline', gap: 5 }}>
                <F26 color="#FFF">{props.value ?? '--'} </F26>
                <F14> {props.unit ?? '--'} </F14>
            </Flr>
        </Flc>
    );
};
