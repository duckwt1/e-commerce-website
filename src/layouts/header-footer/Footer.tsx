import React from "react";
import './../../css/Footer.css';


const Footer = () => {
    // Mảng các danh mục sản phẩm
    const categories = [
        {
            id: 1,
            name: 'Toys - Mother & Baby',
            products: ['Fashion for Mother and Baby', 'Toys', 'Maternity Care']
        },
        {
            id: 2,
            name: 'Fresh Food',
            products: ['Fruits', 'Meat, Eggs, Fish', 'Vegetables']
        },
        {
            id: 3,
            name: 'Women’s Fashion',
            products: ['Women’s Tops', 'Outfits', 'Women’s Jackets']
        },
        {
            id: 4,
            name: 'Bags and Luggage',
            products: ['Travel Backpacks', 'Laptop Bags', 'Suitcases']
        },
        {
            id: 5,
            name: 'International Goods',
            products: ['Home Goods', 'Fashion', 'Books']
        },
        {
            id: 6,
            name: 'Toys - Mother & Baby',
            products: ['Fashion for Mother and Baby', 'Toys', 'Maternity Care']
        },
        {
            id: 7,
            name: 'Fresh Food',
            products: ['Fruits', 'Meat, Eggs, Fish', 'Vegetables']
        },
        {
            id: 8,
            name: 'Women’s Fashion',
            products: ['Women’s Tops', 'Outfits', 'Women’s Jackets']
        },
        {
            id: 9,
            name: 'Bags and Luggage',
            products: ['Travel Backpacks', 'Laptop Bags', 'Suitcases']
        },
        {
            id: 10,
            name: 'International Goods',
            products: ['Home Goods', 'Fashion', 'Books']
        },
        {
            id: 11,
            name: 'Fresh Food',
            products: ['Fruits', 'Meat, Eggs, Fish', 'Vegetables']
        },
        {
            id: 12,
            name: 'Women’s Fashion',
            products: ['Women’s Tops', 'Outfits', 'Women’s Jackets']
        },
        {
            id: 13,
            name: 'Bags and Luggage',
            products: ['Travel Backpacks', 'Laptop Bags', 'Suitcases']
        },
        {
            id: 14,
            name: 'International Goods',
            products: ['Home Goods', 'Fashion', 'Books']
        },
        {
            id: 15,
            name: 'Toys - Mother & Baby',
            products: ['Fashion for Mother and Baby', 'Toys', 'Maternity Care']
        },
        {
            id: 16,
            name: 'Fresh Food',
            products: ['Fruits', 'Meat, Eggs, Fish', 'Vegetables']
        },
        {
            id: 17,
            name: 'Women’s Fashion',
            products: ['Women’s Tops', 'Outfits', 'Women’s Jackets']
        },
        {
            id: 18,
            name: 'Bags and Luggage',
            products: ['Travel Backpacks', 'Laptop Bags', 'Suitcases']
        }

    ];
    return (
        <footer className='footer text-center ' >
            {/* <!-- Grid container --> */}
            <div className='container-fluid' style={{padding:'0'}}>
                {/* <!-- Section: Social media --> */}
                {/* <!-- Section: Social media --> */}

                {/* <!-- Section: Form --> */}
                <section className="newsletter-footer">
                    <div className={"container-fluid"}>
                        <div className={"row"}>
                            <div className={"subcrise col-lg-7 col-md-12"}>
                                <p className={"p1"} style={{color:'#fff', fontSize:'20px', fontFamily:'revert'}}>$20 discount for your first order </p>
                                <h5 className={"pb-2"} style={{color:'#fff', fontSize:'44px', fontFamily:'sans-serif',fontWeight:'inherit'}}>Join our newsletter and get...</h5>
                                <div className={"subcriseContent"}>
                                <p className={"p1"} style={{color:'#fff', fontSize:'20px',fontFamily:'revert',}}>Join our email subscription now to get updates on
                                    promotions and coupons.
                                    Stay up to date with the latest news and
                                    products</p>
                            </div>
                                <form className={"d-flex"}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className={"form-control me-2"}
                                    />
                                    <button type="submit" className={"btn btn-primary"}>Subscribe</button>
                                </form>
                            </div>
                            <div className={"col-lg-5 col-md-12"}>
                                <img src={"https://fullstack-ecommerce.netlify.app/static/media/newsletter.5931358dd220a40019fc.png"} alt="footerbanner" className={"w-100"}/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Section: Form --> */}

                {/* <!-- Section: Links --> */}


                <section className='section2 d-flex justify-content-center align-items-center' style={{}}>
                    {/* <!--Grid row--> */}
                    <div className="div21 container-fluid justify-content-center">
                        <div className="row">

                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>Customer Support</h5>
                                <ul className="list-unstyled">
                                    <li>Hotline: <strong>1900-6035</strong></li>
                                    <li>(1000 VND/min, 8 AM - 9 PM including Saturday, Sunday)</li>
                                    <li>Frequently Asked Questions</li>
                                    <li>Submit a Support Request</li>
                                    <li>Order Guide</li>
                                    <li>Shipping Methods</li>
                                    <li>Check Order Policy</li>
                                    <li>Return Policy</li>
                                    <li>Installment Payment Guide</li>
                                    <li>Imported Goods Policy</li>
                                    <li>Customer Support: hotro@DEALHUB.vn</li>
                                </ul>
                            </div>

                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>About DEALHUB</h5>
                                <ul className="list-unstyled">
                                    <li>About DEALHUB</li>
                                    <li>DEALHUB Blog</li>
                                    <li>Recruitment</li>
                                    <li>Payment Privacy Policy</li>
                                    <li>Personal Information Privacy Policy</li>
                                    <li>Complaint Resolution Policy</li>
                                    <li>Terms of Use</li>
                                    <li>Introduction to DEALHUB Xu</li>
                                    <li>Affiliate Marketing with DEALHUB</li>
                                    <li>Business Sales</li>
                                </ul>
                            </div>

                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>Collaboration and Partnership</h5>
                                <ul className="list-unstyled">
                                    <li>Regulations of E-commerce Platform Operations</li>
                                    <li>Sell with DEALHUB</li>
                                </ul>
                                <h5 className={'pt-4 pb-2'}>Certified by</h5>
                                <img src={"./chungnhanboi.png"} alt="Certification 1" className="me-2"/>
                            </div>

                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>Payment Methods</h5>
                                <img src={"./paymentmethod.png"} alt="payment" className="me-2"/>
                                <h5 className="mt-3 pb-2">Delivery Service</h5>
                                <img src="/tikinow.png" alt="DEALHUBNOW"/>
                            </div>


                        </div>
                    </div>
                    {/* <!--Grid row--> */}
                </section>
                {/* <!-- Section: Links --> */}
            </div>

            <div className="custom-hr"></div>

            {/* <!-- Section: Links --> */}
            <div className='container-fluid f3'>
                <div className='row'>
                    {/* Cột nội dung văn bản */}
                    <div className='div3 col-lg-6 col-md-12 mb-4 '>
                        <h3 className={"h31"}>DEALHUB - Fast, Quality, Affordable</h3>
                        <p className={"p31"}>
                            DEALHUB has it all. With millions of products from reputable brands and stores,
                            thousands of items ranging from smartphones to fresh fruits and vegetables, along with the super-fast delivery service DEALHUBNOW,
                            DEALHUB offers you an online shopping experience that starts with trust.
                            Moreover, at DEALHUB, you can easily access a myriad of other conveniences,
                            such as purchasing prepaid cards, paying electricity and water bills, and various insurance services.
                        </p>
                        <p className={"p31"}>
                            Promotions and deals are abundant. If you want to hunt for great prices,
                            DEALHUB has shocking prices every day just for you! If you are a fan of official brands and stores, they are waiting for you.
                            No need to search for free shipping codes, as DEALHUB already offers millions of products in the Freeship+ program, with no limit on orders,
                            saving you valuable time. Buy the DEALHUBNOW savings package to receive 100% free shipping within 2 hours and the same day,
                            or purchase the premium DEALHUBNOW package to get 100% free shipping applicable to 100% of products in all provinces of Vietnam.
                            Want to save even more? DEALHUBCARD is available,
                            a credit card that offers a 15% cashback on all transactions (with a maximum cashback of 600,000 VND per month).
                        </p>
                    </div>

                    {/* Cột bản đồ */}
                    <div className='col-lg-6 col-md-12 mb-4'>
                        <iframe
                            title='map'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122682.17181442416!2d108.22588999999999!3d16.0749383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421838ee64f333%3A0xf614dd557b5f00e7!2zNzggxJAuIMSQ4bqnbSBSb25nIDIsIFRoYW5oIELDrG5oLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1728153251761!5m2!1svi!2s"
                            width='80%'
                            height='100%'
                            style={{border: 0}}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="custom-hr"></div>
            {/* <!-- Grid container --> */}
            <section>
                <div className="catelogies container-fluid">
                    <div className="row">
                        {categories.map((category) => (
                            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-2" key={category.id}>
                                <h5 className={'pb-2 pt-4'} style={{color:"#f3ab2b", fontWeight:"600"}}>{category.name}</h5>
                                <ul className="list-unstyled">
                                    {category.products.map((product, index) => (
                                        <li key={index}>
                                            <a href="#" style={{color:"#e0dddd"}}>{product}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- Copyright --> */}
            <div
                className='text-center p-3 '
                style={{backgroundColor: "#131a22", width: '100%', height: 'fit-content'}}
            >
                © 2023 Copyright
                <span className='text-light text-decoration-underline'>
					{" "}
                    DEALHUB
				</span>
            </div>
            {/* <!-- Copyright --> */}
        </footer>
    )
}

export default Footer
