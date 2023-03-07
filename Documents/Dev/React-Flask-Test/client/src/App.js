import React from 'react'
import Card from './components/Card.js';
import ResponsiveAppBar from './components/ResponsiveAppBar.js';
import LinearRegression from './LinearRegression.js';
import RandomForest from './RandomForest.js'
import LogisticRegression from './LogisticRegression.js'
import KMeans from './KMeans.js'
import KNN from './KNN.js';
import "./App.css"
import Grid from '@mui/material/Grid';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
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
  );
}


function Home() {

  function icons(pointer){
    switch(pointer){
      case 1:
        return (<AutoGraphIcon style={{fill: 'white'}}/>)
      default:
        return (<AutoGraphIcon style={{fill: 'white'}}/>)
    }
  }

  return(
    <div>
      <ResponsiveAppBar/>
        <Grid container spacing={1} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid item xs>
            <Link to="LinearRegression"> <Card text="Linear Regression" icon={icons(1)}/> </Link>
          </Grid>
          <Grid item xs>
            <Link to="RandomForest"> <Card text="RandomForest" icon={icons(1)}/> </Link>
          </Grid>
          <Grid item xs>
            <Link to="LogisticRegression"> <Card text="LogisticRegression" icon={icons(1)}/> </Link>
          </Grid>
          <Grid item xs>
            <Link to="KNN"> <Card text="KNN" icon={icons(1)}/> </Link>
          </Grid>
          <Grid item xs>
            <Link to="KMeans"> <Card text="KMeans" icon={icons(1)}/> </Link>
          </Grid>
        </Grid>
    </div>
  )
}

export default App