import React, {useEffect, useState} from 'react';
import Slider from "react-slick";  // Import react-slick
import ProductModel from "../../model/ProductModel";
import ProductProps from "./components/ProductProps";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";

import {Skeleton} from "@mui/material";
import {getHotProduct} from "../../api/ProductAPI";

const ListBestSeller: React.FC = () => {
    const [products, setProducts] = React.useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erroring, setErroring] = useState(null);

    // Fetch all products from the API
    useEffect(() => {
        getHotProduct()
            .then((response) => {
                setProducts(response.productList);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setErroring(error.message);
            });
    }, []);

    // Settings for the react-slick slider
    const settings = {

        infinite: true,  // Infinite scrolling
        speed: 500,  // Transition speed
        slidesToShow: 4,  // Number of slides visible
        slidesToScroll: 1,  // Number of slides to scroll at once
        autoplaySpeed: 3000, // Autoplay interval in ms
        autoplay: true,  // Autoplay
        arrows: true,

    };



    if (loading) {
        return (
            <div className='container-book container bg-light' style={{marginBottom:""}}>
                <div className='row'>
                    <div className='col-md-6 col-lg-3 mt-3'>
                        <Skeleton
                            className='my-3'
                            variant='rectangular'
                            height={400}
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 mt-3'>
                        <Skeleton
                            className='my-3'
                            variant='rectangular'
                            height={400}
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 mt-3'>
                        <Skeleton
                            className='my-3'
                            variant='rectangular'
                            height={400}
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 mt-3'>
                        <Skeleton
                            className='my-3'
                            variant='rectangular'
                            height={400}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (erroring) {
        return (
            <div>
                <h1>Gặp lỗi: {erroring}</h1>
            </div>
        );
    }

    return (
        <div className='container-product container-fluid mb-5 pb-5 px-5 bg-light'>
            <div className={"info"}>
                <div className={"line"}>
                    <h3 className={"mb-0 "}>BEST SELLER</h3>
                    <p className={"text text-sml mb-0"}>Do not miss the opportunity to own the
                        best-selling products on DEALHUB</p>
                </div>
                <div className={"line2"}>
                    <Button className={"btn btnviewall btn-primary mt-3"}>View all
                        <IoIosArrowRoundForward />
                    </Button>
                </div>
            </div>

            <Slider {...settings}>
                {products.map((product: ProductModel) => (
                    <div key={product.idBook} className="slider-item col-md-3 mb-4">
                        <ProductProps key={product.idBook} product={product} />
                    </div>
                ))}
            </Slider>

        </div>
    );
}

export default ListBestSeller;
