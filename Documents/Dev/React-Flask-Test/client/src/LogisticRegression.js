import React, { useState } from 'react';
import axios from 'axios';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CheckboxList from './components/Checkbox.js';
import Grid from '@mui/material/Unstable_Grid2';
import ConfusionMatrix from './components/ConfusionMatrix';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function LogisticRegression() {
    const [file, setFile] = useState(null);
    const [logisticData, setLogisticData] = useState(null)
    const [featureList, setData] = useState(null)
    const [success, setSuccess] = useState(false);

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
            });
    };


    return (
        <div>
            <ResponsiveAppBar />
            <Grid xs={12} rowSpacing={1} direction="row">
                <Typography variant="h4" color="common.white" align='center'> Logistic Regression Classifier </Typography>
            </Grid>
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
            <Grid xs={12} rowSpacing={1} direction="row">
                {success && logisticData ? (
                    <Grid xs={12} rowSpacing={1} direction="row">
                        <div>
                            <ConfusionMatrix predicted={logisticData.predictions} actual={logisticData.actual} />
                        </div>
                    </Grid>

                ) : (
                    <br />
                )}
            </Grid>

        </div>
    );
}
