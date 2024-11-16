/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookModel from "../../model/ProductModel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
// import SelectQuantity from "./components/select-quantity/SelectQuantity";
import Button from "@mui/material/Button";
import { ShoppingCartOutlined } from "@mui/icons-material";
// import Comment from "./components/comment/Comment";
// import TextEllipsis from "./components/text-ellipsis/TextEllipsis";
// import { getGenreByIdBook } from "../../api/GenreApi";
import GenreModel from "../../model/GenreModel";
import ImageModel from "../../model/ImageModel";
// import RatingStar from "./components/rating/Rating";
import React from "react";

import { toast } from "react-toastify";
import { endpointBE } from "../utils/Constant";
import { getIdUserByToken, isToken } from "../utils/JwtService";
import { useCartItem } from "../utils/CartItemContext";
import { Skeleton } from "@mui/material";
import CartItemModel from "../../model/CartItemModel";
import { CheckoutPage } from "../pages/CheckoutPage";
import useScrollToTop from "../../hooks/ScrollToTop";
import {getAllImageByProduct} from "../../api/ImageAPI";
import TextEllipsis from "./components/TextEllipsis";
import {getProductById} from "../../api/ProductAPI";
import {getGenreByIdBook} from "../../api/GenreApi";
import {Carousel} from "react-responsive-carousel";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import ProductModel from "../../model/ProductModel";

interface BookDetailProps {}

