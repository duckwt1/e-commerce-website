/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { endpointBE } from "../utils/Constant";
import { getIdUserByToken } from "../utils/JwtService";
import ProductModel from "../../model/ProductModel";
import ProductProps from "./components/ProductProps";
import { getProductById } from "../../api/ProductAPI";
import { Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

interface FavoriteBooksListProps {}

const FavoriteProductsList: React.FC<FavoriteBooksListProps> = (props) => {
	const [ProductList, setProductList] = useState<ProductModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [reloadComponent] = useState(0);

	useEffect(() => {
		fetch(
			endpointBE + `/favorite/get-favorite-list/${getIdUserByToken()}`
		)
			.then((response) => response.json())
			.then((idProductList) => {
				const fetchProductPromises = idProductList.map(async (idProduct: any) => {
					const response = await getProductById(idProduct);
					return response;
				});

				// Sử dụng Promise.all để đợi tất cả các yêu cầu fetch hoàn thành
				return Promise.all(fetchProductPromises);
			})
			.then((products) => {
				// Xử lý danh sách
				setProductList(products);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	}, []);

	if (loading) {
		return (
			<div className='container-book container mb-5 py-5 px-5 bg-light'>
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

	return (
		<div className='container-book container mb-5 pb-5 px-5 bg-light'>
			<h2 className='mt-4 px-3 py-3 mb-0'>FAVOURITE PRODUCTS</h2>
			<hr className='mt-0' />
			<div className='row' key={reloadComponent}>
				{ProductList.length > 0 ? (
					ProductList.map((product) => (
						<ProductProps key={product.productId} product={product} />
					))
				) : (
					<div className='d-flex align-items-center justify-content-center flex-column'>
						<h4 className='text-center'>
							You don't love any products yet
						</h4>
						<Link to={"/search"}>
							<Button variant='contained' className='mt-3'>
								Start Shopping
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoriteProductsList;
