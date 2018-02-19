import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceAndFireService from '../services/IceAndFireApiService';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import BookIcon from 'material-ui-icons/Book';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

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

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: true
        }
        this.apiService = new IceAndFireService();
        this.classes = props.classes;
    }

    componentDidMount() {

        this.apiService.getFireAndIceDetail('books')
            .then(data =>
                this.setState(
                    {
                        books: data,
                        loading: false
                    }
                )
            )
    }

    _bookItems = () => {
        return this.state.books.map(item => {
            var splittedUrlArray = item.url.split('/');
            return <span>
                <ListItem button key={item.name} component={Link} to={`${this.props.match.url}/${splittedUrlArray[splittedUrlArray.length - 1]}`} >
                    <ListItemIcon>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={item.name} />
                </ListItem>
                <Divider />
            </span>
        }
        )
    }

    render() {

        if (this.state.loading) {
            return (<div>Loading...</div>)
        }

        return (
            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Books
                    </Typography>
                </Paper>
                <List>
                    {this._bookItems()}
                </List>
            </div>
        )
    }
}

Books.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Books);