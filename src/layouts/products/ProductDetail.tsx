import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductModel from "../../model/ProductModel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "@mui/material/Button";
import { ShoppingCartOutlined } from "@mui/icons-material";
import ImageModel from "../../model/ImageModel";
import React from "react";
import { toast } from "react-toastify";
import { endpointBE } from "../utils/Constant";
import { getIdUserByToken, isToken } from "../utils/JwtService";
import { useCartItem } from "../utils/CartItemContext";
import { Skeleton } from "@mui/material";
import CartItemModel from "../../model/CartItemModel";
import { CheckoutPage } from "../pages/CheckoutPage";
import useScrollToTop from "../../hooks/ScrollToTop";
import { getAllImageByProduct } from "../../api/ImageAPI";
import TextEllipsis from "./components/TextEllipsis";
import { getProductById } from "../../api/ProductAPI";
import { Carousel } from "react-responsive-carousel";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import {getReviewsByProductId} from "../../api/ReviewApi";
import ReviewModel from "../../model/ReviewModel";

interface BookDetailProps {}

const ProductDetail: React.FC<BookDetailProps> = (props) => {
	useScrollToTop();
	const { setTotalCart, cartList } = useCartItem();
	const { idProduct } = useParams();
	let idProductNumber: number = 0;

	try {
		idProductNumber = parseInt(idProduct + "");
		if (Number.isNaN(idProductNumber)) {
			idProductNumber = 0;
		}
	} catch (error) {
		console.error("Error: " + error);
	}

	const [product, setProduct] = useState<ProductModel | null>(null);
	const [loading, setLoading] = useState(true);
	const [erroring, setErroring] = useState<string | null>(null);

	useEffect(() => {
		getProductById(idProductNumber)
			.then((response) => {
				console.log("Product response:", response);
				setProduct(response);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setErroring(error.message);
			});
	}, [idProductNumber]);

	const [images, setImages] = useState<ImageModel[] | null>(null);
	useEffect(() => {
		getAllImageByProduct(idProductNumber)
			.then((response) => {
				console.log("Images response:", response);
				setImages(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [idProductNumber]);

	const [quantity, setQuantity] = useState(1);
	const add = () => {
		if (quantity < (product?.quantity ? product?.quantity : 1)) {
			setQuantity(quantity + 1);
		}
	};

	const reduce = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleAddProduct = async (newProduct: ProductModel) => {
		let isExistProduct = cartList.find(
			(cartItem) => cartItem.product.productId === newProduct.productId
		);
		console.log("productId: "+newProduct.productId);
		if (isExistProduct) {
			isExistProduct.quantity += quantity;
			// ...UPDATE DATABASE
		} else {
			if (isToken()) {
				try {
					const token = localStorage.getItem("token");
					const userId = getIdUserByToken();
					const response = await fetch(endpointBE + `/api/cart/${userId}/add?productId=${newProduct.productId}&quantity=1`, {
							method: "POST",
							headers: {
								Authorization: `Bearer ${token}`,
								"content-type": "application/json",
							},
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
		localStorage.setItem("cart", JSON.stringify(cartList));
		toast.success("Added to cart successfully!");
		setTotalCart(cartList.length);
	};

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
	const [reviews, setReviews] = useState<ReviewModel[] | null>(null);
	const [loadingReviews, setLoadingReviews] = useState(true);

	// Lấy danh sách đánh giá dựa trên id sản phẩm
	useEffect(() => {
		if (idProductNumber) {
			getReviewsByProductId(idProductNumber)
				.then((response) => {
					setReviews(response);
					setLoadingReviews(false);
				})
				.catch((error) => {
					console.error("Error loading reviews: ", error);
					setLoadingReviews(false);
				});
		}
	}, [idProductNumber]);

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
				<h1>Error: {erroring}</h1>
			</div>
		);
	}

	if (product === null) {
		return (
			<div>
				<h1>Product does not exist</h1>
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
								<div className='d-flex align-items-center mt-5'>
									<p className='me-5'>

										<strong>
											{/*{genres?.map((genre) => genre.nameGenre + " ")}*/}
											SELLER: <strong style={{color:"darkblue"}}>{"   QUANG VIET STORE"}</strong>
										</strong>
									</p>
									<p className='ms-5'>

									</p>
								</div>
								<div className='d-flex align-items-center'>
									<div className='d-flex align-items-center'>
										<p className='text-danger  mb-0'>

											★★★★☆

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
                                            Sold
                                        </span>
										<span className='fw-bold ms-2'>
                                            {product.soldQuantity}
                                        </span>
									</div>
								</div>
								<div className='price mt-3'>
                                    <span className='discounted-price text-danger  me-3'>
                                        <strong style={{ fontSize: "32px" }}>
                                            {product.sellPrice?.toLocaleString()}$
                                        </strong>
                                    </span>
									<span className='original-price  me-3'>
                                        <strong>
                                            <del>{product.listPrice=product.sellPrice*1.2} $</del>
                                        </strong>
                                    </span>
									<h4 className='my-0 d-inline-block'>
                                        <span className='badge bg-danger'>
                                            {product.quantity === 0 ? "Sold out" : ""}
                                        </span>
									</h4>
								</div>
								<div className='mt-4' style={{textAlign:"start"}}>
									<p>
										Shipping to:{" "}
										<strong>P. Thanh Bình, Q. Hải Châu, TP. Đà Nẵng</strong>{" "}
										<span
											className='ms-3 text-primary'
											style={{ cursor: "pointer" }}
										>
                                            Change
                                        </span>
									</p>
									<div className='d-flex align-items-center mt-3'>
										<img
											src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png'
											height='20'
											alt='free ship'
										/>
										<span className='ms-3 mt-3'>Free ship</span>
									</div>
								</div>
								<div className='d-flex align-items-center mt-3'>
									<strong className='me-2'>Quantity: </strong>
									<span className='ms-1'>
                                        {product.quantity} Available Products
                                    </span>
								</div>
								<div className='mt-5 d-flex align-items-center'>
									{product.quantity === 0 ? (
										<Button
											variant='outlined'
											size='large'
											className='me-3'
											color='error'
										>
											Sold out
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
												Add to cart
											</Button>
											<Button
												variant='contained'
												size='large'
												className='ms-3'
												onClick={() => handleBuyNow(product)}
											>
												Buy now
											</Button>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='container p-4 bg-white my-3 rounded' style={{textAlign:"justify"}}>
						<h3 className='my-3'>Product Description</h3>
						<hr />
						<TextEllipsis text={product.description+""} limit={90000} />
					</div>
					<div className='container p-4 bg-white my-3 rounded'  style={{textAlign:"justify"}}>
						<h3 className='my-3'>Customer Reviews</h3>
						<hr />
						{loadingReviews ? (
							<div className='d-flex justify-content-center'>
								<Skeleton
									variant='rectangular'
									width={200}
									height={100}
								/>
							</div>
						) : (
							<>
								{reviews?.map((review) => (
									<div key={review.idReview} className='mb-3'>
										<div className='d-flex align-items-center'>
											<p className='me-3'>
												<strong>{review.idReview}</strong>
											</p>
											<p className='text-secondary'>
												{review.timestamp}
											</p>
										</div>
										<p>{review.content}</p>
									</div>
								))}
							</>
						)}
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
