import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './nav.css';
import TokenService from '../../services/Token-services';
import TenderContext from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Nav extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props)
        this.logUserOut = this.logUserOut.bind(this);
    }

    logUserOut() {
        TokenService.clearAuthToken();
    }
    render() {

        //All possible links that may be present in Nav
        const shop = 
            <Link to={'/shop/'} key='shop'><FontAwesomeIcon className="shopping-cart-icon" icon="shopping-cart" />Shop</Link>
        const homescreen = 
            <Link to={'/homepage/'} key='homepage'>Homepage</Link>
        const yourProducts = 
            <Link to={'/yourproducts/'} key='yourproducts'>Your Products</Link>
        const purchasedItems = 
            <Link to={'/purchaseditems/'} key='purchasedoitems'>Purchased Items</Link>
        const newProduct = 
            <Link to={'/newproduct/'} key='newproduct'>New Product</Link>
        const login = 
            <Link to={'/login/'} key='login'>Login</Link>
        const signup = 
            <Link to={'/signup/'} key='signup'>Sign Up</Link>
        const logout = 
            <Link to={''} onClick={() => this.logUserOut()} key='logout'>Logout</Link>
        const landingpage = 
            <Link to={''} key='logout'>Landing Page</Link>

        //Which links appear in the Nav depending on the current page
        const linksToInclude = {
            'LandingPage': [signup, login],
            'Homepage': [shop, newProduct, yourProducts, purchasedItems, logout],
            'NewProduct': [homescreen, shop, yourProducts, purchasedItems, logout],
            'YourProducts': [homescreen, shop, newProduct, purchasedItems, logout],
            'PurchasedItems': [homescreen, shop, newProduct, yourProducts, logout],
            'SignUp': [login, landingpage],
            'Login': [signup, landingpage] 
        }

        //Nav toggles visability based on scrolling behavior. When user scrolls up nav appears, scrolls down to remove it. See App.js handleScroll() for more
        let navOptions;
        if (this.context.navVisable) {
            navOptions = linksToInclude[this.props.currentComponent];
        }
        else {return ''}

        return(
            <nav role="navigation">
                {navOptions}
            </nav>
        );
    }
}

export default Nav;