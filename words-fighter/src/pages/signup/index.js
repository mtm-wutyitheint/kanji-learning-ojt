import React, { Component } from 'react'
import "./signup.scss";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

class Signup extends Component {
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
        // this.handleClickOpen = this.handleClickOpen.bind(this);
        // this.handleClose = this.handleClose(this)
    }
    singup() {
        this.setState({open: true});
        try{
            fetch('http://localhost:1337/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    // email: this.state.email,
                    password: this.state.password,
                }),
                })
                .then(response => response.json())
                .then(data => {
                    if(data){
                        console.log(data);
                        this.setState({success: true})
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        } catch (error) {
            console.error(error);

        }
    }
    handleChange(event) {
        this.setState({name: event.target.name === 'name' ? event.target.value : this.state.name})
        this.setState({email: event.target.name === 'email' ? event.target.value :  this.state.email})
        this.setState({password: event.target.name === 'password' ? event.target.value :  this.state.password})
    }
    render() {
        return (
            <div className="signup">
                <div className="content-logo">
                    <div className="content-log2"></div>
                </div>
                <div  className="form">
                    <input className="input" name="name" value={this.state.name} placeholder="Name" onChange={this.handleChange}></input>
                    <input className="input" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange}></input>
                    <input className="input" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}></input>
                    <button  onClick={this.singup} className="text-center">Sing Up</button>
                    <a href="/login" className="text-center">Already an Account? Login in</a>
                </div>
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
                            <Button  className="no-link" onClick={this.handleClose} color="primary" autoFocus>
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