import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import Footer from '../Components/Footer/footer';
import HomepageAd from '../Components/Hompage Ad/homepage-ad';
import UserInfo from '../Components/UserInfo/userInfo';
import TopSellingItems from '../Components/TopSellingItems/topSellingItems'
import TenderContext from '../context';

class Homepage extends Component {

    static contextType = TenderContext;

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        return(
            <div className="nav-space">
                <Nav currentComponent='Homepage'/>
                <div className="page-wrapper">
                    <HomepageAd/>
                    <UserInfo/>

                    <TopSellingItems 
                        status='user'
                        popularProducts={this.context.usersPopularProducts}/>
                    <TopSellingItems 
                        status='overall'
                        popularProducts={this.context.popularProducts}/>

                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Homepage;