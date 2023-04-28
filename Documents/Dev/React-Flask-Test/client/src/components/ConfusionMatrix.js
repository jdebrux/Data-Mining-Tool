import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';

function getConfusionMatrix(predicted, actual) {
    const labels = [...new Set([...predicted, ...actual])];
    const matrix = Array.from({ length: labels.length }, () =>
        Array.from({ length: labels.length }, () => 0)
    );
    for (let i = 0; i < predicted.length; i++) {
        const rowIndex = labels.indexOf(actual[i]);
        const colIndex = labels.indexOf(predicted[i]);
        matrix[rowIndex][colIndex]++;
    }
    const confusionMatrix = {};
    labels.forEach((label, index) => {
        confusionMatrix[label] = {};
        labels.forEach((predictedLabel, predictedIndex) => {
            confusionMatrix[label][predictedLabel] = matrix[index][predictedIndex];
        });
    });
    return confusionMatrix;
}

function ConfusionMatrix({ predicted, actual }) {
    const plotRef = useRef(null);

    useEffect(() => {
        const confusionMatrix = getConfusionMatrix(predicted, actual);
        const labels = Object.keys(confusionMatrix);
        const data = [
            {
                z: labels.map((label) =>
                    labels.map((predictedLabel) => confusionMatrix[label][predictedLabel])
                ),
                x: labels,
                y: labels,
                type: 'heatmap',
                colorscale: 'Blues',
                reversescale: true,
            },
        ];
        const layout = {
            title: 'Confusion Matrix',
            xaxis: { title: 'Predicted Label' },
            yaxis: { title: 'True Label' },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: { color: 'white' },
        };
        Plotly.newPlot(plotRef.current, data, layout);
    }, [predicted, actual]);

    return <div ref={plotRef}></div>;
}

ConfusionMatrix.propTypes = {
    predicted: PropTypes.array.isRequired,
    actual: PropTypes.array.isRequired,
};

export default ConfusionMatrix;
