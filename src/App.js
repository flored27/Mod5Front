import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Profile from './Profile';
import Property from './Property';
import * as actions from './actions';
import './App.css';
import { Button} from 'semantic-ui-react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Loginscreen from './Loginscreen'
import PropertyDetail from './PropertyDetail';
import NewProperty from './NewProperty';
import Register from './Register';
import Message from './Message';
import EditProperty from './EditProperty';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Initial from './Initial';
import About from './about';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[],
      open: false
    }
  }

  handleFetchUser = () =>{
    this.props.fetchUser();
  }

  handleClick = (event) =>{
    event.preventDefault();
    console.log(this.state)
   this.props.loginUser(this.state.email, this.state.password).then(()=>this.props.history.push("/profile"));
   this.setState({
     loginPage: []
   })
 }

  registerLink = (e)=>{
     e.preventDefault();
     window.location = 'register';}

  handleOpen = () => {
     this.setState({open: true});
     };

  handleClose = () => {
     this.setState({open: false});
     };

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  render() {
    console.log(this.state)
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        ];

    return (
      <div className="App">
        <div id="navbar" class="ui fixed sticky blue inverted menu">
          <div class="item">
          <img class="ui mini circular image" src="logo2.png"/>

                <Link to="/">Home</Link>



          </div>
          <div class="item">
            {this.props.loggedIn ? (
                <Link to="/contact">Contact</Link>
            ) : (
              ""
            )}
          </div>
          <div class="item">
            {this.props.loggedIn ? (
                <Link to="/properties">Properties</Link>
            ) : (
              ""
            )}
          </div>
          <div class="right menu">
          <div class="ui item">
            {this.props.loggedIn ? (
                <Link to="/profile">Profile</Link>
            ) : (
              ""
            )}
          </div>
            <div class="ui item">
            {this.props.loggedIn ? (
              <div
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutUser();
                }}
              >
                <Button>
                <Link to="/">Sign Out</Link>
                </Button>
              </div>
            ) : (
              <div>
                <MuiThemeProvider>
                <div>
               <RaisedButton label="Login" onClick={this.handleOpen} />
               <Dialog
                 contentStyle={{maxWidth: 305}}
                 title="Login"
                 actions={actions}
                 modal={true}
                 open={this.state.open}
               >
               <TextField
                 hintText="Enter your Email"
                 floatingLabelText="Email"

                 onChange = {(event,newValue) => this.setState({email:newValue})}
                 />
               <br/>
                 <TextField
                   type="password"
                   hintText="Enter your Password"
                   floatingLabelText="Password"
                   onChange = {(event,newValue) => this.setState({password:newValue})}
                   />
                 <br/>
                 <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                 <RaisedButton label="Register" style={style} primary={true} onClick={this.registerLink}/>
               </Dialog>
             </div>
             </MuiThemeProvider>
          </div>
            )}
            </div>
          </div>
        </div>




          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/properties" component={Property} />
            <Route path="/detail/:id" render={(props)=><PropertyDetail{...props}/>} />
            <Route path="/new_property" component={NewProperty} />
            <Route path="/register" component={Register} />
            <Route path="/contact" component={Message} />
            <Route path="/edit_property/:id" render={(props)=><EditProperty{...props}/>}/>
            <Route path="/" component={Initial} />

          </Switch>
      </div>
    );
  }
}
const style = {
  margin: 15,
};


const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});
export default connect(mapStateToProps, actions)(App);