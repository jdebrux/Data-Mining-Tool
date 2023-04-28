import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function MetricsTable(props) {
  const { metrics } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Metric</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(metrics).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MetricsTable.propTypes = {
  metrics: PropTypes.shape({
    MAE: PropTypes.number.isRequired,
    MSE: PropTypes.number.isRequired,
    RMSE: PropTypes.number.isRequired,
    "R^2": PropTypes.number.isRequired,
  }).isRequired,
};

export default MetricsTable;
