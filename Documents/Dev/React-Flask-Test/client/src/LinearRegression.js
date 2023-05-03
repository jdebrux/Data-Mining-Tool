import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckboxList from './components/Checkbox.js';
import SideNav from './components/SideNav.js'
import GradientText from './components/GradientText.js';
import { Link } from 'react-router-dom';
import ResidualPlot from './components/ResidualPlot.js';
import MetricsTable from './components/MetricsTable.js';


import Plot from 'react-plotly.js';


export default function LinearRegression() {
    const [file, setFile] = useState(null);
    const [regressionData, setRegressionData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [featureList, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedItem, setSelectedItem] = useState(null);


    function handleSelectedItemChange(item) {
        setSelectedItem(item);
    }

    const handleFileUpload = event => {
        setFile(event.target.files[0]);
    };

    const handleFormSubmit = event => {
        console.log("Submit");
        event.preventDefault();

        const data = new FormData();
        data.append('file', file);

        axios.post('http://localhost:5000/GetFeatures', data)
            .then(res => {
                console.log(res.data);
                setData(res.data)
                setSuccess(true);
            })
            .catch(error => {
                console.error(error);
                setSuccess(false);
                setErrorMessage(error);
            });
    };

    const handleFormSubmits = event => {
        console.log("Submit");
        event.preventDefault();

        const data = new FormData();
        data.append('file', file);
        data.append('featureList', JSON.stringify(featureList));
        data.append('selectedItem', JSON.stringify(selectedItem));

        axios.post('http://localhost:5000/LinearRegression', data)
            .then(res => {
                console.log(res.data);
                setRegressionData(res.data);
                setSuccess(true);
            })
            .catch(error => {
                console.error(error);
                setSuccess(false);
                setErrorMessage("Selected Dataset is not compatible with the chosen algorithm.");
            });

    };

    return (
        <div>
            <Dialog open={errorMessage} onClose={() => {
                setErrorMessage(null);
            }}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setErrorMessage(null);
                    }}>OK</Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={0} sx={{ padding: '10px' }}>
                <Grid item xs={2}>
                    <Link to="/" className="link-style">
                        <h2>VIZIONARY</h2>
                    </Link>
                    <SideNav selectedItem="LinearRegression" />
                </Grid>
                <Grid xs={10} rowSpacing={1} direction="row" sx={{ padding: '10px' }}>
                    <GradientText color1="#73B3FF" color2="#FFFFFF" text="Linear Regression" />
                    <Typography variant="body1" class="light-text">
                        Linear regression helps you to analyse the relationship between two numerical variables. To use linear regression,
                        you need to upload a dataset with two columns of numerical data. The tool then calculates the line of best fit and displays it on a scatter plot, providing insight into the relationship
                        between the two variables. This can help you make predictions and gain a deeper understanding of your data.
                    </Typography>
                    <Grid container rowSpacing={1} direction="row">
                        <Grid container marginRight={1}>
                            <div>
                                <form onSubmit={handleFormSubmit}>
                                    <Button variant="outlined" component="label" style={{ marginRight: "0.5rem" }}>
                                        Choose File
                                        <input type="file" id="file" name="file" hidden onChange={handleFileUpload} accept=".csv" />
                                    </Button>
                                    <Button variant="outlined" type="submit">Upload</Button>
                                </form>
                            </div>
                        </Grid>
                        <Grid container style={{ justifyContent: "flex-start" }}>
                            {success ? <Typography variant="h6" color="common.white">Upload Successful</Typography> : file && <Typography variant="h6" color="common.white">{file.name}</Typography>}
                        </Grid>

                    </Grid>
                    <br />
                    <Grid container rowSpacing={1} direction="row" alignItems="center" justify="center">
                        {success ? (
                            <Grid container rowSpacing={1} direction="row" alignItems="center" justify="center">
                                <form onSubmit={handleFormSubmits}>
                                    <Typography variant="h6" color="common.white">Select Target</Typography>
                                    <CheckboxList items={featureList} onSelectedItemChange={handleSelectedItemChange} />
                                    <p>Selected item: {selectedItem}</p>
                                    <Button variant="outlined" type="submit">Submit</Button>
                                </form>
                            </Grid>
                        ) : (
                            <Typography variant="h6" color="common.white">
                                No data
                            </Typography>
                        )}
                    </Grid>
                    <br />
                    <Grid container justify="center" alignItems="center">
                        {success && regressionData ? (
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <div style={{ width: '100%' }}>
                                    <Plot
                                        data={[
                                            {
                                                x: regressionData.X,
                                                y: regressionData.predictions,
                                                type: 'scatter',
                                                mode: 'lines',
                                                marker: {
                                                    color: 'white',
                                                    line: {
                                                        width: 2
                                                    }
                                                }
                                            },
                                            {
                                                x: regressionData.X,
                                                y: regressionData.y,
                                                type: 'scatter',
                                                mode: 'markers',
                                                marker: {
                                                    color: regressionData.y,
                                                    colorscale: 'Blues',
                                                    colorbar: {
                                                        title: 'Y',
                                                    },
                                                    line: {
                                                        width: 1
                                                    }
                                                }
                                            }
                                        ]}
                                        layout={{
                                            title: 'Linear Regression Plot',
                                            xaxis: { title: 'X', color: '#FFFFFF' },
                                            yaxis: { title: 'Y', color: '#FFFFFF' },
                                            plot_bgcolor: 'rgba(0,0,0,0)',
                                            paper_bgcolor: 'rgba(0,0,0,0)',
                                            font: { color: '#FFFFFF' },
                                            margin: { t: 50 },
                                            width: '100%',
                                            height: "100%"
                                        }}
                                    />


                                    <ResidualPlot regressionData={regressionData} />
                                    <MetricsTable metrics={regressionData.metrics} />
                                </div>
                            </Grid>

                        ) : (
                            <br />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
