import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './nav.css';
import TokenService from '../../services/Token-services';
import TenderContext from '../../context';

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

        const shop = 
            <Link to={'/shop/'} key='shop'>Shop</Link>
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

        const linksToInclude = {
            'LandingPage': [signup, login],
            'Homepage': [shop, newProduct, yourProducts, purchasedItems, logout],
            'NewProduct': [homescreen, shop, yourProducts, purchasedItems, logout],
            'YourProducts': [homescreen, shop, newProduct, purchasedItems, logout],
            'PurchasedItems': [homescreen, shop, newProduct, yourProducts, logout],
            'SignUp': [login, landingpage],
            'Login': [signup, landingpage] 
        }

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