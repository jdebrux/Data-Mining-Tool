import React, { useState } from 'react';
import axios from 'axios';
import CheckboxList from './components/Checkbox.js';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import GradientText from './components/GradientText.js';
import { Link } from 'react-router-dom';
import KMeansPlot from './components/KMeansPlot.js';

import SideNav from './components/SideNav.js'


export default function KMeans() {
    const [file, setFile] = useState(null);
    const [kmeansData, setKmeansData] = useState(null)
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

        axios.post('http://localhost:5000/KMeans', data)
            .then(res => {
                console.log(res.data);
                setKmeansData(res.data);
                setSuccess(true);
            })
            .catch(error => {
                console.error(error);
                setSuccess(false);
            });
    };


    return (
        <div>
            <Grid container spacing={0} sx={{ padding: '10px' }}>
                <Grid item xs={2}>
                    <Link to="/" className="link-style">
                        <h2>VIZIONARY</h2>
                    </Link>
                    <SideNav selectedItem="KMeans" />
                </Grid>
                <Grid xs={10} rowSpacing={1} direction="row" sx={{ padding: '10px' }}>
                    <GradientText color1="#FF007A" color2="#FFFFFF" text="K-Means Clustering" />
                    <Typography variant="body1" class="light-text">
                        K-means clustering is a tool for identifying patterns in data by grouping similar data points together. It is used by uploading a dataset with multiple numerical variables
                        and iteratively assigning each data point to the nearest cluster center until the cluster assignments converge. To use K-Means clustering, you need to upload a dataset that
                        includes a categorical target variable and one or more numerical input variables. K-means clustering can provide insights into the structure of the data, natural groupings,
                        and important features. It is often used for tasks such as customer segmentation, image segmentation, and anomaly detection.
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
                    <Grid xs={12} rowSpacing={1} direction="row">
                        {success && kmeansData ? (
                            <Grid xs={12} rowSpacing={1} direction="row">
                                <div>
                                    <KMeansPlot kmeansData={kmeansData}/>
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
