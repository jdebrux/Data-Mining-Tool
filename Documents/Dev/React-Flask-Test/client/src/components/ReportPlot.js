import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Typography from '@mui/material/Typography';

const ReportPlot = ({ data }) => {
    const chartData = [
        { name: 'f1-score', value: data['f1-score'] },
        { name: 'precision', value: data.precision },
        { name: 'recall', value: data.recall },
    ];

    return (
        <div>
            <Typography variant="h5" align="center" gutterBottom>
                Performance Metrics
            </Typography>
            <BarChart width={400} height={250} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default ReportPlot;
