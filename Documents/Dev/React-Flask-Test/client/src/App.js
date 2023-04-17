import React from 'react'
import LinearRegression from './LinearRegression.js';
import RandomForest from './RandomForest.js'
import LogisticRegression from './LogisticRegression.js'
import KMeans from './KMeans.js'
import KNN from './KNN.js';
import "./App.css"
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GradientText from './components/GradientText.js';
import { Typography } from '@mui/material';

import SideNav from './components/SideNav.js'
import NestedCard from './components/NestedCard.js';
import linearRegressionImage from '/Users/joshdebruxelles/Documents/Dev/React-Flask-Test/client/src/assets/linearRegressionImage.svg';
import logisticRegressionImage from '/Users/joshdebruxelles/Documents/Dev/React-Flask-Test/client/src/assets/logisticRegressionImage.svg';
import randomeForestImage from '/Users/joshdebruxelles/Documents/Dev/React-Flask-Test/client/src/assets/randomeForestImage.svg';
import kmeansImage from '/Users/joshdebruxelles/Documents/Dev/React-Flask-Test/client/src/assets/kmeansImage.svg';
import knnImage from '/Users/joshdebruxelles/Documents/Dev/React-Flask-Test/client/src/assets/knnImage.svg';

import useMediaQuery from '@mui/material/useMediaQuery';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif',
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="LinearRegression/*" element={<LinearRegression />} />
          <Route path="RandomForest/*" element={<RandomForest />} />
          <Route path="LogisticRegression/*" element={<LogisticRegression />} />
          <Route path="KNN/*" element={<KNN />} />
          <Route path="KMeans/*" element={<KMeans />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


function Home() {

  const isSmallScreen = useMediaQuery('(max-width:1190px)');

  return (
    <Grid container spacing={0} sx={{ width: '100%', padding: '10px' }}>
      <Grid item xs={2} >
        <h2>VIZIONARY</h2>
        <SideNav />
      </Grid>
      <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid item xs={12} sx={{ padding: '10px 10px 0px' }}>
          <GradientText color1="#FFFFFF" color2="#FFFFFF" text="Dashboard" />
          <Typography variant="body1" class="light-text">
            Please select your preferred data mining  algorithm!
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ padding: '10px' }}>
          <Grid container spacing={0} alignItems="center" justifyContent="flex-start" sx={{ margin: '10px', rowGap: '1px' }}>
            <Grid item xs={isSmallScreen ? 6 : 4}>
              <NestedCard text="Linear Regression" image={linearRegressionImage} color1="#73B3FF" color2="#DBE6FF" link="/LinearRegression" />
            </Grid>
            <Grid item xs={isSmallScreen ? 6 : 4}>
              <NestedCard text="Logistic Regression" image={logisticRegressionImage} color1="#FF5757" color2="#FFDBDB" link="/LogisticRegression" />
            </Grid>
            <Grid item xs={isSmallScreen ? 6 : 4}>
              <NestedCard text="Random Forest" image={randomeForestImage} color1="#00FF66" color2="#EBFFDB" link="/RandomForest"/>
            </Grid>
            <Grid item xs={isSmallScreen ? 6 : 4}>
              <NestedCard text="KNN" image={knnImage} color1="#FAFF00" color2="#FEFFDB" link="/KNN" />
            </Grid>
            <Grid item xs={isSmallScreen ? 6 : 4}>
              <NestedCard text="K-means" image={kmeansImage} color1="#FF007A" color2="#FFDBF5" link="/KMeans" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}


export default App