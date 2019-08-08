import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './totalMoney.css'

//I want to add animation and a cool logo for play money which is why this will be it's own component

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