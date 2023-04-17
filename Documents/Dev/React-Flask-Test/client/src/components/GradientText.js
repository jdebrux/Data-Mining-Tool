import React from 'react';

const GradientText = ({ color1, color2, text }) => {
  const gradient = {
    backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return <h1 style={gradient}>{text}</h1>;
};

export default GradientText;
