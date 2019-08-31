import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
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
                <main className="page-wrapper">
                    <HomepageAd/>
                    <UserInfo/>

                    <TopSellingItems 
                        //Renders the user top items
                        status='user'
                        popularProducts={this.context.usersPopularProducts}/>
                    <TopSellingItems 
                        //Render overall top items
                        status='overall'
                        popularProducts={this.context.popularProducts}/>
                </main>
            </div>
        )
    }
}

export default Homepage;