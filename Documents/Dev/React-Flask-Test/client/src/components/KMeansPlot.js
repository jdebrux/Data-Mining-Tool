import React from 'react';
import Plot from 'react-plotly.js';

const KMeansPlot = ({ kmeansData }) => {
    const centroidTraces = [{
        x: kmeansData.centroids[0],
        y: kmeansData.centroids[1],
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'white', symbol: 'x' },
        line: { width: 5 },
        name: 'Centroids'
    }];

    const clusterTraces = kmeansData.clusters.map((cluster, idx) => ({
        x: cluster[0],
        y: cluster[1],
        type: 'scatter',
        mode: 'markers',
        marker: { color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` },
        line: { width: 2 },
        name: `Cluster ${idx + 1}`
    }));

    const plotData = [...centroidTraces, ...clusterTraces];

    const layout = {
        title: 'K-Means Clustering',
        xaxis: { title: 'X' },
        yaxis: { title: 'Y' },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'white' },
    };

    return (
        <Plot
            data={plotData}
            layout={layout}
            width={1000}
            height={700}
        />
    );
};

export default KMeansPlot;
