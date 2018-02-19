import React, { Component } from 'react';
import './App.css';
import {
    Route,
    Link,
    Switch,
    withRouter
} from 'react-router-dom';
import Books from './components/Books';
import BooksDetail from './components/BooksDetail';
import House from './components/House';
import Character from './components/Character';
import HouseDetail from './components/HouseDetail';
import CharacterDetail from './components/CharacterDetail';
import PropTypes from 'prop-types';
import SearchResult from './components/SearchResult';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input from 'material-ui/Input';
import 'typeface-roboto';

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
    },
    input: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
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

        const Home = () => (
            <div>
                <h2>I see fire and ice.</h2>
            </div>
        )

        const Topic = ({ match }) => (
            <div>
                <h3>{match.params.topicId}</h3>
            </div>
        )

        const Topics = ({ match }) => (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>
                            Rendering with React
            </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>
                            Components
            </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>
                            Props v. State
            </Link>
                    </li>
                </ul>

                <Route path={`${match.path}/:topicId`} component={Topic} />
                <Route exact path={match.path} render={() => (
                    <h3>Please select a topic.</h3>
                )} />
            </div>
        )

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
                            <Button component={Link} to="topics" color="inherit">Topics</Button>
                            <CustomSearchComponent
                                {...this.state}
                                {...this.classes}
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
                    <Route path="/houses" component={House} />
                    <Route path="/characters/:characterid" component={CharacterDetail} />
                    <Route path="/characters" component={Character} />
                    <Route path="/topics" component={Topics} />
                    <Route path="/search" component={SearchResult} />
                </Switch>
            </div>
        );
    }
}

class CustomSearchComponent extends Component {

    constructor(props) {
        super(props);

        this.handleSearch = this.props.handleSearch.bind(this);
    }

    render() {
        return (
            <div>

                <Input
                    placeholder="Search"
                    className={this.props.input}
                    onChange={this.props.controlSearchText}
                />
                <Select
                    value={this.props.selectedType}
                    onChange={this.props.controlSelectedType}>
                    {this.props.optionList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                </Select>
                <Button variant="raised" className={this.props.button} onClick={this.handleSearch}>Search</Button>
            </div>
        )
    }
}

CustomSearchComponent.propTypes = {
    searchText: PropTypes.string.isRequired,
    selectedType: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    optionList: PropTypes.array.isRequired
}

export default withRouter(withStyles(styles)(App));

