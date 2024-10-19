import React, { useEffect, useState } from 'react';
import '../../css/navbar.css';
function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);


        useEffect(() => {
            // Khai báo kiểu cho resizeTimeout
            let resizeTimeout: number | null = null;

            const handleResize = () => {
                // Nếu đã có requestAnimationFrame trước đó, hủy bỏ nó
                if (resizeTimeout !== null) {
                    cancelAnimationFrame(resizeTimeout);
                }

                // Thêm requestAnimationFrame để tối ưu hóa việc resize
                resizeTimeout = requestAnimationFrame(() => {
                    setIsMobile(window.innerWidth <= 992);
                });
            };

            window.addEventListener('resize', handleResize);

            // Cleanup khi component unmounts
            return () => {
                window.removeEventListener('resize', handleResize);
                if (resizeTimeout !== null) {
                    cancelAnimationFrame(resizeTimeout);
                }
            };
        }, []); // Chỉ chạy một lần khi component mount




    return (


        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{paddingBottom: '0', paddingTop: '0'}}>
            <div className="container-fluid d-flex justify-content-center" style={{background: '#edfef3', height: '6vh'}}>
                    {/*freeship cho đơn từ 45k*/}
               <a>  <img src={"/top1.png"} alt="freeship" /></a>
            </div>
                <div className="container-fluid pb-4 pt-4" style={{background: '#ffffff', height: '10vh'}}>

                    {/* Đưa nút toggler ra trước các thành phần khác */}
                    <button className="navbar-toggler me-0 " type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>

                    {isMobile && (
                        <ul className="navbar-nav d-flex flex-row ms-auto me-3">
                            <li className="">
                                <a className="item nav-link me-3 " href="#" style={{fontWeight: '800',color:'#36abff'}}>Sign up</a>
                            </li>
                            <li className="">
                                <a className="item nav-link ms-2" href="#">Sign in</a>
                            </li>
                        </ul>)}


                    <div className="navCollapse collapse navbar-collapse " id="navbarSupportedContent">

                        {isMobile && (
                            <div className="custom-hr" style={{background:'#36abff'}}></div>
                        )}

                        <a className="navbar-brand" href="#">
                            <img src={"/logotiki.png"} alt="logo" style={{width: '80px', marginRight:'3rem', marginLeft:'2rem'}}/>
                        </a>

                        <form className="me-5 ms-3 d-flex mb-3 mb-lg-0 justify-content-center form-search">
                            <div className="form-white input-group" style={{width: '65vh'}}>
                                <input
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Search for everything you want !"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                />
                            </div>
                        </form>

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="item item1 nav-item me-2">
                                <a className="item nav-link" href="#">Pull request</a>
                            </li>
                            <li className=" item1 nav-item me-2">
                                <a className="item nav-link" href="#">Issues</a>
                            </li>
                            <li className=" item1 nav-item me-2">
                                <a className="item nav-link" href="#">Marketplace</a>
                            </li>
                            <li className="item item1 nav-item">
                                <a className="item nav-link" href="#">Explore</a>
                            </li>
                        </ul>

                        {!isMobile && (
                            <ul className="navbar-nav d-flex flex-row ms-auto me-3">
                                <li className="">
                                    <a className="item nav-link me-3 " style={{fontWeight: '800',color:'#36abff'}} href="#">Sign up</a>
                                </li>
                                <li className="">
                                    <a className="item nav-link ms-2" style={{fontWeight: 'bold'}} href="#">Sign in</a>
                                </li>
                            </ul>)}

                    </div>

                </div>


                {/* Dòng navbar thứ hai cho các chính sách */}

                <div className="container-fluid" style={{background: '#36abff'}}>
                    <ul className="navbar-nav d-flex flex-row mx-auto">
                        <li className="nav-item me-3  mx-2 text-light d-flex align-items-center">
                            <a className="item2 nav-link" href="#">Commitment</a>
                        </li>
                        <li className="nav-item me-3  mx-2 text-light d-flex align-items-center">
                            <img className='img' src="/hangthat.png" alt="ship" style={{width: '20px'}}/>
                            <a className="item2 nav-link ms-1" href="#">100% genuine </a>
                        </li>
                        <li className="nav-item me-3 mx-2 text-light d-flex align-items-center">
                            <img className='img' src="/freeship.png" alt="ship" style={{width: '20px'}}/>
                            <a className="item2 nav-link" href="#">Free Shipping</a>
                        </li>
                        <li className="nav-item me-3 mx-2 d-flex align-items-center">
                            <img className='img' src="/refund.png" alt="ship" style={{width: '20px'}}/>
                            <a className="item2 nav-link ms-1" href="#">30-day refund</a>
                        </li>
                        <li className="nav-item  mx-1 text-light d-flex align-items-center">
                            <img className='img' src="/giaohangnhanh.png" alt="ship" style={{width: '20px'}}/>
                            <a className="item2 nav-link" href="#">Fast delivery in 2 hours</a>
                        </li>
                        {/* Thêm các mục khác nếu cần */}
                    </ul>
                </div>

        </nav>


    );
}

export default Navbar;
