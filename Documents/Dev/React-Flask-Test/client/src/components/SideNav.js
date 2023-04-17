import React from 'react';
import { List } from '@mui/material';
import MyListItem from './MyListItem';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function SideNav(props) {
  const { selectedItem } = props;

  function icons(pointer) {
    switch (pointer) {
      case 1:
        return <AutoGraphIcon style={{ fill: 'white' }} />;
      default:
        return <AutoGraphIcon style={{ fill: 'white' }} />;
    }
  }

  return (
    <List component="nav">
      <MyListItem
        selected={selectedItem === 'LinearRegression'}
        to="/LinearRegression"
        primary="Linear Regression"
        icon={icons(1)}
      />
      <MyListItem
        selected={selectedItem === 'RandomForest'}
        to="/RandomForest"
        primary="Random Forest"
        icon={icons(1)}
      />
      <MyListItem
        selected={selectedItem === 'LogisticRegression'}
        to="/LogisticRegression"
        primary="Logistic Regression"
        icon={icons(1)}
      />
      <MyListItem selected={selectedItem === 'KNN'} to="/KNN" primary="KNN" icon={icons(1)} />
      <MyListItem selected={selectedItem === 'KMeans'} to="/KMeans" primary="KMeans" icon={icons(1)} />
    </List>
  );
}

export default SideNav;
