import React, {Component} from 'react';
import mockData from '../../mockData';
import './userInfo.css';

class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                username: mockData.user[0].username,
                money: mockData.user[0].money,
                description: mockData.user[0].description
            }
        }
    }

    render() {
        return(
            <div className="info">
                <div className="name-money">
                    <p className="name">{this.state.userInfo.username}</p>
                    <p className="play-money-total">{this.state.userInfo.money}</p>
                </div>
                <div className="description">
                    <p>{this.state.userInfo.description}</p>
                </div>
            </div>
        )
    }
}

export default UserInfo;