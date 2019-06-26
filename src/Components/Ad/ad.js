import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TenderContext from '../../context';
import mockData from '../../mockData';
import './ad.css'

class Ad extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);
        this.state = {
            adData: mockData.ads,
            currentAd: {
                title: mockData.ads[0].title,
                img: mockData.ads[0].img,
                price: mockData.ads[0].price
            }
        }

        this.setRandomAd = this.setRandomAd.bind(this);
        this.handleAdClicked = this.handleAdClicked.bind(this);
    }

    componentDidMount() {
        this.setAdInterval = setInterval(() => this.setRandomAd(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.setAdInterval)
    }

    setRandomAd() {
        const newAdIndex = Math.floor(Math.random()*this.state.adData.length)

        this.setState({
            currentAd: {
                title: mockData.ads[newAdIndex].title,
                img: mockData.ads[newAdIndex].img,
                price: mockData.ads[newAdIndex].price,
                description: mockData.ads[newAdIndex].description
            }
        })
    }

    handleAdClicked() {
        this.context.updateCurrentShoppingItem(this.state.currentAd)
    }

    render() {
        return(
            <div className='ad'>
                <Link to="/shop/" onClick={() => this.handleAdClicked()}>
                    <h3>{this.state.currentAd.title}</h3>
                    <img className="ad-img" src={this.state.currentAd.img} alt={mockData.ads[0].title}/>
                    <p className="description">{this.state.currentAd.description}</p>
                    <p>Price: {this.state.currentAd.price}</p>
                </Link>
            </div>
        )
    }
} 

export default Ad;