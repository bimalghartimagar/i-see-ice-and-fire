import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { selectedItem, fetchItemsIfNeeded } from '../actions/actions';
import BookIcon from 'material-ui-icons/Book';

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

class BooksDetail extends Component {
    constructor(props) {
        super(props);

        this.classes = props.classes;
    }

    componentDidMount() {

        const { dispatch, match } = this.props
        dispatch(fetchItemsIfNeeded('books', "", match.params.bookid))
        .then(
                response => dispatch(selectedItem('books', match.params.bookid))
            )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.bookid !== nextProps.match.params.bookid) {

            const { dispatch } = this.props
            dispatch(selectedItem('books', nextProps.match.params.bookid))
        }
    }


    render() {

        const { book } = this.props

        return (
            <div className={this.classes.root}>
                <Paper className={this.classes.rootPaper} elevation={4}>
                    <Typography variant="headline" component="h2">
                        Book Detail
                    </Typography>
                </Paper>
                {Object.keys(book).length === 0 && book.constructor === Object &&
                    <Card className={this.classes.card}>
                        <CardContent>
                            <Typography>
                                Loading... </Typography>
                        </CardContent>
                    </Card>}
                {Object.keys(book).length !== 0 && book.constructor === Object &&
                    <Card className={this.classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                <BookIcon/>{book.name}
                            </Typography>
                            <Typography component="div" className={this.classes.pos}>Author(s): <ul>
                                {book.authors.map(author => <li key={author}>{author}</li>)}
                            </ul></Typography>
                            <TitleWithBody {...this.classes} title={'Number of Pages: '} body={book.numberOfPages}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Publisher: '} body={book.publisher}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Country: '} body={book.country}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'ISBN: '} body={book.isbn}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Media Type: '} body={book.mediaType}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Released on: '} body={book.released}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Total Characters: '} body={book.characters.length}></TitleWithBody>
                            <TitleWithBody {...this.classes} title={'Total POV Characters: '} body={book.povCharacters.length}></TitleWithBody>
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
        book: selectedItem['books'] || {}
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

export default withStyles(styles)(connect(mapStateToProps)(BooksDetail));