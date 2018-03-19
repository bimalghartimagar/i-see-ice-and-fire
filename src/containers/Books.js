import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import BookIcon from 'material-ui-icons/Book';
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';

import IceAndFireUtils from '../utils/IceAndFireUtils'
import { fetchItemsIfNeeded } from '../actions/actions';
import CustomList from '../components/CustomList';

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
});


class Books extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.utilService = new IceAndFireUtils()
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchItemsIfNeeded('books'))
    }

    render() {

        const { isFetching, books, lastUpdated } = this.props

        const PassedIcon = () => <BookIcon />

        return (
            <div className={this.classes.root}>
                {isFetching && <LinearProgress color="secondary" />}
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Books {books.length >= 0 && !isFetching && <Typography>Updated on: {(new Date(lastUpdated)).toLocaleString()}</Typography>}
                    </Typography>
                </Paper>
                {books.length === 0 && !isFetching && <div>No books found.</div>}
                {books.length > 0 && <CustomList items={books} passedIcon={PassedIcon} />}
                {books.length === 0 && isFetching && <CircularProgress className={this.classes.progress} />}
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
    } = itemsByType['books'] || {
        isFetching: true,
        items: []
    }

    items.forEach(item => {
        item.url = IceAndFireUtils.getRouteUrl(item.url)
        return item
    })

    return {
        books: items,
        isFetching,
        lastUpdated
    }
}
Books.propTypes = {
    classes: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Books));