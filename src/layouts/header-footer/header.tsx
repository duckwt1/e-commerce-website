
import React from 'react';
import Searchbar from "./components/searchbar";
import {SiTicktick} from "react-icons/si";
import {FaShippingFast, FaUserCircle} from "react-icons/fa";
import {RiRefund2Fill} from "react-icons/ri";
import {PiShippingContainerBold} from "react-icons/pi";
import {IoMdCart} from "react-icons/io";
import {Link, Route, useNavigate} from "react-router-dom";
import UserMenu from "./components/UserMenu";
import {useCartItem} from "../utils/CartItemContext";
import {useAuth} from "../utils/AuthContext";
import {isToken} from "../utils/JwtService";
export default function Header() {
    const { totalCart, setTotalCart, setCartList } = useCartItem();
    const { setLoggedIn } = useAuth();
    const navigate = useNavigate();
    return (
        <nav className="header navbar navbar-expand-lg navbar-light bg-light" style={{paddingBottom: '0', paddingTop: '0'}}>
            <div className="top1 container-fluid d-flex justify-content-center align-items-center"
                 style={{background: '#06183f', height: '50px'}}>
                <p style={{color: '#fff', fontSize:'18px'}}>
                    Free shipping <span style={{color: '#f3ab2b', fontWeight: 'bold'}}>for orders over 10 $</span>
                </p>
            </div>

            <div className="container-fluid" style={{background: '#ffffff'}}>
                <Link className="navbar-brand ms-5" to="/">
                    <img src="/logo.png" alt="logo" style={{width: '70px'}}/>
                </Link>
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

                            <li className="nav-2 nav-item d-flex align-items-center">
                                <Link className="nav-link-text" to="/policy">POLICY</Link>
                            </li>
                            <li className="nav-3 me-3 nav-item d-flex align-items-center">
                                <a className="nav-link-text last"  style={{color:'#da1313'}}>ABOUT</a>
                            </li>
                            {/*<li className="nav-cart nav-item d-flex align-items-center">*/}
                            {/*    <a className="nav-link ms-4 me-1" href="#" >*/}
                            {/*        <IoMdCart size={30} color={'#8a0b0b'}/>*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                            {/* <!-- Shopping Cart --> */}
                            <Link className='text-reset  nav-link ms-4 me-1' to='/cart'>
                                        <IoMdCart size={30} color={'#306b94'}/>
                                <span className='badge rounded-pill badge-notification bg-danger'>
							{totalCart ? totalCart : ""}
						</span>
                            </Link>

                            <li className="nav-user nav-item d-flex">
                                {/*<Link to={"/profile"} className="nav-link me-2"> <FaUserCircle size={30} color={'#9d0606'}/></Link>*/}
                                {isToken() && (
                                    <UserMenu />
                                )}
                                {!isToken() && (
                                    <a href="#" className="nav-link me-2" onClick={() => navigate("/login")}>
                                        <FaUserCircle size={30} color={'#9d0606'}/>
                                    </a>
                                )}
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
