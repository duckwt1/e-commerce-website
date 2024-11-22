import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBanner=() => {
        let settings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            centerMode: true, // Enable center mode
            centerPadding: "2%", // Show 20% of the neighboring banners
            pauseOnHover: false,// Autoplay không dừng khi hover
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        arrows: false,
                    },
                },
            ],
        };

    return (
        <div className={'homeBannerSection'}>
            <Slider {...settings}>
                <div className={'item'}>
                    <img src="https://cf.shopee.vn/file/sg-11134258-7req3-m1screzy6fk4cb_xxhdpi" alt="Nature"
                         className={'w-100'}/>
                </div>
                <div className={'item'}>
                    <img
                        src="https://naveencollection.in/cdn/shop/files/Orange_Red_Flash_Sale_9.9_Promotion_Banner.png?v=1700890056&width=1100"
                        alt="tech" className={'w-100'} style={{height:"50%"}}/>
                </div>
                <div className={'item'}>
                    <img
                        src="https://cf.shopee.com.my/file/13de85bbf7f6c7f14a1bd0b8fe6b2de1"
                        alt="Snow" className={'w-100'}/>
                </div>

                <div className={'item'}>
                    <img
                        src="https://cf.shopee.vn/file/sg-11134258-7repu-m1s53ay68jpl42_xxhdpi"
                        alt="Snow" className={'w-100'}/>
                </div>


            </Slider>
        </div>
    );
}


export default HomeBanner;
