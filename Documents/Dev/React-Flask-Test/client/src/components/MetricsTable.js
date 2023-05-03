import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const MetricsTable = ({ metrics }) => {
    return (
        <TableContainer sx={{ backgroundColor: 'transparent' }} size="small">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white" }}>Metric</TableCell>
                        <TableCell style={{ color: "white" }}>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(metrics).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell component="th" scope="row" style={{ color: "white" }}>
                                {key}
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                                {value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MetricsTable;
