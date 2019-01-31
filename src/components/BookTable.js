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
const styles = theme => ({

  grid: {
    flexWrap: "nowrap",
    width: "unset",
    justifyContent: "space-around"
  },
  card: {
    maxWidth: 400,
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
            selectedDate: Date(),
            guests : "2 guests",
            session : Date(),
            age: '',
           open: false,
        }
    }
  handleConfirm = () => {
      this.setState({bookform : {display : "none"}})
      let post = {
          date : this.state.selectedDate.toLocaleDateString(),
          guests : this.state.guests,
          session : this.state.session.toLocaleTimeString(),
          id : this.props.rest._id,
      }
      RestAPI.bookTable(this.props.email, post)
      .then(res=> alert("Confirmed your booking!!!!!"))
  }
  handleChange = (event) =>{
      this.setState({ [event.target.name] : event.target.value})
  }
  handleTimeChange = date => {
    this.setState({ session: date });
    //console.log(date)
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
    //console.log(date)
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  render() {
    const { classes, rest } = this.props;
    return (
      <Card className={`book-table-card ${classes.card}`}>
       <CardHeader style={{padding: '0 16px'}}
          title={rest.name}
        />
        <CardMedia
          className={classes.media}
          image={rest.featured_image}
          title={rest.name}
          onError={(e)=>{e.target.onerror = null; e.target.src="./fallback.jpeg"}}
        />
        <CardContent style={{padding : '8px 16px'}}>
           <Typography component="p">
             {rest.cuisines}
             </Typography>
           <Typography paragraph className="rest-locality" style={{margin: "0px"}}>
             {rest.location.locality} , {rest.location.city}
         </Typography>
         </CardContent>
         <div className="flex">
                <p className="rest-rating" 
                    style={{backgroundColor : `#${rest.user_rating.rating_color}`,width: 'fit-content'}}>
                    {rest['user_rating']['aggregate_rating']}</p>
                    <h3 className="h3">Please select your booking details</h3>
          </div>
            <div className="book-table-container">
        <form className="book-table-form">
        {/* <MuiPickersUtilsProvider> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            style={{margin: "auto 8px"}}
            name = "date"
            margin="normal"
            label="Date picker"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
          />
          <TimePicker
            margin="normal"
            label="Time picker"
            name="session"
            value={this.state.session}
            onChange={this.handleTimeChange}
          />
          <FormControl style={{margin : "16px"}}className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Guests</InputLabel>
          <Select
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
            <MenuItem value={"2 guests"}>Two</MenuItem>
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
      <div className="flex">
        <button onClick={this.handleConfirm} className="booking-confirm">Book a Table</button>
      </div>
      
    </div>
      </Card>
    );
  }
}
export default withStyles(styles)(BookTable);