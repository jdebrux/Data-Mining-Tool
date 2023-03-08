import React from 'react';
import Plot from 'react-plotly.js';

function ClusterPlot({ clusters, centroids }) {
    const data = [
        {
            x: clusters.map(c => c[0]),
            y: clusters.map(c => c[1]),
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: clusters.map(c => c[2]),
                size: 10,
                opacity: 0.8
            }
        },
        {
            x: centroids.map(c => c[0]),
            y: centroids.map(c => c[1]),
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: 'black',
                size: 12,
                symbol: 'x'
            }
        }
    ];

    const layout = {
        width: 600,
        height: 400,
        title: 'KMeans Clustering'
    };

    return <Plot data={data} layout={layout} />;
}

export default ClusterPlot;
