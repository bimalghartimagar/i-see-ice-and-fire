import React, { Component } from 'react';
import HomeIcon from 'material-ui-icons/Home';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Chip from 'material-ui/Chip';

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
    progress: {
        margin: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
    chip: {
        margin: theme.spacing.unit,
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
        dispatch(fetchItemsIfNeeded('houses', this.props.current))
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props

        let nextParam = new URLSearchParams(nextProps.location.search)
        let currentParam = new URLSearchParams(this.props.location.search)

        if (nextParam.get('page') !== currentParam.get('page')) {
            dispatch(fetchItemsIfNeeded('houses', nextParam.get('page')))
        }


    }

    render() {
        const { houses, isFetching, lastUpdated, first, last, next, prev, current } = this.props
        const PassedIcon = () => <HomeIcon />

        return (
            <div className={this.classes.root}>
                {isFetching && <LinearProgress color="secondary" />}
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Houses {houses.length >= 0 && !isFetching && <Typography>Updated on: {(new Date(lastUpdated)).toLocaleString()}</Typography>}
                    </Typography>
                </Paper>
                {houses.length === 0 && !isFetching && <div>No houses found.</div>}
                {houses.length > 0 &&
                    <span>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current === first} onClick={() => this.props.history.push('/houses?page=' + first)}>First</Button>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current === first} onClick={() => this.props.history.push('/houses?page=' + prev)}>Prev</Button>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current === last} onClick={() => this.props.history.push('/houses?page=' + next)}>Next</Button>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current === last} onClick={() => this.props.history.push('/houses?page=' + last)}>Last</Button>
                        <Chip label={current + ' of ' + last} className={this.classes.chip} />
                        <CustomList items={houses} passedIcon={PassedIcon} />
                    </span>
                }
                {houses.length === 0 && isFetching && <CircularProgress className={this.classes.progress} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { itemsByType } = state

    const {
        isFetching,
        lastUpdated,
        items,
        first,
        last,
        next,
        prev,
        current
    } = itemsByType['houses'] || {
        isFetching: true,
        items: [],
        first: "1",
        last: "1",
        next: "1",
        prev: "1",
        current: "1"
    }

    items.map(item => {
        item.url = IceAndFireUtils.getRouteUrl(item.url)
        return item
    })

    return {
        houses: items,
        isFetching,
        lastUpdated,
        first,
        last,
        next,
        prev,
        current
    }
}

House.propTypes = {
    classes: PropTypes.object.isRequired,
    houses: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(House));