import { useEffect, useState } from "react";
import ProductModel from "../../model/ProductModel";
import { getAllProduct, getHotProduct } from "../../api/ProductAPI";
import TextEllipsis from "../../layouts/products/components/TextEllipsis";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const GetAllProducts = () => {
    const [allProducts, setAllProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        getHotProduct()
            .then((response) => {
                const products: ProductModel[] = response.productList; // Adjust this line based on the actual structure of resultInterface
                setAllProducts(products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <table className='table table-striped table-hover'>
            <thead>
            <tr>
                <th scope='col'>ID</th>
                <th scope='col'>THUMNAIL</th>
                <th scope='col'>NAME</th>
                <th scope='col'>SOLD</th>
            </tr>
            </thead>
            <tbody>
            {allProducts.map((product) => (
                <tr key={product.productId}>
                    <th scope='row'>{product.productId}</th>
                    <td>
                        <Link to={`/book/${product.productId}`} className='d-inline text-black'>
                            <img src={product.thumbnail} alt='' width={30} />
                        </Link>
                    </td>
                    <Tooltip title={product.name} arrow>
                        <td>
                            <Link to={`/product/${product.productId}`} className='d-inline text-black'>
                                <TextEllipsis text={product.name + ""} limit={25} />
                            </Link>
                        </td>
                    </Tooltip>
                    <td>{product.soldQuantity}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default GetAllProducts;
