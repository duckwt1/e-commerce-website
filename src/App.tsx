import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './css/App.css';
import Footer from "./layouts/header-footer/Footer";
import Header from "./layouts/header-footer/header";
import PolicyPage from "./layouts/pages/PolicyPage";
import Homepage from "./layouts/pages/homepage"
import Navigation from "./layouts/header-footer/components/Navigation";
import { FaArrowAltCircleUp } from "react-icons/fa";
import RegisterPage from "./layouts/user/RegisterPage";
import LoginPage from "./layouts/user/LoginPage";
import { CartItemProvider } from './layouts/utils/CartItemContext';
import { AuthProvider } from "./layouts/utils/AuthContext";
import { ConfirmProvider } from "material-ui-confirm";
import ProductDetail from "./layouts/products/ProductDetail";
import {getAllImageByProduct} from "./api/ImageAPI";
import ActiveAccount from "./layouts/user/ActiveAccount";
import {ForgotPassword} from "./layouts/user/ForgotPassword";

const MyRoutes = () => {
    const [reloadAvatar, setReloadAvatar] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    let lastScrollY = 0;

    const location = useLocation();  // Lấy URL hiện tại

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementsByClassName("header")[0] as HTMLElement | undefined;
            const navbar = document.getElementsByClassName("navbar")[0] as HTMLElement | undefined;
            if (!header || !navbar) return;

            const sticky = header.offsetHeight;
            if (window.scrollY > lastScrollY) setIsHeaderVisible(false); // Scrolling down
            else setIsHeaderVisible(true); // Scrolling up
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

    // Kiểm tra URL hiện tại để không hiển thị Header và Footer trên trang đăng nhập
const listHideHeaderFooter = ['/login', '/register', '/forgot-password'];
const hideHeaderFooter = listHideHeaderFooter.includes(location.pathname);



//tesst
    getAllImageByProduct(1).then((images) => {
        const imageUrls = images.map(image => image.urlImage);
        console.log("All image URLs:", imageUrls);
    }).catch(error => {
        console.error("Error fetching images:", error);
    });

    return (
        <div className="App">
            {!hideHeaderFooter && (
                <>
                    <div className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}><Header /></div>
                    <div className={`navbar ${isSticky ? 'sticky' : ''}`} style={{ padding: '0' }}><Navigation /></div>
                </>
            )}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path='/api/products/:productId' element={<ProductDetail />} />
                <Route path="/policy" element={<PolicyPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/activate-account/:email/:activationCode' element={<ActiveAccount/>}></Route>
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
            {showScrollButton && (
                <button onClick={scrollToTop} className="scroll-to-top">
                    <FaArrowAltCircleUp />
                </button>
            )}
            {!hideHeaderFooter && <Footer />}
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <CartItemProvider>
                <ConfirmProvider>
                    <Router>
                        <MyRoutes />
                    </Router>
                </ConfirmProvider>
            </CartItemProvider>
        </AuthProvider>
    );
}

export default App;
