import React from "react";
import "../../css/footer.css";


const Footer = () => {
    // Mảng các danh mục sản phẩm
    const categories = [
        {
            id: 1,
            name: 'Đồ Chơi - Mẹ & Bé',
            products: ['Thời Trang Cho Mẹ Và Bé', 'Đồ chơi', 'Chăm sóc mẹ bầu']
        },
        {
            id: 2,
            name: 'Thực Phẩm Tươi Sống',
            products: ['Trái Cây', 'Thịt, Trứng, Cá', 'Rau củ quả']
        },
        {
            id: 3,
            name: 'Thời Trang Nữ',
            products: ['Áo nữ', 'Bộ trang phục', 'Áo khoác nữ']
        },
        {
            id: 4,
            name: 'Balo và Vali',
            products: ['Balo du lịch', 'Túi đựng laptop', 'Vali']
        },
        {
            id: 5,
            name: 'Hàng Quốc Tế',
            products: ['Nhà Cửa', 'Thời Trang', 'Sách']
        },
        {
            id: 6,
            name: 'Đồ Chơi - Mẹ & Bé',
            products: ['Thời Trang Cho Mẹ Và Bé', 'Đồ chơi', 'Chăm sóc mẹ bầu']
        },
        {
            id: 7,
            name: 'Thực Phẩm Tươi Sống',
            products: ['Trái Cây', 'Thịt, Trứng, Cá', 'Rau củ quả']
        },
        {
            id: 8,
            name: 'Thời Trang Nữ',
            products: ['Áo nữ', 'Bộ trang phục', 'Áo khoác nữ']
        },
        {
            id: 9,
            name: 'Balo và Vali',
            products: ['Balo du lịch', 'Túi đựng laptop', 'Vali']
        },
        {
            id: 10,
            name: 'Hàng Quốc Tế',
            products: ['Nhà Cửa', 'Thời Trang', 'Sách']
        }
        ,
        {
            id: 11,
            name: 'Thực Phẩm Tươi Sống',
            products: ['Trái Cây', 'Thịt, Trứng, Cá', 'Rau củ quả']
        },
        {
            id: 12,
            name: 'Thời Trang Nữ',
            products: ['Áo nữ', 'Bộ trang phục', 'Áo khoác nữ']
        },
        {
            id: 13,
            name: 'Balo và Vali',
            products: ['Balo du lịch', 'Túi đựng laptop', 'Vali']
        },
        {
            id: 14,
            name: 'Hàng Quốc Tế',
            products: ['Nhà Cửa', 'Thời Trang', 'Sách']
        },
        {
            id: 15,
            name: 'Đồ Chơi - Mẹ & Bé',
            products: ['Thời Trang Cho Mẹ Và Bé', 'Đồ chơi', 'Chăm sóc mẹ bầu']
        },
        {
            id: 16,
            name: 'Thực Phẩm Tươi Sống',
            products: ['Trái Cây', 'Thịt, Trứng, Cá', 'Rau củ quả']
        },
        {
            id: 17,
            name: 'Thời Trang Nữ',
            products: ['Áo nữ', 'Bộ trang phục', 'Áo khoác nữ']
        },
        {
            id: 18,
            name: 'Balo và Vali',
            products: ['Balo du lịch', 'Túi đựng laptop', 'Vali']
        },
        {
            id: 19,
            name: 'Hàng Quốc Tế',
            products: ['Nhà Cửa', 'Thời Trang', 'Sách']
        }
    ];
    return (
        <footer className='footer text-center ' style={{background: '#ffffff'}}>
            {/* <!-- Grid container --> */}
            <div className='container-fluid' style={{paddingTop: '20px'}}>
                {/* <!-- Section: Social media --> */}
                <section className='social mb-4' style={{marginTop: '1rem'}}>
                    {/* <!-- Facebook --> */}
                    <a className='btn btn-outline-dark btn-floating m-1 me-3' href='#!' role='button'>
                        <i className='fab fa-facebook-f'></i>
                    </a>

                    {/* <!-- Twitter --> */}
                    <a className='btn btn-outline-dark btn-floating m-1 me-3' href='#!' role='button'>
                        <i className='fab fa-twitter'></i>
                    </a>

                    {/* <!-- Google --> */}
                    <a className='btn btn-outline-dark btn-floating m-1 me-3' href='#!' role='button'>
                        <i className='fab fa-google'></i>
                    </a>

                    {/* <!-- Instagram --> */}
                    <a className='btn btn-outline-dark btn-floating m-1 me-3' href='#!' role='button'>
                        <i className='fab fa-instagram'></i>
                    </a>

                    {/* <!-- Linkedin --> */}
                    <a className='btn btn-outline-dark btn-floating m-1 me-3 ' href='#!' role='button'>
                        <i className='fab fa-linkedin-in'></i>
                    </a>

                    {/* <!-- Github --> */}
                    <a className='btn btn-outline-dark btn-floating m-1' href='#!' role='button'>
                        <i className='fab fa-github'></i>
                    </a>

                    <div className="custom-hr-none"></div>


                </section>
                {/* <!-- Section: Social media --> */}

                {/* <!-- Section: Form --> */}
                <section className='dangki' style={{marginTop: '3rem'}}>
                    <form action=''>
                        {/* <!--Grid row--> */}
                        <div className='row d-flex justify-content-center' style={{marginBottom: '4rem'}}>
                            <div className='col-auto me-2'>
                                <p className='pt-2 text-dark'>
                                    <strong>Đăng ký nhận bản tin</strong>
                                </p>
                            </div>

                            <div className='col-md-5 col-12'>
                                {/* <!-- Email input --> */}
                                <div className=' form-dark mb-4'>
                                    <input
                                        type='email'
                                        id='form5Example21'
                                        className='form-control'
                                        placeholder='Nhập Email'
                                    />
                                </div>
                            </div>

                            <div className='col-auto ms-2'>
                                {/* <!-- Submit button --> */}
                                <button
                                    type='button' className='btn btn-outline-dark mb-4'>Đăng ký
                                </button>
                            </div>
                        </div>
                        {/* <!--Grid row--> */}
                    </form>
                </section>
                {/* <!-- Section: Form --> */}

                {/* <!-- Section: Links --> */}

                <div className="custom-hr"></div>


                <section className='section2 d-flex justify-content-center align-items-center' style={{}}>
                    {/* <!--Grid row--> */}
                    <div className="div21 container-fluid justify-content-center">
                        <div className="row">

                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>Hỗ trợ khách hàng</h5>
                                <ul className="list-unstyled">
                                    <li>Hotline: <strong>1900-6035</strong></li>
                                    <li>(1000 đ/phút, 8-21h kể cả T7, CN)</li>
                                    <li>Các câu hỏi thường gặp</li>
                                    <li>Gửi yêu cầu hỗ trợ</li>
                                    <li>Hướng dẫn đặt hàng</li>
                                    <li>Phương thức vận chuyển</li>
                                    <li>Chính sách kiểm hàng</li>
                                    <li>Chính sách đổi trả</li>
                                    <li>Hướng dẫn trả góp</li>
                                    <li>Chính sách hàng nhập khẩu</li>
                                    <li>Hỗ trợ khách hàng: hotro@tiki.vn</li>
                                </ul>

                            </div>


                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>Về Tiki</h5>
                                <ul className="list-unstyled">
                                    <li>Giới thiệu Tiki</li>
                                    <li>Tiki Blog</li>
                                    <li>Tuyển dụng</li>
                                    <li>Chính sách bảo mật thanh toán</li>
                                    <li>Chính sách bảo mật thông tin cá nhân</li>
                                    <li>Chính sách giải quyết khiếu nại</li>
                                    <li>Điều khoản sử dụng</li>
                                    <li>Giới thiệu Tiki Xu</li>
                                    <li>Tiếp thị liên kết cùng Tiki</li>
                                    <li>Bán hàng doanh nghiệp</li>
                                </ul>
                            </div>


                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>Hợp tác và liên kết</h5>
                                <ul className="list-unstyled">
                                    <li>Quy chế hoạt động Sàn GDTMĐT</li>
                                    <li>Bán hàng cùng Tiki</li>
                                </ul>
                                <h5 className={'pt-2'}>Chứng nhận bởi</h5>
                                <img src={"./chungnhanboi.png"} alt="Chứng nhận 1" className="me-2"/>

                            </div>


                            <div className="div22 col-lg-3 col-md-6 mb-3 ">
                                <h5 className={"pb-3"}>Phương thức thanh toán</h5>
                                {/*<img src="..." alt="Visa" className="me-2"/>*/}
                                {/*<img src="..." alt="MasterCard" className="me-2"/>*/}
                                {/*<img src="..." alt="JCB" className="me-2"/>*/}
                                {/*<img src="..." alt="MoMo" className="me-2"/>*/}
                                {/*<img src="..." alt="ZaloPay" className="me-2"/>*/}
                                {/*<img src="..." alt="ATM" className="me-2"/>*/}
                                {/*<img src="..." alt="VNPay" className="me-2"/>*/}
                                <img src={"./paymentmethod.png"} alt="payment" className="me-2"/>
                                <h5 className="mt-3">Dịch vụ giao hàng</h5>
                                <img src="/tikinow.png" alt="TikiNOW"/>
                            </div>


                        </div>
                    </div>
                    {/* <!--Grid row--> */}
                </section>
                {/* <!-- Section: Links --> */}
            </div>

            <div className="custom-hr"></div>

            {/* <!-- Section: Links --> */}
            <div className='container-fluid'>
                <div className='row'>
                    {/* Cột nội dung văn bản */}
                    <div className='div3 col-lg-6 col-md-12 mb-4 '>
                        <h3 className={"h31"}>Tiki - Thật nhanh, thật chất lượng, thật rẻ</h3>
                        <p className={"p31"}>
                            Tiki có tất cả. Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng nghìn loại
                            mặt hàng từ Điện thoại
                            smartphone tới Rau củ quả tươi, kèm theo dịch vụ giao hàng siêu tốc TikiNOW, Tiki mang đến
                            cho bạn một
                            trải nghiệm mua sắm online bắt đầu bằng chữ tín. Thêm vào đó, ở Tiki bạn có thể dễ dàng sử
                            dụng vô vàn
                            các tiện ích khác như mua thẻ cào, thanh toán hoá đơn điện nước, các dịch vụ bảo hiểm.
                        </p>
                        <p className={"p31"}>
                            Khuyến mãi, ưu đãi tràn ngập. Bạn muốn săn giá sốc, Tiki có giá sốc mỗi ngày cho bạn! Bạn là
                            tín đồ của các thương hiệu, các cửa hàng
                            Official chính hãng đang chờ đón bạn. Không cần săn mã freeship, vì Tiki đã có hàng triệu
                            sản phẩm trong
                            chương trình Freeship+, không giới hạn lượt đặt, tiết kiệm thời gian vàng bạc của bạn. Mua
                            thêm gói
                            TikiNOW tiết kiệm để nhận 100% free ship 2h & trong ngày, hoặc mua gói TikiNOW cao cấp để
                            nhận được 100%
                            freeship, áp dụng cho 100% sản phẩm, 100% tỉnh thành Việt Nam. Bạn muốn tiết kiệm hơn nữa?
                            Đã có
                            TikiCARD, thẻ tín dụng Tiki hoàn tiền 15% trên mọi giao dịch (tối đa hoàn 600k/tháng).
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
                            <div className="col-lg-2 col-md-4 col-sm-4 " key={category.id}>
                                <h5 className={'pb-2 pt-4'} style={{color:"#36abff", fontWeight:"600"}}>{category.name}</h5>
                                <ul className="list-unstyled">
                                    {category.products.map((product, index) => (
                                        <li key={index}>
                                            <a href="#" >{product}</a>
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
                style={{backgroundColor: "#36abff", width: '100%', height: 'fit-content'}}
            >
                © 2023 Copyright
                <span className='text-dark text-decoration-underline'>
					{" "}
                    bookstore GIT
				</span>
            </div>
            {/* <!-- Copyright --> */}
        </footer>
    )
}

export default Footer
