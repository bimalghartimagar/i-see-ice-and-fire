import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import 'typeface-roboto';
import CustomListItem from './CustomListItem';

const CustomList = ({ items, passedIcon }) => {
    return (
        <List dense={true}>
            {
                items.map(item => <CustomListItem key={item.name} {...item} passedIcon={passedIcon} />)
            }
        </List>

    );
};

CustomList.propTypes = {
    items: PropTypes.array.isRequired,
};

export default CustomList;