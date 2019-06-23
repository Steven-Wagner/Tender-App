import React, {Component} from 'react';
import mockData from '../../mockData';
import './ad.css'

class Ad extends Component {
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

    render() {
        return(
            <div className='ad'>
                <h3>{this.state.currentAd.title}</h3>
                <img className="ad-img" src={this.state.currentAd.img} alt={mockData.ads[0].title}/>
                <p className="description">{this.state.currentAd.description}</p>
                <p>Price: {this.state.currentAd.price}</p>
            </div>
        )
    }
} 

export default Ad;