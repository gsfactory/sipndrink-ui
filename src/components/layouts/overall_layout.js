import React from 'react';
// import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
    return (
        <>
            <header id="header" className="header d-flex align-items-center">
                <div className="header_area">
                <div className="main_header_area animated">
                    <div className="container-fluid">
                    <nav id="navigation1" className="navigation">
                        <div className="nav-header">
                        <a className="nav-brand" href="/"><img src="/logo.svg" /></a>
                        </div>
                        <ul className="header-right">
                        <li><a href="#"><i className="fa fa-whatsapp"></i>  +91 8162658928</a></li>
                        <li><a data-toggle="modal" data-target="#myModal" className="bookbtn">Book Now</a></li>
                        </ul>
                    </nav>
                    </div>
                </div>
                </div>
            </header>

            {children}

           <Footer /> 
        </>
    )
}
