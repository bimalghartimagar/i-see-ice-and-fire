import React, { Component } from 'react';
import PersonIcon from 'material-ui-icons/Person';
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
        // maxWidth: 360,
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

class Character extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    componentDidMount() {
        const { dispatch, current } = this.props
        dispatch(fetchItemsIfNeeded('characters', current))
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props

        let nextParam = new URLSearchParams(nextProps.location.search)
        let currentParam = new URLSearchParams(this.props.location.search)

        if (nextParam.get('page') !== currentParam.get('page')) {
            dispatch(fetchItemsIfNeeded('characters', nextParam.get('page')))
        }


    }

    render() {

        const { characters, isFetching, lastUpdated, first, last, next, prev, current } = this.props
        const PassedIcon = () => <PersonIcon />

        return (
            <div className={this.classes.root}>
                {isFetching && <LinearProgress color="secondary" />}

                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Characters {characters.length >= 0 && !isFetching && <Typography>Updated on: {(new Date(lastUpdated)).toLocaleString()}</Typography>}
                    </Typography>
                </Paper>
                {characters.length === 0 && !isFetching && <div>No characters found.</div>}
                {characters.length > 0 &&
                    <span>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current===first} onClick={() => this.props.history.push('/characters?page=' + first)}>First</Button>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current===first} onClick={() => this.props.history.push('/characters?page=' + prev)}>Prev</Button>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current===last} onClick={() => this.props.history.push('/characters?page=' + next)}>Next</Button>
                        <Button className={this.classes.button} variant="raised" size="small" disabled={current===last} onClick={() => this.props.history.push('/characters?page=' + last)}>Last</Button>
                        <Chip label={current+' of '+last} className={this.classes.chip} />
                        <CustomList items={characters} passedIcon={PassedIcon} />
                    </span>
                }
                {characters.length === 0 && isFetching && <CircularProgress className={this.classes.progress} />}
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
    } = itemsByType['characters'] || {
        isFetching: false,
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
        isFetching,
        characters: items,
        lastUpdated,
        first,
        last,
        next,
        prev,
        current
    }
}

Character.propTypes = {
    classes: PropTypes.object.isRequired,
    characters: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
};


export default withStyles(styles)(connect(mapStateToProps)(Character));