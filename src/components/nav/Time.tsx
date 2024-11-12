import React, { useState, useEffect } from 'react';
export default function Time() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                color: '#D8D8D8',
                fontWeight: 400,
                fontSize: 12,
            }}
        >
            <div>{`${year}-${month}-${day}`}</div>
            <div style={{ marginLeft: 5 }}>{date.toLocaleTimeString()}</div>
        </div>
    );
}
