import React, { Component } from 'react';
import HomeIcon from 'material-ui-icons/Home';
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
        backgroundColor: theme.palette.background.paper,
    },
});

class House extends Component {

    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            loading: true
        }
        this.classes = props.classes;
    }

    componentDidMount() {

        const { dispatch } = this.props
        dispatch(fetchItemsIfNeeded('houses'))
    }

    render() {
        const { houses, isFetching, lastUpdated } = this.props

        const PassedIcon = () => <HomeIcon />

        return (
            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Houses {houses.length >= 0 && !isFetching && <Typography>Updated on: {(new Date(lastUpdated)).toLocaleString()}</Typography>}
                    </Typography>
                </Paper>
                {houses.length === 0 && isFetching && <div>Loading...</div>}
                {houses.length === 0 && !isFetching && <div>No houses found.</div>}
                {houses.length >= 0 && <CustomList items={houses} passedIcon={PassedIcon} />}
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
    } = itemsByType['houses'] || {
        isFetching: true,
        items: []
    }

    items.map(item => {
        item.url = IceAndFireUtils.getRouteUrl(item.url)
        return item
    })

    return {
        houses: items,
        isFetching,
        lastUpdated
    }
}

House.propTypes = {
    classes: PropTypes.object.isRequired,
    houses: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(House));