import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';

function Nav(props) {

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

    const linksToInclude = {
        'LandingPage': [signup, login],
        'Homepage': [shop, newProduct, yourProducts, purchasedItems],
        'NewProduct': [homescreen, shop, yourProducts, purchasedItems],
        'YourProducts': [homescreen, shop, newProduct, purchasedItems],
        'PurchasedItems': [homescreen, shop, newProduct, yourProducts],
        'SignUp': [login],
        'Login': [signup] 
    }

    const navOptions = linksToInclude[props.currentComponent];
    
    return(
        <nav role="navigation">
            {navOptions}
        </nav>
    );
}

export default Nav;