const ProductDetail: React.FC<BookDetailProps> = (props) => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng
	const { setTotalCart, cartList } = useCartItem();

	// Lấy mã sách từ url
	const { idProduct } = useParams();
	let idProductNumber: number = 0;

	// Ép kiểu về number
	try {
		idProductNumber = parseInt(idProduct + "");
		if (Number.isNaN(idProductNumber)) {
			idProductNumber = 0;
		}
	} catch (error) {
		console.error("Error: " + error);
	}

	// Khai báo biến
	const [product, setProduct] = useState<ProductModel | null>(null);
	const [loading, setLoading] = useState(true);
	const [erroring, setErroring] = useState(null);
	// Lấy sách ra
	useEffect(() => {
		getProductById(idProductNumber)
			.then((response) => {
				setProduct(response);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setErroring(error.message);
			});
	}, []);

	// Lấy ra thể loại của sách
	const [genres, setGenres] = useState<GenreModel[] | null>(null);
	useEffect(() => {
		getGenreByIdBook(idProductNumber).then((response) => {
			setGenres(response.genreList);
		});
	}, []);

	// Lấy ra hình ảnh của sách
	const [images, setImages] = useState<ImageModel[] | null>(null);
	useEffect(() => {
		getAllImageByProduct(idProductNumber)
			.then((response) => {
				setImages(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const [quantity, setQuantity] = useState(1);
	// Xử lý tăng số lượng
	const add = () => {
		if (quantity < (product?.quantity ? product?.quantity : 1)) {
			setQuantity(quantity + 1);
		}
	};

	// Xử lý giảm số lượng
	const reduce = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	// Xử lý thêm sản phẩm vào giỏ hàng
	const handleAddProduct = async (newProduct: ProductModel) => {
		// cái isExistBook này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
		let isExistProduct = cartList.find(
			(cartItem) => cartItem.product.productId === newProduct.productId
		);
		// Thêm 1 sản phẩm vào giỏ hàng
		if (isExistProduct) {
			// nếu có rồi thì sẽ tăng số lượng
			isExistProduct.quantity += quantity;

			// Lưu vào db
			if (isToken()) {
				const request = {
					idCart: isExistProduct.idCart,
					quantity: isExistProduct.quantity,
				};
				const token = localStorage.getItem("token");
				fetch(endpointBE + `/cart-item/update-item`, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"content-type": "application/json",
					},
					body: JSON.stringify(request),
				}).catch((err) => console.log(err));
			}
		} else {
			// Lưu vào db
			if (isToken()) {
				try {
					const request = [
						{
							quantity: quantity,
							product: newProduct,
							idUser: getIdUserByToken(),
						},
					];
					const token = localStorage.getItem("token");
					const response = await fetch(
						endpointBE + "/cart-item/add-item",
						{
							method: "POST",
							headers: {
								Authorization: `Bearer ${token}`,
								"content-type": "application/json",
							},
							body: JSON.stringify(request),
						}
					);

					if (response.ok) {
						const idCart = await response.json();
						cartList.push({
							idCart: idCart,
							quantity: quantity,
							product: newProduct,
						});
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				cartList.push({
					quantity: quantity,
					product: newProduct,
				});
			}
		}
		// Lưu vào localStorage
		localStorage.setItem("cart", JSON.stringify(cartList));
		// Thông báo toast
		toast.success("Thêm vào giỏ hàng thành công");
		setTotalCart(cartList.length);
	};

	// Viewer hình ảnh
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	let imageList: string[] = [];
	if (images !== undefined && images !== null) {
		imageList = images.map((image) => {
			return image.urlImage || image.urlImage;
		}) as string[];
	}

	const openImageViewer = useCallback((index: number) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	const [isCheckout, setIsCheckout] = useState(false);
	const [cartItem, setCartItem] = useState<CartItemModel[]>([]);
	const [totalPriceProduct, setTotalPriceProduct] = useState(0);
	function handleBuyNow(newProduct: ProductModel) {
		setCartItem([{ quantity, product: newProduct }]);
		setIsCheckout(!isCheckout);
		setTotalPriceProduct(newProduct.sellPrice * quantity);
	}

	if (loading) {
		return (
			<div className='container-book container mb-5 py-5 px-5 bg-light'>
				<div className='row'>
					<div className='col-4'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={400}
						/>
					</div>
					<div className='col-8 px-5'>
						<Skeleton
							className='my-3'
							variant='rectangular'
							height={100}
						/>
						<Skeleton className='my-3' variant='rectangular' />
						<Skeleton className='my-3' variant='rectangular' />
						<Skeleton className='my-3' variant='rectangular' />
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

	if (product === null) {
		return (
			<div>
				<h1>Sách không tồn tại </h1>
			</div>
		);
	}

	return (
		<>
			{!isCheckout ? (
				<>
					<div className='container p-2 bg-white my-3 rounded'>
						<div className='row mt-4 mb-4'>
							<div className='col-lg-4 col-md-4 col-sm-12'>
								<Carousel
									emulateTouch={true}
									swipeable={true}
									showIndicators={false}
								>
									{images?.map((image, index) => (
										<div
											key={index}
											onClick={() => openImageViewer(index)}
											style={{
												width: "100%",
												height: "400px",
												objectFit: "cover",
											}}
										>
											<img
												alt=''
												src={
													image.urlImage
														? image.urlImage
														: image.urlImage
												}
											/>
										</div>
									))}
								</Carousel>
								{isViewerOpen && (
									<ReactSimpleImageViewer
										src={imageList}
										currentIndex={currentImage}
										disableScroll={true}
										closeOnClickOutside={true}
										onClose={closeImageViewer}
										backgroundStyle={{
											backgroundColor: "rgba(0,0,0,0.7)",
										}}
									/>
								)}
							</div>
							<div className='col-lg-8 col-md-8 col-sm-12 px-5'>
								<h2>{product.name}</h2>
								<div className='d-flex align-items-center'>
									<p className='me-5'>
										Thể loại:{" "}
										<strong>
											{genres?.map((genre) => genre.nameGenre + " ")}
										</strong>
									</p>
									<p className='ms-5'>
										SELLER: <strong>{"Seller name"}</strong>
									</p>
								</div>
								<div className='d-flex align-items-center'>
									<div className='d-flex align-items-center'>
										{/*<RatingStar*/}
										{/*	readonly={true}*/}
										{/*	ratingPoint={book.avgRating}*/}
										{/*/>*/}

										<p className='text-danger ms-2 mb-0'>
											({product.avgRating})
										</p>
									</div>
									<div className='d-flex align-items-center'>
										<span className='mx-3 mb-1 text-secondary'>
											|
										</span>
									</div>
									<div className='d-flex align-items-end justify-content-center '>
										<span
											style={{
												color: "rgb(135,135,135)",
												fontSize: "16px",
											}}
										>
											Đã bán
										</span>
										<span className='fw-bold ms-2'>
											{product.soldQuantity}
										</span>
									</div>
								</div>
								<div className='price'>
									<span className='discounted-price text-danger me-3'>
										<strong style={{ fontSize: "32px" }}>
											{product.sellPrice?.toLocaleString()}đ
										</strong>
									</span>
									<span className='original-price small me-3'>
										<strong>
											<del>{product.listPrice?.toLocaleString()}đ</del>
										</strong>
									</span>
									<h4 className='my-0 d-inline-block'>
										<span className='badge bg-danger'>
											{product.quantity === 0 ? "Hết hàng" : ""}
										</span>
									</h4>
								</div>
								<div className='mt-3'>
									<p>
										Vận chuyển tới:{" "}
										<strong>Quận Bình Thạnh, TP.HCM</strong>{" "}
										<span
											className='ms-3 text-primary'
											style={{ cursor: "pointer" }}
										>
											Thay đổi
										</span>
									</p>
									<div className='d-flex align-items-center mt-3'>
										<img
											src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png'
											height='20'
											alt='free ship'
										/>
										<span className='ms-3'>Miễn phí vận chuyển</span>
									</div>
								</div>
								<div className='d-flex align-items-center mt-3'>
									<strong className='me-5'>Số lượng: </strong>
									{/*<SelectQuantity*/}
									{/*	max={book.quantity}*/}
									{/*	quantity={quantity}*/}
									{/*	setQuantity={setQuantity}*/}
									{/*	add={add}*/}
									{/*	reduce={reduce}*/}
									{/*/>*/}
									<span className='ms-4'>
										{product.quantity} sản phẩm có sẵn
									</span>
								</div>
								<div className='mt-4 d-flex align-items-center'>
									{product.quantity === 0 ? (
										<Button
											variant='outlined'
											size='large'
											className='me-3'
											color='error'
										>
											Hết hàng
										</Button>
									) : (
										<>
											<Button
												variant='outlined'
												size='large'
												startIcon={<ShoppingCartOutlined />}
												className='me-3'
												onClick={() => handleAddProduct(product)}
											>
												Thêm vào giỏ hàng
											</Button>
											<Button
												variant='contained'
												size='large'
												className='ms-3'
												onClick={() => handleBuyNow(product)}
											>
												Mua ngay
											</Button>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='container p-4 bg-white my-3 rounded'>
						<h5 className='my-3'>Mô tả sản phẩm</h5>
						<hr />
						<TextEllipsis text={product.description + ""} limit={1000} />
					</div>
					<div className='container p-4 bg-white my-3 rounded'>
						<h5 className='my-3'>Khách hàng đánh giá</h5>
						<hr />
						{/*<Comment idBook={idBookNumber} />*/}
					</div>
				</>
			) : (
				<CheckoutPage
					setIsCheckout={setIsCheckout}
					cartList={cartItem}
					totalPriceProduct={totalPriceProduct}
					isBuyNow={true}
				/>
			)}
		</>
	);
};

export default ProductDetail;
