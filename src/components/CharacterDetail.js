import React, { Component } from 'react';
import IceAndFireService from '../services/IceAndFireApiService';
import { TitleWithBody } from './BooksDetail';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

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
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class CharacterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {},
            loading: true
        }
        this.apiService = new IceAndFireService();
        this.classes = props.classes;
    }

    componentDidMount() {

        this.apiService.getFireAndIceDetail('characters', this.props.match.params.characterid)
            .then(data =>
                this.setState(
                    {
                        character: data,
                        loading: false
                    }
                )
            )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.characterid !== nextProps.match.params.characterid) {
            this.setState({
                character: {},
                loading: true
            })

            this.apiService.getFireAndIceDetail('characters', nextProps.match.params.characterid)
                .then(data =>
                    this.setState(
                        {
                            character: data,
                            loading: false
                        }
                    )
                )
        }
    }

    render() {

        if (this.state.loading) {
            return (<div>Loading...</div>)
        }

        return (
            // <div>
            //     Character Detail
            // <ul>
            //         <li><h4>Name:</h4>{this.state.character.name}</li>
            //         <li><h4>Born on:</h4>{this.state.character.born}</li>
            //         <li>
            //             <h4>Also known as:</h4>
            //             <ul>
            //                 {this.state.character.aliases.map(alias => <li>{alias}</li>)}
            //             </ul>
            //         </li>
            //         <li><h4>Gender:</h4>{this.state.character.gender}</li>
            //         <li><h4>Culture:</h4>{this.state.character.culture}</li>
            //     </ul>
            // </div>

            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Character Detail
    </Typography>
                </Paper>
                <Card className={this.classes.card}>
                    <CardContent>
                        {/* <Typography className={this.classes.title}>Books Detail</Typography> */}
                        <Typography variant="headline" component="h2">
                            {this.state.character.name}
                        </Typography>
                        <Typography component="p" variant="subheading" gutterBottom><span className={this.classes.bold}>Also Known as: </span><ul>
                            {this.state.character.aliases.map(alias => <li>{alias}</li>)}
                        </ul></Typography>
                        <Typography component="p" variant="subheading" gutterBottom><span className={this.classes.bold}>Titles: </span><ul>
                            {this.state.character.titles.map(title => <li>{title}</li>)}
                        </ul></Typography>
                        <TitleWithBody {...this.classes} title={'Born on: '} body={this.state.character.born}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Gender: '} body={this.state.character.gender}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Culture: '} body={this.state.character.culture}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Father: '} body={this.state.character.father}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Mother: '} body={this.state.character.mother}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Spouse: '} body={this.state.character.spouse}></TitleWithBody>
                        <Typography component="p" variant="subheading" gutterBottom><span className={this.classes.bold}>Allegiances: </span><ul>
                            {this.state.character.allegiances.map(allegiance => <li>{allegiance}</li>)}
                        </ul></Typography>
                        <Typography component="p" variant="subheading" gutterBottom><span className={this.classes.bold}>Books: </span><ul>
                            {this.state.character.books.map(book => <li>{book}</li>)}
                        </ul></Typography>
                        <Typography component="p" variant="subheading" gutterBottom><span className={this.classes.bold}>POV Books: </span><ul>
                            {this.state.character.povBooks.map(book => <li>{book}</li>)}
                        </ul></Typography>
                        <Typography component="p" variant="subheading" gutterBottom><span className={this.classes.bold}>TV Series: </span><ul>
                            {this.state.character.tvSeries.map(series => <li>{series}</li>)}
                        </ul></Typography>
                        <Typography component="p" variant="subheading" gutterBottom><span className={this.classes.bold}>Played By: </span><ul>
                            {this.state.character.playedBy.map(played => <li>{played}</li>)}
                        </ul></Typography>
                    </CardContent>
                    {/* <CardActions>
        <Button size="small">Learn More</Button>
    </CardActions> */}
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(CharacterDetail);
