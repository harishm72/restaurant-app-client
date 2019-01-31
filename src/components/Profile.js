import React from 'react';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import RestAPI from './RestAPI';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            displayName : "",
            email : "",
            phoneNumber : "",
            paymentMode : "",
        }
    }
    componentDidMount = () =>{
        //console.log(this.props)
        const {displayName, email, phoneNumber, paymentMode} = this.props.user
        this.setState({
            displayName : displayName,
            email : email,
            phoneNumber : phoneNumber,
            paymentMode : paymentMode,
        })
    }
    handleChange = event =>  this.setState({[event.target.name] : event.target.value})
    
    formSubmit = (event) => {
        event.preventDefault();
        RestAPI.updateProfile(this.state.email, this.state)
    }
    render(){
        const classes = theme => ({
            container: {
              display: 'flex',
              flexWrap: 'wrap',
            },
            textField: {
              marginLeft: theme.spacing.unit,
              marginRight: theme.spacing.unit,
              width: 200,
            },
            dense: {
              marginTop: 19,
            },
            menu: {
              width: 200,
            },
          });

        return <div className="user-profile">
                    <div className="profile-header">
                        <img className="user-avatar" src={this.props.user.photoURL} alt=""></img>
                        <h6 className="user-name">{this.props.user.displayName}</h6>
                        <h6 className="user-name">{this.state.email}</h6>
                    </div>
                    <form className={`${classes.container} edit-profile`} validate="true" autoComplete="off">
                             <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            name="displayName"
                            value={this.state.displayName}
                            onChange={this.handleChange}
                            margin="normal"
                            />
                             <TextField
                            id="standard-name"
                            label="Phone"
                            className={classes.textField}
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            margin="normal"
                            />
                            <TextField
                            id="standard-name"
                            label="PaymentMode"
                            className={classes.textField}
                            name="paymentMode"
                            value={this.state.paymentMode}
                            onChange={this.handleChange}
                            margin="normal"
                            />
                            <Button variant="contained" size="small" onClick={this.formSubmit} className={classes.button}>
                            <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                Save
                            </Button>
        </form>
                <p></p>
        </div>
    }
}
export default Profile;