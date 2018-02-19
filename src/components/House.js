import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import IceAndFireApiService from '../services/IceAndFireApiService';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
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

class House extends Component {

    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            loading: true
        }
        this.apiService = new IceAndFireApiService();
        this.classes = props.classes;
    }

    componentDidMount() {
        this.apiService.getFireAndIceDetail('houses')
            .then(data =>
                this.setState({
                    houses: data,
                    loading: false
                })
            )
    }

    __housesItems = () => {
        return this.state.houses.map(item => {

            var splittedUrlArray = item.url.split('/');

            // return <li key={item.name} ><Link
            //     to={`${this.props.match.url}/${splittedUrlArray[splittedUrlArray.length - 1]}`}
            // >
            //     {item.name}
            // </Link>
            //     <p>{item.region}</p>
            // </li>
                        return <span> <ListItem button key={item.name} component={Link} to={`${this.props.match.url}/${splittedUrlArray[splittedUrlArray.length - 1]}`} >
                        <ListItemIcon>
                            <HomeIcon />
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
                    {this.__housesItems()}
                    </List>
            </div>
        )
    }
}

House.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(House);