import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import {withRouter} from 'react-router-dom';
import ErrorMessages from '../Components/Error/errorMessages';
import './signup.css';
import TenderContext from '../context';

class SignUp extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);

        this.state = {
            errorMessages: [],
            user: {
                username: '',
                password: '',
                description: ''
            }
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.valdiateSubmit = this.valdiateSubmit.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.setErrorMessages = this.setErrorMessages.bind(this);
    }

    handleChangeInput(e) {
        const newUserInfo = Object.assign({}, this.state.user)
        newUserInfo[e.target.id] = e.target.value;

        this.setState({
            user: newUserInfo
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const errorMessages = this.valdiateSubmit();

        if (errorMessages.length === 0) {
            this.context.changeUser(this.state.user)

            this.props.history.push('/homepage/');
        }
        else {
            this.setErrorMessages(errorMessages);
        }
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
        if (!this.state.user.username) {
            errorMessages.push('Username is required')
        }
        if (this.state.user.username.length < 6) {
            errorMessages.push('Usernames must be longer than 5 characters')
        }
        return errorMessages;
    }
    
    validatePassword(errorMessages) {
        if (!this.state.user.password) {
            errorMessages.push('Password is required')
        }
        if (this.state.user.password.length < 6) {
            errorMessages.push('Passwords must be longer than 5 characters')
        }
        if (this.state.user.password.length > 72) {
            errorMessages.push('Passwords can not be longer than 72 characters')
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
                <Nav currentComponent='SignUp'/>
                <header>
                    <h2 className="page-header">Sign Up</h2>
                </header>

                <ErrorMessages errorMessages={this.state.errorMessages}/>

                <form className="signup-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor="username">Username/Company Name</label>
                    <input id="username" type="text" 
                        value={this.state.user.username}
                        onChange={(e) => this.handleChangeInput(e)}/>

                    <label htmlFor="password">Password</label>
                    <input id="password" type="text" 
                        value={this.state.user.password}
                        onChange={(e) => this.handleChangeInput(e)}/>

                    <label htmlFor="description">Description</label>
                    <textarea id="description"
                        onChange={(e) => this.handleChangeInput(e)}
                        value={this.state.user.description}>
                    </textarea>

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

export default withRouter(SignUp);