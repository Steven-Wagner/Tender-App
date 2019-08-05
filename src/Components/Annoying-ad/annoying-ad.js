import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TenderContext from '../../context';
import './annoying-ad.css'
import TokenService from '../../services/Token-services';
import {API_BASE_URL} from '../../config';

class AnnoyingAd extends Component {

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
        this.fetchGetAnnoyingAd = this.fetchGetPopupAd.bind(this);
    }

    componentDidMount() {
        this.setAdInterval = setInterval(() => this.setRandomAd(), 120000);
        this.setRandomAd();
    }

    componentWillUnmount() {
        clearInterval(this.setAdInterval)
    }

    setRandomAd() {

        this.fetchGetAnnoyingAd()
        .then(newAd => {
            this.setState({
                currentAd: newAd,
                visable: true
            })
        })
    }

    fetchGetAnnoyingAd() {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/ads/Annoying ads/${TokenService.getUserId()}`, {
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
            <div className='annoying-ad'>
                <h3>Check Out This Awesome Product!</h3>
                <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                    <h3>{this.state.currentAd.title}</h3>
                    <img className="ad-img" src={this.state.currentAd.img} alt={this.state.currentAd.title}/>
                    <p className="description">{this.state.currentAd.description}</p>
                    <p>Price: {this.state.currentAd.price}</p>
                </Link>
                <div className='annoyingad-buttons'>
                    <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                        <button>I'm not not Interested</button>
                    </Link>
                    <button className='not-interested-button' onClick={() => this.removePopup()}>I'm not not not Interested</button>
                    <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                        <button>I Want It!</button>
                    </Link>
                </div>
            </div>
        )
    }
} 

export default AnnoyingAd;