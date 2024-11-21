import {Box, Button, TextField, Typography} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { endpointBE } from "../utils/Constant";
import { toast } from "react-toastify";
import useScrollToTop from "../../hooks/ScrollToTop";
import { useAuth } from "../utils/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import "./../../css/Login-Register.css";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

export const ForgotPassword: React.FC = () => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

	const {isLoggedIn} = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigation("/");
		}
	});

	const [email, setEmail] = useState("");

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
						{/*<GoogleLogin*/}
						{/*	onSuccess={handleGoogleLoginSuccess}*/}

						{/*/>*/}

					</div>
				</div>
			</div>
		</GoogleOAuthProvider>
	);
};
