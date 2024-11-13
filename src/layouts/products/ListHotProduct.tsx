import React, { useEffect, useState } from "react";

import { Skeleton } from "@mui/material";
import ProductModel from "../../model/ProductModel";
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "@mui/material/Button";
import ProductProps from "./components/ProductProps";
import {getHotProduct} from "../../api/ProductAPI";

interface HotProductListProps {}

const HotProductList: React.FC<HotProductListProps> = (props) => {
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erroring, setErroring] = useState<string | null>(null);

    useEffect(() => {
        getHotProduct()
            .then((response) => {
                setProductList(response.productList);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setErroring(error.message);
                console.error('Error fetching hot books:', error);
            });
    }, []);

    if (loading) {
        return (
            <div className='container-list-product container mb-5 py-5 px-5 bg-light'>
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
        <div className='container-product container-list-product container-fluid mb-5 pb-5 px-5 bg-light'>
            <div className={"info"}>
                <div className={"line"}>
                    <h3 className={"mb-0 "}>HOT PRODUCTS</h3>
                    <p className={"text text-sml mb-0"}>Do not miss the opportunity to own the
                        best-selling products on DEALHUB</p>
                </div>
                <div className={"line2"}>
                    <Button className={"btn btnviewall btn-primary mt-3"}>View all
                        <IoIosArrowRoundForward />
                    </Button>
                </div>
            </div>
            <div className="row">
                {productList.map((product) => (
                    <div key={product.idBook} className="col-md-3 mb-4">
                        <ProductProps key={product.idBook} product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HotProductList;
