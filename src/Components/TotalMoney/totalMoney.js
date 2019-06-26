import React, {Component} from 'react';

//I want to add animation and a cool logo for play money which is why this will be it's own component

class TotalMoney extends Component {

    render() {
        return(
            <div>
                <p>Play Money: {this.props.totalMoney}</p>
            </div>
        )
    }
}

export default TotalMoney;