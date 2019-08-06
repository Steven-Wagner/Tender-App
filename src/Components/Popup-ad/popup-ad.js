import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TenderContext from '../../context';
import './popup-ad.css'
import TokenService from '../../services/Token-services';
import {API_BASE_URL} from '../../config';

class PopupAd extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);
        this.state = {
            currentAd: {
                title: '',
                img: '',
                price: '',
                description: ''
            },
            visable: false
        }

        this.setRandomAd = this.setRandomAd.bind(this);
        this.handleAdClicked = this.handleAdClicked.bind(this);
        this.removePopup = this.removePopup.bind(this);
        this.fetchGetPopupAd = this.fetchGetPopupAd.bind(this);
    }

    componentDidMount() {
        this.setAdInterval = setInterval(() => this.setRandomAd(), 120000);
        this.setRandomAd();
    }

    componentWillUnmount() {
        clearInterval(this.setAdInterval)
    }

    setRandomAd() {

        if (TokenService.getUserId()) {
            this.fetchGetPopupAd()
            .then(newAd => {
                this.setState({
                    currentAd: newAd,
                    visable: true
                })
            })
        }
    }

    fetchGetPopupAd() {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/ads/Popup ads/${TokenService.getUserId()}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    }
    removePopup() {
        this.setState({
            visable: false
        })
    }

    handleAdClicked() {
        this.context.updateCurrentShoppingItem(this.state.currentAd)
        this.removePopup();
    }

    render() {

        if (!this.state.currentAd.title || !this.state.visable) {
            return '';
        }

        return(
            <div className='popup-ad'>
                <h3>Check Out This Awesome Product!</h3>
                <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                    <h3>{this.state.currentAd.title}</h3>
                    <img className="ad-img" src={this.state.currentAd.img} alt={this.state.currentAd.title}/>
                    <p className="description">{this.state.currentAd.description}</p>
                    <p>Price: {this.state.currentAd.price}</p>
                </Link>
                <div className='popupad-buttons'>
                    <button onClick={() => this.removePopup()}>No Thanks</button>
                    <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                        <button>I Want It!</button>
                    </Link>
                </div>
            </div>
        )
    }
} 

export default PopupAd;