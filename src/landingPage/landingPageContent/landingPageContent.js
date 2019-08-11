import React from 'react';
import {Link} from 'react-router-dom';

function LandingPageContent(props) {
    return (
        <div className="landing-page">
            <section>
                <header>
                    <h3>Create</h3>
                </header>
                <img className="screenshot" src="https://i.imgur.com/5zEO1tV.png" alt="Your Products Screenshot"/>
                <p>Pitch ideas for new products and see if people would be willing to buy them.</p>
            </section>
            <section>
                <header>
                    <h3>Sell</h3>
                </header>
                <img className="screenshot" src="https://i.imgur.com/u1xYLHh.png" alt="Your Products Edit Screenshot"/>
                <p>Set the price point for your new product and earn Play Money when other users decide that your product is worth buying.</p>
            </section>
            <section>
                <header>
                    <h3>Buy</h3>
                </header>
                <img className="screenshot" src="https://i.imgur.com/vE9j76w.png" alt="Shop Products Screenshot"/>
                <p>Spend your Play Money to purchase other players' inventions and get bonuses if those inventions turn out to be the next big thing.</p>
            </section>
            <section>
                <header>
                    <h3>Start Making Play Money Now!</h3>
                </header>
            <button><Link to="/signup/">Sign-up</Link></button>
        </section>
    </div>
    );
}

export default LandingPageContent;