import React, { Component } from 'react'
import "./signup.scss";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import { env } from '../../env/development';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      open: false,
      isNameValid: true,
      isPassValid: true,
      success: false,
      isExit: false
    }
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.singup = this.singup.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
  }

  singup(event) {
    this.setState({ open: true });
    event.preventDefault();
    axios.post(env.apiEndPoint + '/players', {
      name: this.state.name,
      password: this.state.password
    }).then(() => {
      this.setState({ success: true })
    }).catch(err => console.error(err))
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.name === 'password' ? event.target.value : this.state.password });
    if (event.target.value.length >= 6 && this.state.name.length > 0) {
      this.setState({ isPassValid: true })
    } else {
      this.setState({ isPassValid: false })
    }
  }

  handleChangeUser = (event) => {
    if (event.target.value.length >= 4 && this.state.name.length > 0) {
      this.setState({ isNameValid: true })
    } else {
      this.setState({ isNameValid: false })
    }
    this.setState({ name: event.target.name === 'name' ? event.target.value : this.state.name })
    axios.get(env.apiEndPoint + '/players', {
      params: {
        name: event.target.value
      }
    })
      .then((response) => response)
      .then((data) => {
        if (data && data.data.length > 0) {
          this.setState({ isExit: true })
        } else {
          this.setState({ isExit: false })
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    let classname = this.state.isExit === true || this.state.isNameValid === false ? 'error-input' : 'input';
    let classname02 = this.state.isExit === true || this.state.isPassValid === false ? 'error-input' : 'input';

    return (
      <div className="signup">
        <div className="content-logo">
          <div className="content-log2"></div>
        </div>
        <form onSubmit={this.singup} className="form">
          <div className="name-wrap">
            <input className={classname} name='name' value={this.state.name} placeholder="Name" onChange={this.handleChangeUser}></input>
            {this.state.isExit === true && <span className="err_text">username is already taken</span>}
            {this.state.isExit === false && this.state.isNameValid === false && <span className="err_text">username must be at least 4 charaters long</span>}
          </div>
          <div className="password-wrap">
            <input className={classname02} type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChangePassword}></input>
            {this.state.isPassValid === false && <span className="err_text">password must be at least 6 charaters long</span>}
          </div>
          <button type="submit" className="text-center" disabled={(this.state.name.length === 0 || this.state.password.length === 0 ||
            this.state.isExit || !this.state.isNameValid || !this.state.isPassValid)}>Sing Up</button>
          <a href="/login" className="text-center">Already an Account? Login in</a>
          <span className="text-center">OR</span>
          <a href="/top" className="text-center">Login As Guest</a>
        </form>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          className="dialog"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sing up Success! Please Login again...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link className="no-link" to="/login">
              <Button className="no-link" onClick={this.handleClose} color="primary" autoFocus>
                OK
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default Signup