import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ScatterPlot = ({ data, xKey, yKey }) => {
  return (
    <ScatterChart width={1000} height={500} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis dataKey={xKey} type="number" />
      <YAxis dataKey={yKey} type="number" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

export default ScatterPlot;
