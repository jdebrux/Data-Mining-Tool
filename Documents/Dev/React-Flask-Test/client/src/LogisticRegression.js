import React, { useState } from 'react';
import axios from 'axios';
import CheckboxList from './components/Checkbox.js';
import Grid from '@mui/material/Unstable_Grid2';
import ConfusionMatrix from './components/ConfusionMatrix';
import ReportPlot from './components/ReportPlot.js';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import SideNav from './components/SideNav.js'
import GradientText from './components/GradientText.js';
import { Link } from 'react-router-dom';


export default function LogisticRegression() {
    const [file, setFile] = useState(null);
    const [logisticData, setLogisticData] = useState(null)
    const [featureList, setData] = useState(null)
    const [success, setSuccess] = useState(false);
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

    const handleTargetSelect = event => {
        event.preventDefault();

        const data = new FormData();
        data.append('file', file);
        data.append('featureList', JSON.stringify(featureList));
        data.append('selectedItem', JSON.stringify(selectedItem));

        axios.post('http://localhost:5000/LogisticRegression', data)
            .then(res => {
                console.log(res.data);
                setLogisticData(res.data);
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
                    <SideNav selectedItem="LogisticRegression" />
                </Grid>
                <Grid xs={10} rowSpacing={1} direction="row" sx={{ padding: '10px' }}>
                    <GradientText color1="#FF5757" color2="#FFFFFF" text="Logistic Regression" />
                    <Typography variant="body1" class="light-text">
                        Logistic regression is a tool that helps you to understand the relationship between a categorical target variable and one or more input variables.
                        To use logistic regression, you need to upload a dataset that includes a categorical target variable and one or more numerical input variables. The
                        tool then calculates the probability of the target variable belonging to each category based on the values of the input variables.
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
                                <form onSubmit={handleTargetSelect}>
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
                        {success && logisticData ? (
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={8}>
                                    <ConfusionMatrix predicted={logisticData.predictions} actual={logisticData.actual} />
                                </Grid>
                                <Grid item xs={4} sx={{ paddingTop: '100px' }} >
                                    <ReportPlot data={logisticData.report} />
                                </Grid>
                            </Grid>
                        ) : (
                            <br />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}