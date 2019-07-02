import React from 'react';
import {Link} from 'react-router-dom';

function LandingPageContent(props) {
    return (
        <div>
            <section>
                <header>
                    <h3>Create</h3>
                </header>
                <p>[<em>placeholder for screenshot of The Shower Toaster (Toast Bread While You Shower!)</em>]</p>
                <p>Pitch ideas for new products and see if people would be willing to buy them.</p>
            </section>
            <section>
                <header>
                    <h3>Sell</h3>
                </header>
                <p>[<em>placeholder for screenshot of setting price on Flux Capacitor (lightly used) Price: 10 Play Money</em>]</p>
                <p>Set the price point for your new product and earn Play Money when other users decide that your product is worth buying.</p>
            </section>
            <section>
                <header>
                    <h3>Buy</h3>
                </header>
                <p>[<em>placeholder for screenshot shopping screen with Hand Drying Pants Pad (Finally! Pants For Drying your Hands. Garenteed to work better than the air dryer)</em>]</p>
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