/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Pagination from "../utils/Pagination";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { getAllProduct, searchProduct } from "../../api/ProductAPI";
import ProductModel from "../../model/ProductModel";
import ProductProps from "./components/ProductProps";
import FilterSidebar from "./components/SildeBarFilter";

interface ProductListProps {
	paginable?: boolean;
	size?: number;
	keySearch?: string | undefined;
	idGenre?: number;
	filter?: number;

}

const ProductList: React.FC<ProductListProps> = (props) => {
	const [productList, setProductList] = useState<ProductModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [erroring, setErroring] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// const [totalBook, setTotalBook] = useState(0);

	// Xử lý phân trang
	const handlePagination = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	// Chỗ này xử lý khi thực hiện chức năng hiện số sản phẩm
	const [totalPagesTemp, setTotalPagesTemp] = useState(totalPages);
	if (totalPagesTemp !== totalPages) {
		setCurrentPage(1);
		setTotalPagesTemp(totalPages);
	}
	const handleCategoryChange = (category: string) => {
		// Handle category change logic here
		console.log("Category changed to:", category);
	};

	const handlePriceChange = (min: number | undefined, max: number | undefined) => {
		// Handle price change logic here
		console.log("Price range changed to:", min, max);
	};

	const handleRatingChange = (rating: number) => {
		// Handle rating change logic here
		console.log("Rating changed to:", rating);
	};
	useEffect(() => {
		// Mặc đinh sẽ gọi getAllProduct
		if (
			(props.keySearch === "" &&
				props.idGenre === 0 &&
				props.filter === 0) ||
			props.keySearch === undefined
		) {
			// currentPage - 1 vì trong endpoint trang đầu tiên sẽ là 0
			getAllProduct(props.size, currentPage - 1) // size là (tổng sản phẩm được hiện)
				.then((response) => {
					setProductList (response.productList);
					setTotalPages(response.productList.length);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					setErroring(error.message);
				});
		} else {
			// Khi có các param lọc
			searchProduct(
				props.keySearch,
				props.idGenre,
				props.filter,
				props.size,
				currentPage - 1
			)
				.then((response) => {
					setProductList(response.productList);
					setTotalPages(response.productList.length);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
					setErroring(error.message);
				});
		}
	}, [currentPage, props.keySearch, props.idGenre, props.filter, props.size]);

	if (loading) {
		return (
			<div className='container-book container-fluid mb-5 py-5 px-5 '>
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

	// Kiểm tra danh sách sách xem có phần tử nào không
	if (productList.length === 0) {
		return (
			<div className='container-book container-fluid mb-5 px-5 px-5 bg-light'>
				<h2 className='mt-4 px-3 py-3 mb-0'>
					Product not found! "{props.keySearch}"
				</h2>
			</div>
		);
	}

	return (
		<div className='container-book container-fluid mb-5 pb-5 px-5 ' style={{background:"white"}}>
			{!props.paginable && (
				<>
					<h2 className='mt-4 px-3 py-3 mb-0'>VIEW ALL</h2>
					<hr className='mt-0' />
				</>
			)}
			<div className='row  ' style={{ display: "flex", width:"100%" }}>
				<div className='col-lg-2 col-md-12 mb-3'>
					{/* Filter component goes here */}
					<div className='filter-bar'>
						{/* Your filter component or code */}
						<FilterSidebar
							onCategoryChange={handleCategoryChange}
							onPriceChange={handlePriceChange}
							onRatingChange={handleRatingChange}
						/>
					</div>
				</div>
				<div className='col-lg-10 col-md-12'>
					<div className='row'>
						{productList.map((product) => (
							<div key={product.productId} className="col-md-3 mb-4">
								<ProductProps key={product.productId} product={product} />
							</div>
						))}
					</div>
					{props.paginable ? (
						<>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								handlePagination={handlePagination}
							/>
						</>
					) : (
						<Link to={"/search"}>
							<div className='d-flex align-items-center justify-content-center'>
								<Button
									variant='outlined'
									size='large'
									className='text-primary mt-5 w-25'
								>
									View more
								</Button>
							</div>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
