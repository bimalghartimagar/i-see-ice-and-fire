import React, { Component } from 'react';
import './App.css';
import {
    Route,
    Link,
    Switch,
    withRouter
} from 'react-router-dom';
import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Books from './Books';
import BooksDetail from '../components/BooksDetail';
import Houses from './Houses';
import Character from './Character';
import HouseDetail from '../components/HouseDetail';
import CharacterDetail from '../components/CharacterDetail';
import SearchResult from '../components/SearchResult';
import Home from '../components/Home';
import CustomSearch from '../components/CustomSearch';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            selectedType: 'All',
            optionList: ["All", "Books", "Houses", "Characters"],
        }
        this.classes = props.classes;
        this.handleSearch = this.handleSearch.bind(this);
        this.controlSearchText = this.controlSearchText.bind(this);
        this.controlSelectedType = this.controlSelectedType.bind(this);
    }


    handleSearch(e) {
        this.props.history.push({
            pathname: '/search',
            state: { ...this.state }
        })
    }

    controlSearchText(e) {
        this.setState({ searchText: e.target.value });
        return;
    }

    controlSelectedType(e) {
        this.setState({ selectedType: e.target.value })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div>
                <div className={this.classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={this.classes.flex}>
                                I See Ice and Fire
                            </Typography>
                            <Button component={Link} to="/" color="inherit">Home</Button>
                            <Button component={Link} to="/books" color="inherit">Books</Button>
                            <Button component={Link} to="/houses" color="inherit">Houses</Button>
                            <Button component={Link} to="/characters" color="inherit">Characters</Button>
                            <CustomSearch
                                {...this.state}
                                handleSearch={this.handleSearch}
                                controlSearchText={this.controlSearchText}
                                controlSelectedType={this.controlSelectedType} />

                        </Toolbar>
                    </AppBar>
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/books/:bookid" component={BooksDetail} />
                    <Route path="/books" component={Books} />
                    <Route path="/houses/:houseid" component={HouseDetail} />
                    <Route path="/houses" component={Houses} />
                    <Route path="/characters/:characterid" component={CharacterDetail} />
                    <Route path="/characters" component={Character} />
                    <Route path="/search" component={SearchResult} />
                </Switch>
            </div>
        );
    }
}


export default withRouter(withStyles(styles)(App));