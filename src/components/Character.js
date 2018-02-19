import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import IceAndFireApiService from '../services/IceAndFireApiService';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PersonIcon from 'material-ui-icons/Person';
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

class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            loading: true
        }
        this.apiService = new IceAndFireApiService();
        this.classes = props.classes;
    }

    componentDidMount() {
        this.apiService.getFireAndIceDetail('characters').then(data =>
            this.setState({ characters: data, loading: false }))
    }

    __characterItems = () => {
        return this.state.characters.map(item => {
            var splittedUrlArray = item.url.split('/');

            // return <li key={item.name} ><Link
            //     to={`${this.props.match.url}/${splittedUrlArray[splittedUrlArray.length - 1]}`}
            // >
            //     {item.name}
            // </Link>
            // </li>
            return <span><ListItem button key={item.name} component={Link} to={`${this.props.match.url}/${splittedUrlArray[splittedUrlArray.length - 1]}`} >
                <ListItemIcon>
                    <PersonIcon />
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
                        Characters
                    </Typography>
                </Paper>
                <List>
                    {this.__characterItems()}
                </List>
            </div>
        )
    }
}

Character.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Character);