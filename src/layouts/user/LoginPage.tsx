import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { JwtPayload } from "../../admin/RequireAdmin";
import { endpointBE } from "../utils/Constant";
import { useAuth } from "../utils/AuthContext";
import useScrollToTop from "../../hooks/ScrollToTop";
import { jwtDecode } from "jwt-decode";
import CartItemModel from "../../model/CartItemModel";
import { useCartItem } from "../utils/CartItemContext";
import { getCartAllByIdUser } from "../../api/CartApi";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import "./../../css/Login-Register.css";



const LoginPage: React.FC = () => {
	useScrollToTop();
	const { setTotalCart, setCartList } = useCartItem();
	const navigate = useNavigate();
	const { isLoggedIn, setLoggedIn } = useAuth();

	const [email, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const loginRequest = { email, password };

		fetch("http://localhost:8080/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginRequest),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					toast.error("Incorrect username or password.");
					console.log(response);
					return Promise.reject("Login failed");
				}
			})
			.then(async (data) => {
				const { jwtToken } = data;
				const decodedToken = jwtDecode<JwtPayload>(jwtToken);

					// if (!decodedToken.enabled) {
				// 	toast.warning("Your account is not activated or has been disabled.");
				// 	return;
				// }

				toast.success("Login successful");
				console.log(jwtToken)
				localStorage.setItem("token", jwtToken);
				setLoggedIn(true);

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

				navigate(decodedToken.role === "ROLE_ADMIN" ? "/admin/dashboard" : "/");
			})
			.catch(() => {
				setError("Incorrect username or password.");
				toast.error("Incorrect username or password.");
			});
	};

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

				navigate(decodedToken.role === "ADMIN" ? "/admin/dashboard" : "/");
			})
			.catch(() => {
				setError("Google login failed.");
				toast.error("Google login failed.");
			});
	};



	return (
		<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
			<div className="video-background">
				<video autoPlay muted loop playsInline>
					<source src="/background_video.mp4" type="video/mp4"/>
				</video>
				<div className="login-container ">
					<div className="login-card ">
						<img src="/logo.png" alt="logo" className="logo" style={{width: '90px', height: '80px'}}/>
						<h2 style={{color:"#880a0a"}}>Sign In</h2>
						<form className="login-form" onSubmit={handleSubmit}>
							<label>Username</label>
							<input type="text" placeholder="Enter your username" required onChange={(e) => setUsername(e.target.value)}/>
							<label>Password</label>
							<input type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)}/>

							<Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
							<button type="submit" className="btn sign-in-button">Sign In</button>
						</form>
						<span>
							Don't have an account? <Link to="/register" className={"sign-up"}>Sign Up</Link>
						</span>
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

export default LoginPage;
