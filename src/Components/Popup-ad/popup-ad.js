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

        //ad will only show first 150 characters of description
        let shortDescription = 'No Description';
        if (this.state.currentAd.description) {
        shortDescription = this.state.currentAd.description.substring(0,75);
        }

        //If there is no img, it will not display
        let displayImg = '';
        if (this.state.currentAd.img) {
            displayImg = <img className="ad-img" src={this.state.currentAd.img} alt={this.state.currentAd.title}/>
        }

        let adContent =
            <Link className="popup-link" to="/shop/" onClick={() => this.handleAdClicked()}>
                <h3>{this.state.currentAd.title}</h3>
                {displayImg}
                <p className="description">{shortDescription}...</p>
                <p className="price">Price: {this.state.currentAd.price}</p>
            </Link>;

        let choiceButtons = 
        <div className='popupad-buttons'>
            <button onClick={() => this.removePopup()}>No Thanks</button>
            <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                <button>I Want It!</button>
            </Link>
        </div>

        if (this.props.pathname === '/shop/') {
            adContent =
            <div onClick={() => this.handleAdClicked()}>
                <h3>{this.state.currentAd.title}</h3>
                {displayImg}
                <p className="description">{shortDescription}...</p>
                <p className="price">Price: {this.state.currentAd.price}</p>
            </div>;

            choiceButtons =
            <div className='popupad-buttons'>
                <button onClick={() => this.removePopup()}>No Thanks</button>
                <button onClick={() => this.handleAdClicked()}>I Want It!</button>
            </div>;
        }

        return(
            <div className='popup-ad'>
                <h3 className="popup-header">Check Out This Awesome Product!</h3>
                {adContent}
                {choiceButtons}
            </div>
        )
    }
} 

export default PopupAd;