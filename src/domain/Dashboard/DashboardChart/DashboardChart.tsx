import React from 'react'
import { LineChart, Line, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface Props {
    chartData: any[];
}

const DashboardChart: React.FunctionComponent<Props> = ({ chartData }) => {
    const chartMargins = {
        top: 5, right: 30, left: 20, bottom: 5,
    }
    return (
        <ResponsiveContainer width="95%" height="100%" minWidth="0">
            <LineChart data={chartData} margin={chartMargins}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default DashboardChart;
