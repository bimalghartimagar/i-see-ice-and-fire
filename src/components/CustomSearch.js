import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input from 'material-ui/Input';
import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    input: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});


const CustomSearch = (props) => {

    return (
        <div>
            <Input
                placeholder="Search"
                className={props.classes.input}
                onChange={props.controlSearchText}
            />
            <Select
                value={props.selectedType}
                onChange={props.controlSelectedType}>
                {props.optionList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
            <Button variant="raised" className={props.classes.button} onClick={props.handleSearch}>Search</Button>
        </div>
    )
}

CustomSearch.propTypes = {
    controlSearchText: PropTypes.func.isRequired,
    controlSelectedType: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    optionList: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    selectedType: PropTypes.string.isRequired,
}

export default withStyles(styles)(CustomSearch)