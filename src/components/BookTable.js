import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import RestAPI from './RestAPI';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import  Snackbar from './Snackbar';

import {connect} from 'react-redux'
import { bookTableConfirm} from '../store/actions'
const styles = theme => ({

  grid: {
    flexWrap: "nowrap",
    width: "unset",
    justifyContent: "space-around",
    color: 'white'
  },
  card: {
    margin: '0px',
    maxHeight: '495px',
    overflow: 'auto'
  },
  bookTable : {
    color: 'white',
    backgroundColor: 'black'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class BookTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            rest : "",
            bookform : {display : "flex"},
            selectedDate: new Date(),
            guests : "2 guests",
            session : new Date(),
            open: false,
            Snackbar : false
        }
    }
  handleConfirm = () => {
      this.setState({bookform : {display : "none"}})
      let date = this.state.selectedDate 
      let time = this.state.selectedDate 
      let post = {
          date : date.toLocaleDateString(),
          guests : this.state.guests,
          session : time.toLocaleTimeString(),
          id : this.props.rest._id,
      }
      this.props.bookTableConfirm(this.props.email, post)
      this.setState({Snackbar : true})
  }
  handleChange = (event) =>{
      this.setState({ [event.target.name] : event.target.value})
  }
  handleTimeChange = date => {this.setState({ session: date }); };
  handleDateChange = date => {this.setState({ selectedDate: date }); };
  handleClose = () => {this.setState({ open: false });};
  handleOpen = () => {this.setState({ open: true });};
  handleSnackClose = () => {this.setState({ Snackbar: false });}
  
  render() {
    const { classes, rest } = this.props;
    console.log(this.props)
    return (
      <Card className={`book-table-card ${classes.card}`}>
       <div className="rest-detail-header">
       <CardHeader  title={rest.name}/>
        <div className="flex" style={{justifyContent : "space-between"}}>
                <div>
                  <p className="cuisines">Cuisines : {rest.cuisines}</p>
                  <p className="place">{rest.location.locality} , {rest.location.city}</p>
                </div>
                <p className="rest-rating" 
                    style={{backgroundColor : `#${rest.user_rating.rating_color}`,width: 'fit-content'}}>
                    {rest['user_rating']['aggregate_rating']}</p>
                   
          </div>
       </div>
        <div className="rest-detail-page-image">
        <CardMedia
          className={classes.media}
          image={rest.featured_image}
          title={rest.name}
          onError={(e)=>{e.target.onerror = null; e.target.src="./fallback.jpeg"}}
        />
        </div>
        <div className="booking-container">
        <CardContent style={{padding : '8px 16px'}}>
           <Typography component="p">
             
             </Typography>
           <Typography paragraph className="rest-locality" style={{margin: "0px"}}>
         </Typography>
         </CardContent>
        
          <h3 className="h3">Please select your booking details</h3>
            <div className="book-table-container">
        <form className="book-table-form">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            style={{margin: "auto 8px"}}
            name = "date"
            margin="normal"
            label="Date"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
          />
          <TimePicker
            margin="normal"
            label="Time"
            name="session"
            value={this.state.session}
            onChange={this.handleTimeChange}
          />
          <FormControl style={{margin : "16px"}}className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Guests</InputLabel>
          <Select
            className="test-select"
            style={{color: 'white'}}
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            name="guests"
            value={this.state.guests}
            onChange={this.handleChange}
            inputProps={{
              name: 'guests',
            }}
          >
            <MenuItem value={"1 guest"}>One</MenuItem>
            <MenuItem value={"2 guests"}>Two</MenuItem>import { connect } from 'react-redux'
            <MenuItem value={"3 guests"}>Three</MenuItem>
            <MenuItem value={"4 guests"}>Four</MenuItem>
            <MenuItem value={"5 guests"}>Five</MenuItem>
            <MenuItem value={"6 guests"}>Six</MenuItem>
            <MenuItem value={"7 guests"}>Seven</MenuItem>
            <MenuItem value={"8 guests"}>Eight</MenuItem>
            <MenuItem value={"9 guests"}>Nine</MenuItem>
            <MenuItem value={"10 guests"}>Ten</MenuItem>
            <MenuItem value={"10+ guests"}>Ten plus</MenuItem>
          </Select>
        </FormControl>
        </Grid>
      </MuiPickersUtilsProvider>
        
      </form>
      <div className="fle" style={{position: 'center', width : '50%'}}>
        <button onClick={this.handleConfirm} className="booking-confirm">Book a Table</button>
      </div>
    </div>
    <Snackbar handleSnackClose={this.handleSnackClose}show={this.state.Snackbar} message={"Your Booking confirmed...!"}/> 
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  rest : state.booking.rest,
  email : state.booking.email
})
const mapDispatchToProps = dispatch => ({
  bookTableConfirm : (email, post) => dispatch(bookTableConfirm(email, post))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookTable));