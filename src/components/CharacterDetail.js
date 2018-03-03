import React, { Component } from 'react';
import { TitleWithBody } from './BooksDetail';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'

import { fetchItemsIfNeeded, selectedItem } from '../actions/actions';

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

class CharacterDetail extends Component {
    constructor(props) {
        super(props);

        this.classes = props.classes;
    }

    componentDidMount() {

        const { dispatch, match } = this.props
        dispatch(fetchItemsIfNeeded('characters')).then(x => dispatch(selectedItem('characters', match.params.characterid)))
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.characterid !== nextProps.match.params.characterid) {

            const { dispatch } = this.props
            dispatch(fetchItemsIfNeeded('characters')).then(x => dispatch(selectedItem('characters', nextProps.match.params.characterid)))
        }
    }

    render() {


        const { character } = this.props

        return (
            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Character Detail
    </Typography>
                </Paper>

                {Object.keys(character).length !== 0 && character.constructor === Object &&

                    <Card className={this.classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                {character.name}
                            </Typography>
                            <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Also Known as: </span><ul>
                                {character.aliases.map(alias => <li key={alias}>{alias}</li>)}
                            </ul></Typography>
                            <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Titles: </span><ul>
                                {character.titles.map(title => <li key={title}>{title}</li>)}
                            </ul></Typography>
                            <TitleWithBody {...this.classes} title={'Born on: '} body={character.born}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Gender: '} body={character.gender}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Culture: '} body={character.culture}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Father: '} body={character.father}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Mother: '} body={character.mother}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Spouse: '} body={character.spouse}></TitleWithBody>
                            <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Allegiances: </span><ul>
                                {character.allegiances.map(allegiance => <li key={allegiance}>{allegiance}</li>)}
                            </ul></Typography>
                            <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Books: </span><ul>
                                {character.books.map(book => <li key={book}>{book}</li>)}
                            </ul></Typography>
                            <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>POV Books: </span><ul>
                                {character.povBooks.map(book => <li key={book}>{book}</li>)}
                            </ul></Typography>
                            <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>TV Series: </span><ul>
                                {character.tvSeries.map(series => <li key={series}>{series}</li>)}
                            </ul></Typography>
                            <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Played By: </span><ul>
                                {character.playedBy.map(played => <li key={played}><a target="_blank" href={'https://www.google.com/search?q=' + played}>{played}</a></li>)}
                            </ul></Typography>
                        </CardContent>
                        {/* <CardActions>
        <Button size="small">Learn More</Button>
    </CardActions> */}
                    </Card>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { selectedItem } = state

    return {
        character: selectedItem['characters'] || {}
    }
}


export default withStyles(styles)(connect(mapStateToProps)(CharacterDetail));
