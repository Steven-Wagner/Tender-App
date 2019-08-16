import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import {withRouter} from 'react-router-dom';
import ErrorMessages from '../Components/Error/errorMessages';
import './login.css';
import {API_BASE_URL} from '../config';
import TokenService from '../services/Token-services';
import TenderContext from '../context';
import Loading from '../Components/Loading/loading';

class Login extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);

        this.state = {
            errorMessages: [],
            username: '',
            password: '',
            loading: false
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.submitLoginInfo = this.submitLoginInfo.bind(this);
        this.changeLoadingStatus = this.changeLoadingStatus.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
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
            this.submitLoginInfo()
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

    changeLoadingStatus(status=true) {
        this.setState({
            loading: status
        })
    }

    submitLoginInfo() {
        this.changeLoadingStatus(true);
        const loginBody = {
            username: this.state.username.trim(),
            password: this.state.password.trim()
        }
            console.log('getting to fetch')
            this.fetchPostLoginInfo(loginBody)
            .then(authInfo => {
                console.log('auth', authInfo)
                const user_id = authInfo.user_id;

                TokenService.saveAuthToken(authInfo.authToken, user_id);

                //chnageUser() fetches most of the user's data
                this.context.changeUser({id: user_id})
                .then(res => {
                    this.changeLoadingStatus(false);
                    if (res) {
                        this.setErrorMessages([res.message])
                    }
                    else {
                        //Move browser view to homepage
                        this.props.history.push('/homepage/');
                    }
                })
            })
            .catch(error => {
                console.log('error in catch');
                this.setErrorMessages([error.message])
                this.changeLoadingStatus(false);
            })
    }

    fetchPostLoginInfo = loginBody => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(loginBody)
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => reject(e))
                        : resolve(res.json())
                })
                .catch(error => {
                    reject(error)
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        //Renders submit and cancel buttons or loading icon
        const buttonsOrLoading = !this.state.loading
            ?
            <div className="choose-buttons">
                <button
                    onClick={(e) => this.handleCancel(e)}>
                    Cancel
                </button>
                <button className="submit-button" type="submit">Submit</button>
            </div>
            :
            <Loading/>;

        return(
            <div className="nav-space">
                <Nav currentComponent='Login'/>
                <main className="page-wrapper">
                    <header>
                        <h1 className="page-header">Login</h1>
                    </header>

                    <ErrorMessages errorMessages={this.state.errorMessages}/>

                    <form className="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                        <label htmlFor="username">Username/Company Name</label>
                        <input id="username" type="text" autoComplete="username"
                            onChange={(e) => this.handleChangeInput(e)}/>

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" autoComplete="current-password"
                            onChange={(e) => this.handleChangeInput(e)}/>

                        {buttonsOrLoading}
                    </form>
                </main>
            </div>
        )
    }
}

export default withRouter(Login);

//Used only for testing
export {
    Login
}