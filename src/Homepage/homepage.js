import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import Footer from '../Components/Footer/footer';
import Ad from '../Components/Ad/ad';
import UserInfo from '../Components/UserInfo/userInfo';
import TopSellingItems from '../Components/TopSellingItems/topSellingItems'

class Homepage extends Component {
    render() {
        return(
            <div>
                <Nav currentComponent='Homepage'/>

                <Ad/>
                <UserInfo/>

                <TopSellingItems status='user'/>
                <TopSellingItems status='overall'/>

                <Footer/>
            </div>
        )
    }
}

export default Homepage;