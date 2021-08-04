import React, { Component } from 'react'
import "../signup/signup.scss";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { env } from "../../env/development";
import axios from "axios";
import halfBg from '../../img/aa.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      open: false,
      setOpen: false,
      success: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.singup = this.singup.bind(this);
  }
  singup(event) {
    this.setState({ open: true });
    event.preventDefault();
    try {
      axios.post(env.apiEndPoint + '/player_login', {
        name: this.state.name,
        password: this.state.password,
      }).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ success: true });
          localStorage.setItem('loginUser', JSON.stringify(response.data));
        } else {
          this.setState({ success: false })
        }
      })
    } catch (error) {
      console.error(error);
      this.setState({ success: false });
    }
  }
  handleChange(event) {
    this.setState({ name: event.target.name === 'name' ? event.target.value : this.state.name })
    this.setState({ password: event.target.name === 'password' ? event.target.value : this.state.password })
  }
  handleClose = () => {
    this.setState({ open: false, name: '', password: '' })
  };
  render() {
    let alertTitle = this.state.success === true ? 'Login Sucess!' : 'Login Failed! Please Try again...';
    let route = this.state.success === true ? '/top' : '/login';
    return (
      <div className="signup">
        <div className="img-bg clearFix">
          <p className="upper">A new Language is a New Life 
          <span className="under_text">新しい言語は新しい人生の始まり</span>
          </p>
          <img className="img" src={halfBg} alt="decorate"></img>
        </div>
        <form onSubmit={this.singup} className="form">
          <div className="name-wrap">
            <input className="input" name="name" value={this.state.name} placeholder="Name" onChange={this.handleChange}></input>
          </div>
          <div className="password-wrap">
            <input className="input" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}></input>
          </div>
          <button className="text-center" disabled={(this.state.name.length === 0 || this.state.password.length === 0)}>Login</button>
        </form>
        <Dialog
          open={this.state.open}
          // onClose={this.state.setOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertTitle}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link className="no-link" to={route}>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                OK
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default Login