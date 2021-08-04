import React, { Component } from 'react'
import "./login.scss";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { env } from "../../env/development";
import axios from "axios";

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
      <div className="login">
        <div className="content-logo">
          <div className="content-log2"></div>
        </div>
        <form onSubmit={this.singup} className="form">
          <input className="input" name="name" value={this.state.name} placeholder="Name" onChange={this.handleChange}></input>
          <input className="input" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}></input>
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