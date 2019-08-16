import React from 'react';
import LandingPageContent from './landingPageContent/landingPageContent';
import Nav from '../Components/Nav/nav';
import MainTitle from '../Components/MainTitle/mainTitle';
import Footer from '../Components/Footer/footer';
import './landingPage.css';

function LandingPage() {
    return(
        <div className="nav-space">
                <Nav currentComponent='LandingPage'/>
            <main className="page-wrapper">
                <MainTitle/>
                <LandingPageContent/>
                <Footer/>
            </main>
        </div>
    );
}

export default LandingPage;