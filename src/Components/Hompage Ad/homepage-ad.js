import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TenderContext from '../../context';
import './ad.css'
import TokenService from '../../services/Token-services';
import {API_BASE_URL} from '../../config';

class Ad extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);
        this.state = {
            currentAd: {
                title: '',
                img: '',
                price: ''
            }
        }

        this.setRandomAd = this.setRandomAd.bind(this);
        this.handleAdClicked = this.handleAdClicked.bind(this);
    }

    componentDidMount() {
        this.setAdInterval = setInterval(() => this.setRandomAd(), 5000);
        this.setRandomAd();
    }

    componentWillUnmount() {
        clearInterval(this.setAdInterval)
    }

    setRandomAd() {

        this.fetchGetHomepageAds()
        .then(newAd => {
            this.setState({
                currentAd: newAd
            })
        })
    }

    fetchGetHomepageAds() {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/ads/Homepage ads/${TokenService.getUserId()}`, {
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

    handleAdClicked() {
        this.context.updateCurrentShoppingItem(this.state.currentAd)
    }

    render() {
        let content;

        if (this.state.currentAd.title) {
            content =<div className='ad'>
                    <div className="home-info-ad">Advertisment</div>
                    <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                        <h3>{this.state.currentAd.title}</h3>
                        <img className="ad-img" src={this.state.currentAd.img} alt={this.state.currentAd.title}/>
                        <p className="price">Price: {this.state.currentAd.price}</p>
                    </Link>
                </div>
        }
        else {
            content = ''
        }

        return(
            content
        )
    }
} 

export default Ad;