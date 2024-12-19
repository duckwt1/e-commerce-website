import React, { useEffect, useState } from "react";
import ProductCartProps from "./components/ProductCartProps";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckoutPage } from "../pages/CheckoutPage";
import { isToken } from "../utils/JwtService";
import { useCartItem } from "../utils/CartItemContext";
import { getCartAllByIdUser } from "../../api/CartApi";

const ProductCartList: React.FC = () => {
	const { setTotalCart, setCartList, cartList } = useCartItem();
	const [totalPriceProduct, setTotalPriceProduct] = useState(0);

	// Fetch cart items when component mounts
	useEffect(() => {
		const fetchCart = async () => {
			try {
				const cartItems = await getCartAllByIdUser();
				setCartList(cartItems); // Update the cart list
			} catch (error) {
				console.error("Failed to fetch cart items:", error);
			}
		};

		fetchCart();
	}, [setCartList]);

	// Recalculate total price whenever the cartList changes
	useEffect(() => {
		const total = cartList.reduce(
			(sum, cartItem) => sum + (cartItem.product.sellPrice || 0) * cartItem.quantity,
			0
		);
		setTotalPriceProduct(total);
	}, [cartList]);

	// Thanh toán
	const [isCheckout, setIsCheckout] = useState(false);

	return (
		<>
			{!isCheckout ? (
				<div style={{ overflow: "hidden" }}>
					{cartList.length === 0 && (
						<div className='d-flex align-items-center justify-content-center flex-column position-relative'>
							<img
								src='https://newnet.vn/themes/newnet/assets/img/empty-cart.png'
								alt=''
								width='63%'
							/>
							<Link
								to={"/search"}
								className='position-absolute'
								style={{ bottom: "100px" }}
							>
								<Button variant='contained'>Shopping now</Button>
							</Link>
						</div>
					)}
					<div
						className='row my-4 pb-5 px-5'
						style={
							cartList.length === 0
								? { display: "none" }
								: { display: "flex" }
						}
					>
						{/* Bên trái */}

						<div className='col-lg-8 col-md-12 col-sm-12 '>
							<div className='container-book bg-light '>
								<div className='row px-4 py-3'>
									<div className='col'> Product</div>
									<div className='col-3 text-center'>Quantity</div>
									<div className='col-2 text-center'>PRICE</div>
									<div className='col-2 text-center'>ACTION</div>
								</div>
							</div>
							<div className='container-book bg-light mt-3 px-3'>
								<div className='row px-4 py-3'>
									{cartList.map((cartItem) => {
										return (
											<ProductCartProps
												cartItem={cartItem}
												handleRemoveBook={setTotalCart}
												key={cartItem.product.productId}
											/>
										);
									})}
								</div>
							</div>
						</div>

						{/* Bên phải */}
						<div
							className='container-book bg-light col-lg col-md-12 col-sm-12 px-5 pb-4 mt-lg-0 mt-md-3 mt-sm-3'
							style={{ height: "fit-content" }}
						>
							<div className='d-flex align-items-center justify-content-between mt-3'>
								<span>Total:</span>
								<span>
									<strong>
										{totalPriceProduct.toLocaleString()} $
									</strong>
								</span>
							</div>
							<hr className='my-2' />
							<div className='d-flex align-items-center justify-content-between'>
								<span>
									<strong>Total bill (include VAT):</strong>
								</span>
								<span className='text-danger fs-5'>
									<strong>
										{totalPriceProduct.toLocaleString()} $
									</strong>
								</span>
							</div>

							<Button
								variant='contained'
								sx={{ width: "100%", marginTop: "30px" }}
								onClick={() => {
									if (isToken()) {
										setIsCheckout(true);
									} else {
										toast.warning(
											"Bạn cần đăng nhập để thực hiện chức năng này"
										);
										// navigation.navigate("/login");
									}
								}}
							>
								Purchase
							</Button>
						</div>
					</div>
				</div>
			) : (
				<CheckoutPage
					setIsCheckout={setIsCheckout}
					cartList={cartList}
					totalPriceProduct={totalPriceProduct}
				/>
			)}
		</>
	);
};

export default ProductCartList;
