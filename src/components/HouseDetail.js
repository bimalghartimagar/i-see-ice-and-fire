import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import HomeIcon from 'material-ui-icons/Home';

import IceAndFireApiService from '../services/IceAndFireApiService';
import IceAndFireUtils from '../utils/IceAndFireUtils';
import { fetchItemsIfNeeded, selectedItem } from '../actions/actions';
import { TitleWithBody } from './BooksDetail';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    card: {
        minWidth: 275,
        marginTop: 5
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    bold: {
        fontWeight: 'bold'
    },
    rootPaper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});


class HouseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house: {},
            loading: true
        }
        this.apiService = new IceAndFireApiService();
        this.utils = new IceAndFireUtils();
        this.classes = props.classes
    }

    componentDidMount() {

        const { dispatch, match } = this.props
        dispatch(fetchItemsIfNeeded('houses', null, match.params.houseid))
            .then(x => dispatch(selectedItem('houses', match.params.houseid)))
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.houseid !== nextProps.match.params.houseid) {

            const { dispatch } = this.props
            dispatch(selectedItem('houses', nextProps.match.params.houseid))
        }
    }

    // TODO: Change to search character in store and then via api
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
        const { house } = this.props
        return (
            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        House Detail
    </Typography>
                </Paper>

                {Object.keys(house).length !== 0 && house.constructor === Object &&
                    <Card className={this.classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                <HomeIcon />{house.name}
                            </Typography>
                            <TitleWithBody {...this.classes} title={'Region: '} body={house.region}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Founded: '} body={house.founded}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Coat of Arms: '} body={house.coatOfArms}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Current Lord: '} body={house.culture}><Link to={IceAndFireUtils.getRouteUrl(house.currentLord)}> {house.currentLordName || ""}</Link></TitleWithBody>
                        </CardContent>
                    </Card>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { selectedItem } = state

    let house = selectedItem['houses'] || {}
    if (Object.keys(house).length !== 0 && house.constructor === Object) {
        // let currentLordNameArray = itemsByType['characters'].items.filter(item => IceAndFireUtils.getIdFromUrl(item.url) === IceAndFireUtils.getIdFromUrl(house.currentLord))
        // house.currentLordName = currentLordNameArray.length > 0 ? currentLordNameArray[0].name : ""
        house.currentLordName = ""
    }

    return {
        house
    }
}

export default withStyles(styles)(connect(mapStateToProps)(HouseDetail));