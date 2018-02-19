import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceAndFireApiService from '../services/IceAndFireApiService'
import IceAndFireUtils from '../utils/IceAndFireUtils'
class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            houses: [],
            characters: [],
            loading: true
        }
        this.apiService = new IceAndFireApiService();
        this.utils = new IceAndFireUtils();
    }

    componentDidMount() {
        let searchText = this.props.history.location.state.searchText;
        let selectedType = this.props.history.location.state.selectedType;
        let options = this.props.history.location.state.optionList
        this.setState({
            books: [],
            houses: [],
            characters: [],
            loading: true
        })
        this.updateSearchResults(searchText, selectedType, options);
    }

    componentWillReceiveProps(nextprops) {
        let searchText = nextprops.location.state.searchText;
        let selectedType = nextprops.location.state.selectedType;
        let options = this.props.history.location.state.optionList
        if (!(this.props.location.state.searchText === searchText
            &&
            this.props.history.location.state.selectedType === selectedType)) {
            this.setState({
                books: [],
                houses: [],
                characters: [],
                loading: true
            })
            this.updateSearchResults(searchText, selectedType, options);
        }
    }

    updateSearchResults(searchText, selectedType, options) {
        if (selectedType === "All") {

            options.slice(1).forEach(element => {
                this.apiService.getFireAndIceDetail(element.toLowerCase()).then(data => {
                    let results = data.filter(item => item.name.toLowerCase().search(searchText.toLowerCase()) > -1)
                    this.setState({
                        [element.toLowerCase()]: results,
                        loading: false
                    })
                })
            });
        }
        else {
            this.apiService.getFireAndIceDetail(selectedType.toLowerCase()).then(data => {
                let results = data.filter(item => item.name.toLowerCase().search(searchText.toLowerCase()) > -1)
                this.setState({
                    [selectedType.toLowerCase()]: results,
                    loading: false
                })
            })
        }
    }

    _bookItems = () => {
        return this.state.books.map(item => {

            var url = this.utils.getRouteUrl(item.url);
            return <li key={item.name} ><Link
                to={url}
            >
                {item.name}
            </Link>
            </li>
        }
        )
    }
    _characterItems = () => {
        return this.state.characters.map(item => {
            var url = this.utils.getRouteUrl(item.url);
            return <li key={item.name} ><Link
                to={url}
            >
                {item.name}
            </Link>
            </li>
        }
        )
    }
    _houseItems = () => {
        return this.state.houses.map(item => {
            var url = this.utils.getRouteUrl(item.url);
            return <li key={item.name} ><Link
                to={url}
            >
                {item.name}
            </Link>
            </li>
        }
        )
    }

    render() {

        if (this.state.loading) {
            return (<div>Loading...</div>)
        }

        return (
            <div>
                <h3>Search Results</h3>
                Books
                <span></span>
                <ul>
                    {this._bookItems().length>0?this._bookItems():<li>No results found.</li>}
                </ul>
                Houses
                <ul>
                    {this._houseItems().length>0?this._houseItems():<li>No results found.</li>}
                </ul>
                Characters
                <ul>
                    {this._characterItems().length>0?this._characterItems():<li>No results found.</li>}
                </ul>
            </div>
        )

    }
}

export default SearchResult