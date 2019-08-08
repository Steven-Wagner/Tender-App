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
        this.fetchGetAnnoyingAd = this.fetchGetAnnoyingAd.bind(this);
    }

    componentDidMount() {
        this.setAdInterval = setInterval(() => this.setRandomAd(), 60000);
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
        //if there is no ad, popup will not display
        if (!this.state.currentAd.title || !this.state.visable) {
            return '';
        }

        //If there is no img, it will not display
        let displayImg = '';
        if (this.state.currentAd.img) {
            displayImg = <img className="ad-img" src={this.state.currentAd.img} alt={this.state.currentAd.title}/>
        }

        //ad will only show first 150 characters of description
        let shortDescription = 'No Description';
        if (this.state.currentAd.description) {
        shortDescription = this.state.currentAd.description.substring(0,150);
        }

        let adContent = 
        <Link className="ad-click" to="/shop/" onClick={() => this.handleAdClicked()}>
            <h3>{this.state.currentAd.title}</h3>
            {displayImg}
            <p className="description">{shortDescription}...</p>
            <p className="price">Price: {this.state.currentAd.price}</p>
            <p className="number-sold">{this.state.currentAd.sold} people have already bought this product. Don't you want to be like them!</p>
        </Link>;

        let buttons =
        <div className='annoyingad-buttons'>
            <div className='confuse-buttons'>
                <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                    <button>I'm not not Interested</button>
                </Link>
                <button className='not-interested-button' onClick={() => this.removePopup()}>I'm not not not Interested</button>
            </div>
            <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                <button className='want-it'>I Want It!</button>
            </Link>
        </div>

        if (this.props.pathname === '/shop/') {
            adContent =
            <div className="ad-click" to="/shop/" onClick={() => this.handleAdClicked()}>
                <h3 className="anoying-ad-header">{this.state.currentAd.title}</h3>
                {displayImg}
                <p className="description">{shortDescription}...</p>
                <p className="price">Price: {this.state.currentAd.price}</p>
                <p className="number-sold">{this.state.currentAd.sold} people have already bought this product. Don't you want to be like them!</p>
            </div>;

            buttons =
            <div className='annoyingad-buttons'>
                <div className='confuse-buttons'>
                    <button onClick={() => this.handleAdClicked()}>I'm not not Interested</button>
                    <button className='not-interested-button' onClick={() => this.removePopup()}>I'm not not not Interested</button>
                </div>
                    <button onClick={() => this.handleAdClicked()} className='want-it'>I Want It!</button>
            </div>
        }

        return(
            <div className='annoying-ad'>
                <h3 className="annoying-ad-header">Check Out This Awesome Product!</h3>
                {adContent}
                {buttons}
            </div>
        )
    }
} 

export default AnnoyingAd;