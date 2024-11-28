import React from "react";
import Slider from "react-slick";
import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    {
        src: "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731428252/1731428250193_New_Project_2.jpg",
        title: "Get the Best Mobile",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        buttonText: "Order Now",
        buttonLink: "#",
    },
    {
        src: "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731428239/1731428237761_New_Project_3.jpg",
        title: "New Arrivals Just for You",
        description: "For online order - 30% OFF",
        buttonText: "Shop Now",
        buttonLink: "#",
    },
    {
        src: "https://res.cloudinary.com/dkgonwhvj/image/upload/v1731428266/1731428264319_New_Project_9.jpg",
        title: "Kids Fashion Sale",
        description: "Stylish & Trendy Fashion",
        buttonText: "Buy Now",
        buttonLink: "#",
    },

];

const Carousel: React.FC = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false,
    };

    return (
        <div className={"subslide"}>
        <Slider {...settings}>
            {images.map((image, index) => (
                <div  style={{ padding: "0 10px", position: "relative" }}>
                    <img
                        src={image.src}
                        alt={image.title}
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            margin: "0 5px", // Thêm margin ở đây để tạo khoảng cách giữa các banner
                        }}
                    />
                </div>
            ))}
        </Slider>
        </div>
    );
};

export default Carousel;
