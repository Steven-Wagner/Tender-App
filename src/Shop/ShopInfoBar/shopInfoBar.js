import React from 'react';
import TotalMoney from '../../Components/TotalMoney/totalMoney';

function ShopInfoBar(props) {
    return(
        <div className="shopping-page-info">
            <div>
                <TotalMoney totalMoney={props.totalMoney}/>
            </div>
            <div>
                <button className="done-button" onClick={() => props.handleDone()}>
                    Done
                </button>
            </div>
        </div>
    )
}

export default ShopInfoBar;