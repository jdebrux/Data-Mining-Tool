import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

  export default function BasicCard({text, icon, link}) {
    return (
      <Card sx={{minWidth: 200, borderRadius:'30px',backgroundColor:"#2B2B42", border: "2px solid #3A3A5E"}}>
        <Grid container alignItems="center" justifyContent="center" >
          <CardContent>
            <div style={{display: "flex", justifyContent: "center"}}>
                {icon}
            </div>
            <Typography variant="h5" color="common.white"> {text} </Typography>
            { link }
          </CardContent>
        </Grid>
      </Card>
    );
  }