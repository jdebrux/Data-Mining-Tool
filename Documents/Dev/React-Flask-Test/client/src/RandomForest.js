import React, { useState } from 'react';
import axios from 'axios';
import CheckboxList from './components/Checkbox.js';
import ConfusionMatrix from './components/ConfusionMatrix';
import ReportPlot from './components/ReportPlot.js';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import SideNav from './components/SideNav.js'
import GradientText from './components/GradientText.js';
import { Link } from 'react-router-dom';



export default function RandomForest() {
    const [file, setFile] = useState(null);
    const [forestData, setForestData] = useState(null)
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

        axios.post('http://localhost:5000/RandomForest', data)
            .then(res => {
                console.log(res.data);
                setForestData(res.data);
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
                    <SideNav selectedItem="RandomForest" />
                </Grid>
                <Grid xs={10} rowSpacing={1} direction="row" sx={{ padding: '10px' }}>
                    <GradientText color1="#00FF66" color2="#FFFFFF" text="Random Forest" />
                    <Typography variant="body1" class="light-text">
                        Random forests can help you to make predictions about a target variable based on multiple input variables. To use the random forest classifier, you need to upload a dataset that
                        includes a categorical target variable and one or more numerical input variables. The tool then builds multiple decision trees using a random subset of the input variables and a
                        random subset of the data. It combines the results of these decision trees to make predictions about the target variable.
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
                        {success && forestData ? (
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={8}>
                                    <ConfusionMatrix predicted={forestData.predictions} actual={forestData.actual} />
                                </Grid>
                                <Grid item xs={4} sx={{ paddingTop: '100px' }} >
                                    <ReportPlot data={forestData.report} />
                                </Grid>
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
