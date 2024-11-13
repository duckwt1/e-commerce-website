
import React from 'react';
import Searchbar from "./components/searchbar";
import {SiTicktick} from "react-icons/si";
import {FaShippingFast, FaUserCircle} from "react-icons/fa";
import {RiRefund2Fill} from "react-icons/ri";
import {PiShippingContainerBold} from "react-icons/pi";
import {IoMdCart} from "react-icons/io";
import {Link, Route} from "react-router-dom";
export default function Header() {
    return (
        <nav className="header navbar navbar-expand-lg navbar-light bg-light" style={{paddingBottom: '0', paddingTop: '0'}}>
            <div className="top1 container-fluid d-flex justify-content-center align-items-center"
                 style={{background: '#06183f', height: '50px'}}>
                <p style={{color: '#fff', fontSize:'18px'}}>
                    Free shipping <span style={{color: '#f3ab2b', fontWeight: 'bold'}}>for orders over 10 $</span>
                </p>
            </div>

            <div className="container-fluid" style={{background: '#ffffff'}}>
                <a className="navbar-brand ms-5" href="#">
                    <img src="/logo.png" alt="logo" style={{width: '70px'}}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className=" collapse navbar-collapse me-5" id="navbarSupportedContent">
                    <div className={"nav-search d-flex justify-content-start"}
                         style={{width: '100%', marginLeft: '3%'}}>
                        {/* Search Bar */}
                        <Searchbar/>
                    </div>

                    {/* UL list aligned to the right */}
                    <div className={"d-flex justify-content-end"} style={{width: '60%', marginRight: '-3%'}}>
                        <ul className="navitems navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-1 nav-item d-flex align-items-center">
                                <Link className="nav-link-text" to="/">HOME</Link>
                            </li>
                            <li className="nav-2 nav-item d-flex align-items-center">
                                <Link className="nav-link-text" to="/policy">POLICY</Link>
                            </li>
                            <li className="nav-3 me-3 nav-item d-flex align-items-center">
                                <a className="nav-link-text last"  style={{color:'#da1313'}}>ABOUT</a>
                            </li>
                            <li className="nav-cart nav-item d-flex align-items-center">
                                <a className="nav-link ms-4 me-1" href="#" >
                                    <IoMdCart size={30} color={'#8a0b0b'}/>
                                </a>
                            </li>
                            <li className="nav-user nav-item d-flex">
                                <a className="nav-link me-2" href="#">
                                    <FaUserCircle size={30} color={'#9d0606'}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Dòng navbar thứ hai cho các chính sách */}
            <div className="nav3 container-fluid" style={{background: 'linear-gradient(135deg, #8f0e0e, #e74e60)'}}>
                <ul className="navbar-nav d-flex flex-row mx-auto">
                    <li className="nav-item me-5 mx-2 text-light d-flex align-items-center">
                        <a className="item2 nav-link" href="#">Commitment</a>
                    </li>
                    <li className="nav-item me-3 ms-2 text-light d-flex align-items-center">
                        <SiTicktick />
                        <a className="item2 nav-link ms-1" href="#">100% genuine </a>
                    </li>
                    <li className="nav-item me-3 mx-2 text-light d-flex align-items-center">
                        <PiShippingContainerBold />
                        <a className="item2 nav-link" href="#">Free Shipping</a>
                    </li>
                    <li className="nav-item me-3 mx-2 d-flex align-items-center">
                        <RiRefund2Fill color="#fff"/>
                        <a className="item2 nav-link ms-1" href="#">30-day refund</a>
                    </li>
                    <li className="nav-item mx-1 text-light d-flex align-items-center">
                        <FaShippingFast/>
                        <a className="item2 nav-link" href="#">Fast delivery in 2 hours</a>
                    </li>
                </ul>
            </div>

        </nav>


    )
}
