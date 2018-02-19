import React, { Component } from 'react';
import IceAndFireService from '../services/IceAndFireApiService';
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

class BooksDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            loading: true
        }
        this.apiService = new IceAndFireService();
        this.classes = props.classes;
    }

    componentDidMount() {

        this.apiService.getFireAndIceDetail('books', this.props.match.params.bookid)
            .then(data =>
                this.setState(
                    {
                        book: data,
                        loading: false
                    }
                )
            )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.bookid !== nextProps.match.params.bookid) {

            this.setState({
                book: {},
                loading: true
            })

            this.apiService.getFireAndIceDetail('books', nextProps.match.params.bookid)
                .then(data =>
                    this.setState(
                        {
                            book: data,
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
            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Book Detail
                    </Typography>
                </Paper>
                <Card className={this.classes.card}>
                    <CardContent>
                        {/* <Typography className={this.classes.title}>Books Detail</Typography> */}
                        <Typography variant="headline" component="h2">
                            {this.state.book.name}
                        </Typography>
                        <Typography className={this.classes.pos}>Author(s): <ul>
                            {this.state.book.authors.map(author => <li key={author}>{author}</li>)}
                        </ul></Typography>
                        <TitleWithBody {...this.classes} title={'Number of Pages: '} body={this.state.book.numberOfPages}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Publisher: '} body={this.state.book.publisher}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Country: '} body={this.state.book.country}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'ISBN: '} body={this.state.book.isbn}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Media Type: '} body={this.state.book.mediaType}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Released on: '} body={this.state.book.released}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Total Characters: '} body={this.state.book.characters.length}></TitleWithBody>
                        <TitleWithBody {...this.classes} title={'Total POV Characters: '} body={this.state.book.povCharacters.length}></TitleWithBody>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                </Card>
            </div>
        )
    }
}



BooksDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const TitleWithBody = (props) => (
    <Typography component="p" variant="subheading" gutterBottom>
        <span className={props.bold}>{props.title}</span>{props.body}
    </Typography>
)

export default withStyles(styles)(BooksDetail);