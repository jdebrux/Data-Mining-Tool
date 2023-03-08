import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const CheckboxList = ({ items, onSelectedItemChange }) => {
  const [selected, setSelected] = useState(null);

  const handleChange = index => {
    setSelected(index);
    onSelectedItemChange(items[index]);
  };

  // return items.map((item, index) => (
  //   <div key={index}>
  //     <Checkbox checked={selected === index} onChange={() => handleChange(index)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
  //     {item}
  //   </div>
  // ));

  return items.map((item, index) => (
    <span key={index}>
      <Checkbox checked={selected === index} onChange={() => handleChange(index)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      {item}
    </span>
  ));

};



export default CheckboxList;