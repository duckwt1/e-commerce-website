import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './css/App.css';
import Footer from "./layouts/header-footer/Footer";
import Header from "./layouts/header-footer/header";
import PolicyPage from "./layouts/pages/PolicyPage";
import Homepage from "./layouts/pages/homepage";
import Navigation from "./layouts/header-footer/components/Navigation";
import { FaArrowAltCircleUp } from "react-icons/fa";
import RegisterPage from "./layouts/user/RegisterPage";
import LoginPage from "./layouts/user/LoginPage";
import { CartItemProvider } from './layouts/utils/CartItemContext';
import { AuthProvider, useAuth } from "./layouts/utils/AuthContext";
import { ConfirmProvider } from "material-ui-confirm";
import ProductDetail from "./layouts/products/ProductDetail";
import { ForgotPassword } from "./layouts/user/ForgotPassword";
import ProfilePage from "./layouts/user/ProfilePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./layouts/user/ResetPassword";
import ChangePassword from "./layouts/user/ChangePassword";
import ActiveAccount from "./layouts/user/ActiveAccount";
import FilterPage from './layouts/pages/FilterPage';
import CartPage from "./layouts/pages/CartPage";
import FavoriteProductsList from "./layouts/products/FavoriteProductsList";
import DashboardPage from './admin/Dashboard';
import { Error404Page } from './layouts/pages/404Page';
import { Slidebar } from './admin/components/Slidebar';
import { endpointBE } from "./layouts/utils/Constant";

const MyRoutes = () => {
    const [reloadAvatar, setReloadAvatar] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    let lastScrollY = 0;

    const location = useLocation();
    const isAdminPath = location.pathname.startsWith("/admin");
    const { setLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementsByClassName("header")[0] as HTMLElement | undefined;
            const navbar = document.getElementsByClassName("navbar")[0] as HTMLElement | undefined;
            if (!header || !navbar) return;

            const sticky = header.offsetHeight;
            if (window.scrollY > lastScrollY) {
                setIsHeaderVisible(true); // Scrolling down
                setIsNavbarVisible(false); // Hide navbar
            } else {
                setIsHeaderVisible(true); // Scrolling up
                setIsNavbarVisible(false); // Hide navbar
            }
            lastScrollY = window.scrollY;

            setIsSticky(window.scrollY > sticky);
            setShowScrollButton(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true); // Set login state
        }
    }, [setLoggedIn]);

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await fetch(`${endpointBE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store token in localStorage
                setLoggedIn(true);
                navigate('/'); // Redirect to home or dashboard
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${endpointBE}/auth/get-user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Handle user data
        } else {
            throw new Error('Failed to fetch user data');
        }
    };

    const listHideHeaderFooter = ['/login', '/register', '/forgot-password', '/change-password'];
    const hideHeaderFooter = listHideHeaderFooter.includes(location.pathname);
    const isHomepage = location.pathname === '/';

    return (
        <div className="App">
            {!hideHeaderFooter && !isAdminPath && (
                <>
                    <div className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}><Header /></div>
                    <div className={`navbar ${isSticky ? 'sticky' : ''} ${isNavbarVisible ? 'visible' : 'hidden'}`} style={{ padding: '0' }}><Navigation /></div>
                </>
            )}
            <Routes>
                <Route path='/search/:idGenreParam' element={<FilterPage />}/>
                <Route path='/search' element={<FilterPage />} />
                <Route path="/" element={<Homepage />} />
                <Route path='products/:idProduct' element={<ProductDetail />} />
                <Route path='/my-favorite-books' element={<FavoriteProductsList />}/>
                <Route path='/cart' element={<CartPage />} />
                <Route path="/policy" element={<PolicyPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path ='/forgot-password' element={<ForgotPassword />} />
                <Route path='/profile' element={<ProfilePage setReloadAvatar={setReloadAvatar} />}/>
                <Route path={'/reset-password/:code'}  element={<ResetPassword/>}></Route>
                <Route path={'/change-password'} element={<ChangePassword/>}></Route>
                <Route path='/activate-account/:email/:activationCode' element={<ActiveAccount/>}></Route>
            </Routes>

            {showScrollButton && (
                <button onClick={scrollToTop} className="scroll-to-top">
                    <FaArrowAltCircleUp />
                </button>
            )}
            {!hideHeaderFooter && !isAdminPath && <Footer className={isHomepage ? 'homepage-footer' : ''} />}

            {isAdminPath && (
                <div className='row overflow-hidden w-100'>
                    <div className='col-2 col-md-3 col-lg-2'>
                        <Slidebar />
                    </div>
                    <div className='col-10 col-md-9 col-lg-10'>
                        <Routes>
                            <Route path='/admin' element={<DashboardPage />} />
                            <Route path='/admin/dashboard' element={<DashboardPage />} />
                            {isAdminPath && <Route path='*' element={<Error404Page />} />}
                        </Routes>
                    </div>
                </div>
            )}
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <CartItemProvider>
                <ConfirmProvider>
                    <Router>
                        <ToastContainer />
                        <MyRoutes />
                    </Router>
                </ConfirmProvider>
            </CartItemProvider>
        </AuthProvider>
    );
}

export default App;
