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
        this.setAdInterval = setInterval(() => this.setRandomAd(), 18000);
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
        if (this.props.item.img) {
            displayImg = <img className="ad-img" src={this.props.item.img} alt={this.props.item.title}/>
        }

        //ad will only show first 150 characters of description
        let shortDescription = 'No Description';
        if (this.state.currentAd.description) {
        shortDescription = this.state.currentAd.description.substring(0,150);
        }

        return(
            <div className='annoying-ad'>
                <h3>Check Out This Awesome Product!</h3>
                <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                    <h3>{this.state.currentAd.title}</h3>
                    {displayImg}
                    <p className="description">{shortDescription}...</p>
                    <p>Price: {this.state.currentAd.price}</p>
                    <p className="number-sold">{this.state.currentAd.sold} people have already bought this product. Don't you want to be like them!</p>
                </Link>
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
            </div>
        )
    }
} 

export default AnnoyingAd;