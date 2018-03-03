import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import 'typeface-roboto';
import { Link } from 'react-router-dom';

const CustomListItem = ({ name, url, passedIcon }) => {
    const PassedIcon = passedIcon

    return (
        <span> <ListItem button key={name} component={Link} to={url} >
            <ListItemIcon>
                <PassedIcon />
            </ListItemIcon>
            <ListItemText inset primary={name} />
        </ListItem>
            <Divider />
        </span>
    );
};

CustomListItem.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default CustomListItem;