import {Box, Button, TextField, Typography} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { endpointBE } from "../utils/Constant";
import { toast } from "react-toastify";
import useScrollToTop from "../../hooks/ScrollToTop";
import { useAuth } from "../utils/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import "./../../css/Login-Register.css";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../../admin/RequireAdmin";
import CartItemModel from "../../model/CartItemModel";
import {getCartAllByIdUser} from "../../api/CartApi";
import {useCartItem} from "../utils/CartItemContext";

export const ForgotPassword: React.FC = () => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

	const { setTotalCart, setCartList } = useCartItem();
	const navigation = useNavigate();
	const { isLoggedIn, setLoggedIn } = useAuth();
	useEffect(() => {
		if (isLoggedIn) {
			navigation("/");
		}
	});

	const [email, setEmail] = useState("");
	console.log(email);
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		toast.promise(
			fetch(endpointBE + "/auth/forgot-password?email=" + email, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({email}),
			})
				.then((response) => {
					if (response.ok) {
						toast.success(
							"Gửi thành công, hãy kiểm tra email để lấy mật khẩu"
						);
						setEmail("");
						navigation("/login");
					} else {
						toast.warning("Email không tồn tại!");
					}
				})
				.catch((error) => {
					toast.error("Gửi thất bại");
					console.log(error);
				}),
			{pending: "Đang trong quá trình xử lý ..."}
		);
	}

	const handleGoogleLoginSuccess = (response: any) => {
		const { credential } = response;
		fetch(endpointBE + "/user/google-authenticate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token: credential }),
		})
			.then((response) => response.ok ? response.json() : Promise.reject())
			.then(async (data) => {
				const { jwtToken } = data;
				const decodedToken = jwtDecode<JwtPayload>(jwtToken);

				if (!decodedToken.enabled) {
					toast.warning("Your account is not activated or has been disabled.");
					return;
				}

				toast.success("Login successful");
				setLoggedIn(true);
				localStorage.setItem("token", jwtToken);

				const cartData: string | null = localStorage.getItem("cart");
				let cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];

				if (cart.length) {
					cart = cart.map((c) => ({ ...c, idUser: decodedToken.id }));
					await fetch(endpointBE + "/cart-item/add-item", {
						method: "POST",
						headers: { Authorization: `Bearer ${jwtToken}`, "content-type": "application/json" },
						body: JSON.stringify(cart),
					});

					const response = await getCartAllByIdUser();
					localStorage.removeItem("cart");
					cart = response;
					localStorage.setItem("cart", JSON.stringify(cart));
					setTotalCart(cart.length);
					setCartList(cart);
				}

				navigation(decodedToken.role === "ROLE_ADMIN" ? "/admin/dashboard" : "/");
			})
			.catch(() => {

				toast.error("Google login failed.");
			});
	};

	return (
		<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
		<div className="video-background">
			<video autoPlay muted loop playsInline className="position-absolute " style={{zIndex: -1, width: "100%" }}>
				<source src="/background_video.mp4" type="video/mp4"/>
			</video>
			<div className="d-flex justify-content-center align-items-center h-100 forgot-pass-container">

				<div className="bg-white p-4 rounded shadow" style={{maxWidth: "500px", width: "100%", opacity: 0.9}}>

					<img src="/logo.png" alt="logo" className="logo" style={{width: '90px', height: '80px'}}/>
					<h2 style={{color: "#880a0a"}}>Forgot Your Password?</h2>

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<input
								type="email"
								className="form-control"
								id="outlined-required"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary w-100 mb-3">Reset Password</button>
					</form>
					<Link key="login" to="/login">
						<p className="text-center back " style={{cursor: "pointer"}}>
							Back to Sign In
						</p>
					</Link>

					<p>Or continue with social account</p>
					<GoogleLogin
						onSuccess={handleGoogleLoginSuccess}

					/>

				</div>
			</div>
		</div>
		</GoogleOAuthProvider>
	);
};
