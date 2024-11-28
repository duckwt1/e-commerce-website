import {
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { ProductHorizontal } from "../products/components/ProductHorizontalProps";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CartItemModel from "../../model/CartItemModel";
import { get1User } from "../../api/UserApi";
import { getIdUserByToken } from "../utils/JwtService";
import UserModel from "../../model/UserModel";
import { checkPhoneNumber } from "../utils/Validation";
import { toast } from "react-toastify";
import { endpointBE } from "../utils/Constant";
import { CheckoutSuccess } from "./components/CheckoutSuccess";
import { useCartItem } from "../utils/CartItemContext";
import useScrollToTop from "../../hooks/ScrollToTop";

interface CheckoutPageProps {
	setIsCheckout: any;
	cartList: CartItemModel[];
	totalPriceProduct: number;

	isBuyNow?: boolean;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = (props) => {
	useScrollToTop();

	const { setCartList, setTotalCart } = useCartItem();

	const [isSuccessPayment, setIsSuccessPayment] = useState(false);
	// Xử lý phương thức thanh toán
	const [payment, setPayment] = React.useState(1); // mặc định là cod
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [deliveryAddress, setDeliveryAddress] = useState("");
	const [note, setNote] = useState("");

	// Báo lỗi
	const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

	const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPayment(parseInt((event.target as HTMLInputElement).value));
	};

	// Lấy dữ liệu của người dùng lên
	const [user, setUser] = useState<UserModel>();
	useEffect(() => {
		const idUser = getIdUserByToken();
		get1User(idUser)
			.then((response) => {
				setUser(response);
				setFullName(response.firstname + " " + response.lastname);
				setPhoneNumber(response.phoneNumber);
				setDeliveryAddress(response.address);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const token = localStorage.getItem("token");

		const booksRequest: any[] = [];

		props.cartList.forEach((cartItem) => {
			booksRequest.push({
				book: cartItem.product,
				quantity: cartItem.quantity,
			});
		});

		const request = {
			idUser: getIdUserByToken(),
			idPayment: payment,
			fullName,
			phoneNumber,
			email: user?.email,
			deliveryAddress,
			totalPriceProduct: props.totalPriceProduct,
			book: booksRequest,
			note,
		};

		// Khi thanh toán bằng vnpay
		if (payment === 2) {
			try {
				const response = await fetch(
					endpointBE +
						"/vnpay/create-payment?amount=" +
						props.totalPriceProduct,
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${token}`,
							"content-type": "application/json",
						},
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const paymentUrl = await response.text();

				// Lưu order vào csdl
				const isPayNow = true;
				handleSaveOrder(request, isPayNow);

				window.location.replace(paymentUrl);
			} catch (error) {
				console.log(error);
			}
		} else {
			// Khi nhận hàng mới thanh toán
			handleSaveOrder(request);
		}
	}

	const handleSaveOrder = (request: any, isPayNow?: boolean) => {
		const token = localStorage.getItem("token");
		fetch(endpointBE + "/order/add-order", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/json",
			},
			body: JSON.stringify(request),
		})
			.then((response) => {
				localStorage.removeItem("cart");
				if (!isPayNow) {
					setIsSuccessPayment(true);
				}
				if (!props.isBuyNow) {
					setCartList([]);
					setTotalCart(0);
				}
				toast.success("Thanh toán thành công");
			})
			.catch((error) => {
				console.log(error);
				toast.error("Thanh toán thất bại");
			});
	};

	return (
		<>
			{!isSuccessPayment ? (
				<div className={"d-flex"} style={{ width: "90%", margin: "auto" }}>
					<form onSubmit={handleSubmit} style={{backgroundColor: "white", display: "flex", justifyContent: "center",}}>
						<div className={"col-lg-5 pt-5"}>
							<div className="container my-3 rounded-3 p-3">
								<strong className="fs-6">SHIPPING ADDRESS</strong>
								<hr />
								<div className="row">
									<div className="col-lg-6 col-md-6 col-sm-12">
										<TextField
											required={true}
											fullWidth
											type="text"
											label="Recipient's Full Name"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											className="input-field"
										/>
										<TextField
											error={errorPhoneNumber.length > 0 ? true : false}
											helperText={errorPhoneNumber}
											required={true}
											fullWidth
											type="text"
											label="Phone Number"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											onBlur={(e: any) => {
												checkPhoneNumber(setErrorPhoneNumber, e.target.value);
											}}
											className="input-field"
										/>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-12">
										<TextField
											required={true}
											fullWidth
											type="text"
											label="Email"
											value={user?.email}
											disabled
											className="input-field"
										/>
										<TextField
											required={true}
											fullWidth
											type="text"
											label="Delivery Address"
											value={deliveryAddress}
											onChange={(e) =>
												setDeliveryAddress(e.target.value)
											}
											className="input-field"
										/>
									</div>
								</div>
							</div>
							<div className="container my-3 rounded-3 p-3">
								<strong className="fs-6">PAYMENT METHOD</strong>
								<hr />
								<FormControl>
									<RadioGroup
										aria-labelledby="demo-controlled-radio-buttons-group"
										name="controlled-radio-buttons-group"
										value={payment}
										onChange={handleChangePayment}
									>
										<FormControlLabel
											value={1}
											control={<Radio />}
											label={
												<div
													style={{
														display: "flex",
														alignItems: "center",
													}}
												>
													<img
														src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10311"
														alt="Cash on Delivery"
														style={{
															width: "40px",
															marginRight: "10px",
														}}
													/>
													Cash on Delivery (COD)
												</div>
											}
										/>

										<FormControlLabel
											value={2}
											control={<Radio />}
											label={
												<div
													style={{
														display: "flex",
														alignItems: "center",
													}}
												>
													<img
														src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10311"
														alt="VNPAY"
														style={{
															width: "40px",
															marginRight: "10px",
														}}
													/>
													Pay with VNPAY
												</div>
											}
										/>
									</RadioGroup>
								</FormControl>
							</div>
							<div className="container my-3 rounded-3 p-3">
								<strong className="fs-6">DISCOUNT CODE</strong>
								<hr />
								<div className="d-flex align-items-end w-50">
									<TextField
										className="w-50"
										id="standard-basic"
										label="Enter promo code (if any):"
										variant="standard"
										value={""}
									/>
									<Button className="ms-3" variant="outlined">
										Apply
									</Button>
								</div>
							</div>
							<div className="container my-3 rounded-3 p-3">
								<strong className="fs-6">NOTES</strong>
								<hr />
								<TextField
									className="w-100"
									id="standard-basic"
									label="Notes"
									variant="outlined"
									multiline
									minRows={3}
									maxRows={4}
									value={note}
									onChange={(e) => setNote(e.target.value)}
								/>
							</div>
						</div>




						<div className={"col-lg-6 pt-5"} style={{ marginLeft: "50px" }}>
							<div className="container my-3 rounded-3 p-3">
								<strong className="fs-6">ORDER SUMMARY</strong>
								<hr />
								<div className="row my-3">
									<div className="col">
										<span className="ms-3">Product</span>
									</div>
									<div className="col-2 text-center">Quantity</div>
									<div className="col-2 text-center">Total</div>
								</div>
								{props.cartList.map((cartItem) => (
									<ProductHorizontal
										key={cartItem.idCart}
										cartItem={cartItem}
									/>
								))}
							</div>
						</div>
						<footer className="container fixed-bottom bottom-0 shadow-4-strong"
								style={{height: "200px", backgroundColor: "white", color: "black",borderRadius: "10px", border : "3px solid red"}}>
							<div  className={"p-3 pt-4"} style={{ backgroundColor: "white", width: "100%" }}>
								<div className="row">
									<div className="me-3 col text-end">Subtotal</div>
									<div className="ms-3 col-2 text-end">
										{props.totalPriceProduct.toLocaleString("en-US")} $
									</div>
								</div>
								<div className="row">
									<div className="me-3 col text-end">Shipping Fee</div>
									<div className="ms-3 col-2 text-end">0 $</div>
								</div>
								<div className="row">
									<div className="me-3 col text-end">
										<strong>Total (including VAT)</strong>
									</div>
									<div className="ms-3 col-2 text-end text-danger fs-5">
										<strong>
											{props.totalPriceProduct.toLocaleString("en-US")} $
										</strong>
									</div>
								</div>
								<hr className="mt-3" />
								<div className="row">
									<div className="col d-flex align-items-center">
									<span
										style={{ cursor: "pointer" }}
										onClick={() => props.setIsCheckout(false)}
									>
										<ArrowBackIcon />
										<strong className="ms-2">Back to Cart</strong>
									</span>
									</div>
									<div className="col-4">
										<Button
											type="submit"
											variant="contained"
											sx={{ width: "100%" }}
										>
											Confirm Payment
										</Button>
									</div>
								</div>
							</div>
						</footer>
					</form>
				</div>
			) : (
				<CheckoutSuccess />
			)}
		</>

);
};
