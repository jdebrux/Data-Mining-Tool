import React from 'react';
import Plot from 'react-plotly.js';

const ResidualPlot = ({ regressionData }) => {
    const residuals = regressionData.y.map((y, i) => y - regressionData.predictions[i]);
    const layout = {
        title: 'Residual Plot',
        xaxis: { title: 'X' },
        yaxis: { title: 'Residuals' },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'white' },
        hovermode: 'closest',
        margin: { t: 50 },
    };
    const colorscale = [
        [0, '#440154'],
        [0.25, '#3f4d9e'],
        [0.5, '#21908dff'],
        [0.75, '#5dc963'],
        [1, '#fde725']
    ];
    return (
        <Plot
            data={[
                {
                    x: regressionData.X,
                    y: residuals,
                    type: 'scatter',
                    mode: 'markers',
                    marker: {
                        color: residuals,
                        colorscale: colorscale,
                        colorbar: {
                            title: 'Residuals',
                            thickness: 20,
                            tickfont: { size: 12 },
                        },
                        size: 8,
                        symbol: 'circle',
                        line: { width: 0.5, color: '#444' },
                        opacity: 0.8,
                    }
                }
            ]}
            layout={layout}
            width={1000}
            height={700}
        />
    );
};

export default ResidualPlot;
