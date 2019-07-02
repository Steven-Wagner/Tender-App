import React from 'react';
import LandingPageContent from './landingPageContent/landingPageContent';
import Nav from '../Components/Nav/nav';
import MainTitle from '../Components/MainTitle/mainTitle';
import Footer from '../Components/Footer/footer';

function LandingPage() {
    return(
        <div className="page-wrapper">
            <Nav currentComponent='LandingPage'/>
            <MainTitle/>
            <LandingPageContent/>
            <Footer/>
        </div>
    );
}

export default LandingPage;