import React, { Component } from 'react'
import "./signup.scss";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.singup = this.singup.bind(this);
        this.isDuplicated = this.isDuplicated.bind(this)
    }
    isDuplicated() {
        try {
            fetch('http://localhost:1337/users')
            .then((response) => response.json())
            .then((data) => console.log(data));
        }catch (error) {
            console.error(error)
          }
    }
    singup() {
        console.log('signup');
        try{
            this.isDuplicated();
            fetch('http://localhost:1337/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                }),
                })
                .then(response => response.json())
                .then(data => console.log(data));
        } catch (error) {
            console.error(error)
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
                <form onSubmit={this.singup} className="form">
                    <input className="input" name="name" value={this.state.name} placeholder="Name" onChange={this.handleChange}></input>
                    <input className="input" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange}></input>
                    <input className="input" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}></input>
                    <button type="submit" className="text-center">Sing Up</button>
                    <a href="/" className="text-center">Already an Account? Login in</a>

                </form>
            </div>
        )
    }
}
export default Signup