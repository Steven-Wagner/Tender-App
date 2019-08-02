import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import Footer from '../Components/Footer/footer';
import Ad from '../Components/Ad/ad';
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
            <div className="page-wrapper">
                <Nav currentComponent='Homepage'/>

                <Ad/>
                <UserInfo/>

                <TopSellingItems 
                    status='user'
                    popularProducts={this.context.usersPopularProducts}/>
                <TopSellingItems 
                    status='overall'
                    popularProducts={this.context.popularProducts}/>

                <Footer/>
            </div>
        )
    }
}

export default Homepage;