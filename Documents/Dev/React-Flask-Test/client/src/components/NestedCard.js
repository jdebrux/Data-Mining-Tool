import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const styles = {
  card: {
    width: '19.25rem',
    borderRadius: '30px',
    backgroundColor: '#292D37',
    boxShadow: 'none',
    padding: '10px',
    marginBottom: '20px',
  },
  innerCard: {
    width: '17.125rem',
    height: '8.5rem',
    borderRadius: '30px',
    backgroundColor: '#393E4A',
    boxShadow: 'none',
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    background: 'linear-gradient(to right, #363E52, #2B3242)',
    color: '#FFFFFF',
    borderRadius: '10px',
    fontWeight: 'bold',
    boxShadow: 'none',
    textTransform: 'none',
    display: 'block',
    margin: 'auto',
    width: '105px',
  },
};

const NestedCard = (props) => {
  const { text, image, color1, color2, link } = props;

  const gradientText = {
    background: `linear-gradient(to right, ${color1}, ${color2})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <Card style={styles.card}>
      <CardContent>
        <Card style={styles.innerCard}>
          <CardMedia
            component="img"
            image={image}
            alt={text}
            sx={{ width: '100%', height: '100%', objectFit: 'scale-down' }}
          />
          <CardContent />
        </Card>
        <Typography variant="h5" style={gradientText}>
          {text}
        </Typography>
        <Button variant="contained" style={styles.button} href={link} target="_self">
          View More
        </Button>
      </CardContent>
    </Card>
  );
};

export default NestedCard;
