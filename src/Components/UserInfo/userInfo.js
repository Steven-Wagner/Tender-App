import React, {Component} from 'react';
import './userInfo.css';
import TenderContext from '../../context';

class UserInfo extends Component {

    static contextType = TenderContext;

    render() {
        return(
            <div className="info">
                <div className="name-money">
                    <p className="name">{this.context.userInfo.username}</p>
                    <p className="play-money-total">{this.context.totalMoney}</p>
                </div>
                <div className="description">
                    <p>{this.context.userInfo.description}</p>
                </div>
            </div>
        )
    }
}

export default UserInfo;