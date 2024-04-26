import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type ChartBarProps<T> = {
    data: T[];
    color: string;
    labelField: keyof T;
    showItems: Array<keyof T>;
    directionValues?: 'left' | 'right';
};

export default function ChartBar<T>({ data, color, labelField, showItems, directionValues = 'left'}: ChartBarProps<T>) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey={labelField as string} stroke={color} />
                <YAxis yAxisId="left" orientation="left" stroke={color} />
                <YAxis yAxisId="right" orientation="right" stroke={color} />
                <Tooltip cursor={{ fill: color, opacity: 0.1 }} />
                {showItems.map((key, index) => (
                    <Bar key={index} yAxisId={directionValues} dataKey={key as string} style={
                        {
                            fill: color,
                        } as React.CSSProperties
                    } />
                ))}
            </BarChart>
        </ResponsiveContainer>
    )
}
