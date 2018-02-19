import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import IceAndFireApiService from '../services/IceAndFireApiService';
import IceAndFireUtils from '../utils/IceAndFireUtils';

class HouseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house: {},
            loading: true
        }
        this.apiService = new IceAndFireApiService();
        this.utils = new IceAndFireUtils();
    }

    componentDidMount() {

        this.apiService.getFireAndIceDetail('houses', this.props.match.params.houseid)
            .then(data => {
                    this.setState(
                        {
                            house: data,
                            loading: false
                        }
                    )
                    this.getCharacterDetail(data.currentLord)
                    }
                )   
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.houseid !== nextProps.match.params.houseid) {
            this.setState({
                house: {},
                loading: true
            })
            this.apiService.getFireAndIceDetail('houses', nextProps.match.params.houseid)
                .then(data => {
                    this.setState(
                        {
                            house: data,
                            loading: false
                        }
                    )
                    this.getCharacterDetail(data.currentLord)
                }
                )
        }
    }

    getCharacterDetail = (url) => {

        if (url === null || url === "") {

            this.setState(prevState => ({
                house: {
                    ...prevState.house,
                    'currentLordName': ""
                }
            })
            )
            return;
        }

        let urlArray = this.utils.getRouteUrl(url);

        let splittedUrl = urlArray.split('/');

        this.apiService.getFireAndIceDetail(splittedUrl[1], splittedUrl[2]).then(data =>
            this.setState(prevState => ({
                house: {
                    ...prevState.house,
                    'currentLordName': data.name
                }
            })
            ))
    }

    render() {

        if (this.state.loading) {
            return (<div>Loading...</div>)
        }

        return (
            <div>
                House Detail
            <ul>
                    <li><h4>Name:</h4>{this.state.house.name}</li>
                    <li><h4>Region:</h4>{this.state.house.region}</li>
                    <li><h4>Founded:</h4>{this.state.house.founded}</li>
                    <li><h4>Coat of Arms:</h4>{this.state.house.coatOfArms}</li>
                    <li><h4>Current Lord:</h4><Link to={this.utils.getRouteUrl(this.state.house.currentLord)}> {this.state.house.currentLordName}</Link></li>

                </ul>
            </div>
        )
    }
}

export default HouseDetail;