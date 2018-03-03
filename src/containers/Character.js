import React, { Component } from 'react';
import PersonIcon from 'material-ui-icons/Person';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { fetchItemsIfNeeded } from '../actions/actions';
import CustomList from '../components/CustomList';
import IceAndFireUtils from '../utils/IceAndFireUtils';

const styles = theme => ({
    rootPaper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class Character extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchItemsIfNeeded('characters'))
    }

    render() {

        const { characters, isFetching, lastUpdated } = this.props
        const PassedIcon = () => <PersonIcon />

        return (
            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Characters {characters.length >= 0 && !isFetching && <Typography>Updated on: {(new Date(lastUpdated)).toLocaleString()}</Typography>}
                    </Typography>
                </Paper>
                {characters.length === 0 && isFetching && <div>Loading...</div>}
                {characters.length === 0 && !isFetching && <div>No characters found.</div>}
                {characters.length >= 0 && <CustomList items={characters} passedIcon={PassedIcon} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { itemsByType } = state

    const {
        isFetching,
        lastUpdated,
        items
    } = itemsByType['characters'] || {
        isFetching: false,
        items: []
    }

    items.map(item => {
        item.url = IceAndFireUtils.getRouteUrl(item.url)
        return item
    })

    return {
        isFetching,
        characters: items,
        lastUpdated
    }
}

Character.propTypes = {
    classes: PropTypes.object.isRequired,
    characters: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
};


export default withStyles(styles)(connect(mapStateToProps)(Character));