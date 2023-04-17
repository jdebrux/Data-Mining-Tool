import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';

const MyListItem = (props) => {
    const { selected, to, icon, primary } = props;

    const gradientBg = 'linear-gradient(to left, #2F333B, rgba(200,78,137,0))';
    const transparentBg = 'transparent';
    const background = selected ? gradientBg : transparentBg;

    const style = {
        height: '70px',
        borderRadius: '10px',
        backgroundImage: background,
        marginBottom: '5px',
    }

    // useMediaQuery returns true if the screen width is below 1060px
    const isSmallScreen = useMediaQuery('(max-width:1060px)');

    return (
        <Link to={to} className="link-style">
            <ListItem button className={selected ? 'selected-item' : 'unselected-item'} style={ style }>
                <ListItemIcon>{icon}</ListItemIcon>
                {/* Conditionally render ListItemText if not on a small screen */}
                {!isSmallScreen && <ListItemText primary={primary} />}
            </ListItem>
        </Link>
    );
};

export default MyListItem;
