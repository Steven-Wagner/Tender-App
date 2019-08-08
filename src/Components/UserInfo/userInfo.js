import React, {Component} from 'react';
import './userInfo.css';
import TenderContext from '../../context';
import TotalMoney from '../TotalMoney/totalMoney';

class UserInfo extends Component {

    static contextType = TenderContext;

    render() {
        return(
            <div className="info">
                <div className="name-money">
                    <p className="name">{this.context.userInfo.username}</p>
                    <p className="play-money-total">
                        <TotalMoney totalMoney={this.context.userInfo.money}/>
                    </p>
                </div>
                <div className="description">
                    <p>{this.context.userInfo.description}</p>
                </div>
            </div>
        )
    }
}

export default UserInfo;