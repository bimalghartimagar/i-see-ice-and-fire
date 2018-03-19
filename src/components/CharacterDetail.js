import React, { Component } from 'react';
import { TitleWithBody } from './BooksDetail';
import { withStyles } from 'material-ui/styles';
// import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import Button from 'material-ui/Button';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import Grow from 'material-ui/transitions/Grow';
import PersonIcon from 'material-ui-icons/Person';
import TvIcon from 'material-ui-icons/Tv';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import RecentActorsIcon from 'material-ui-icons/RecentActors';

import { selectedItem, fetchItemsIfNeeded } from '../actions/actions';

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
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    button: {
        margin: theme.spacing.unit,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class CharacterDetail extends Component {
    constructor(props) {
        super(props);

        this.classes = props.classes;
    }

    componentDidMount() {

        const { dispatch, match } = this.props
        dispatch(fetchItemsIfNeeded('characters', "", match.params.characterid))
        .then(x => dispatch(selectedItem('characters', match.params.characterid)))
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.characterid !== nextProps.match.params.characterid) {

            const { dispatch } = this.props
            dispatch(fetchItemsIfNeeded('characters', "", nextProps.match.params.characterid)).then(x => dispatch(selectedItem('characters', nextProps.match.params.characterid)))
        }
    }

    openNewTab = () => {

    }

    render() {


        const { character } = this.props

        return (
            <div className={this.classes.root}>
                <Button className={this.classes.button} variant="raised" size="small" onClick={() => this.props.history.push('/characters')}>
                    <KeyboardArrowLeft className={classNames(this.classes.leftIcon, this.classes.iconSmall)} />
                    Back
      </Button>
                {Object.keys(character).length !== 0 && character.constructor === Object &&
                    <Grid container spacing={24} style={{
                        margin: 0,
                        width: '100%',
                    }}>
                        <Grid item xs={12}>
                            <Paper className={this.classes.paper}>
                                <Typography variant="headline" component="h2">
                                    <PersonIcon />{character.name}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grow in={true}>
                            <Grid item xs={12} sm={6}>
                                <Paper className={this.classes.paper}>
                                    <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Also Known as: </span><ul>
                                        {character.aliases.filter(item => item !== "").map(alias => <li key={alias}>{alias}</li>)}
                                    </ul></Typography>
                                    <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Titles: </span><ul>
                                        {character.titles.filter(item => item !== "").map(title => <li key={title}>{title}</li>)}
                                    </ul></Typography>
                                    <TitleWithBody {...this.classes} title={'Born on: '} body={character.born}></TitleWithBody>
                                    <TitleWithBody {...this.classes} title={'Gender: '} body={character.gender}></TitleWithBody>
                                    <TitleWithBody {...this.classes} title={'Culture: '} body={character.culture}></TitleWithBody>
                                    <TitleWithBody {...this.classes} title={'Father: '} body={character.father}></TitleWithBody>
                                    <TitleWithBody {...this.classes} title={'Mother: '} body={character.mother}></TitleWithBody>
                                    <TitleWithBody {...this.classes} title={'Spouse: '} body={character.spouse}></TitleWithBody>
                                </Paper>
                            </Grid>
                        </Grow>
                        <Grow in={true} timeout={500}>
                            <Grid item xs={12} sm={6}>
                                <Paper className={this.classes.paper}>
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
                                        {character.tvSeries.filter(item => item !== "").map(series => <li key={series}>

                                            <Chip
                                                avatar={
                                                    <Avatar>
                                                        <TvIcon />
                                                    </Avatar>
                                                }
                                                label={series}
                                                className={this.classes.chip}
                                            />
                                        </li>)}
                                    </ul></Typography>
                                    <Typography variant="subheading" gutterBottom><span className={this.classes.bold}>Played By: </span><ul>
                                        {character.playedBy.filter(item => item !== "").map(played => <li key={played}>
                                            {/* <Chip label={played} className={this.classes.chip} /> */}
                                            <Chip
                                                label={played}
                                                avatar={
                                                    <Avatar>
                                                        <RecentActorsIcon />
                                                    </Avatar>
                                                }
                                                onClick={() => window.open('https://www.google.com/search?q=' + played, '_blank')}
                                                className={this.classes.chip}
                                            />
                                        </li>)}
                                    </ul></Typography>
                                </Paper>
                            </Grid>
                        </Grow>


                    </Grid>
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
