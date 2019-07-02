import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import {withRouter} from 'react-router-dom';
import ErrorMessages from '../Components/Error/errorMessages';
import './login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessages: [],
            username: '',
            password: ''
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChangeInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const errorMessages = this.valdiateSubmit();

        if (errorMessages.length === 0) {
            this.props.history.push('/homepage/');
        }
        else {this.setErrorMessages(errorMessages)}
    }

    setErrorMessages(errorMessages) {
        this.setState({
            errorMessages: errorMessages
        })
    }

    valdiateSubmit() {
        let errorMessages = [];
        errorMessages = this.validateUsername(errorMessages);
        errorMessages = this.validatePassword(errorMessages);

        return errorMessages
    }

    validateUsername(errorMessages) {
        if (!this.state.username) {
            errorMessages.push('Username is required')
        }

        return errorMessages;
    }
    
    validatePassword(errorMessages) {
        if (!this.state.password) {
            errorMessages.push('Password is required')
        }

        return errorMessages;
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return(
            <div className="page-wrapper">
                <Nav currentComponent='Login'/>
                <header>
                    <h2 className="page-header">Login</h2>
                </header>

                <ErrorMessages errorMessages={this.state.errorMessages}/>

                <form className="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor="username">Username/Company Name</label>
                    <input id="username" type="text"
                        onChange={(e) => this.handleChangeInput(e)}/>

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" 
                        onChange={(e) => this.handleChangeInput(e)}/>

                    <div className="choose-buttons">
                        <button
                            onClick={(e) => this.handleCancel(e)}>
                            Cancel
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default withRouter(Login);