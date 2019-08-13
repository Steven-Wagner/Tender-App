import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './totalMoney.css'

class TotalMoney extends Component {

    render() {
        return(
            <div className="total-money">
                <p><FontAwesomeIcon className="coins" icon="coins" /> {this.props.totalMoney}</p>
            </div>
        )
    }
}

export default TotalMoney;