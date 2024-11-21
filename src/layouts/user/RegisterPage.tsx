import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Form.css";
import "./../../css/register.css";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	checkExistEmail,
	checkExistUsername,
	checkPassword,
	checkPhoneNumber,
	checkRepeatPassword,
} from "../utils/Validation";
import { toast } from "react-toastify";
import { endpointBE } from "../utils/Constant";
import { useAuth } from "../utils/AuthContext";
import useScrollToTop from "../../hooks/ScrollToTop";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Button from "@mui/material/Button";

const RegisterPage: React.FC = () => {
	useScrollToTop(); // Scroll to top each time entering this component

	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigation("/");
		}
	});

	// Declare registration variables
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	// Declare error variables
	const [errorUsername, setErrorUsername] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorRepeatPassword, setErrorRepeatPassword] = useState("");
	const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

	// Notification variable

	// Loading button when submitting
	const [statusBtn, setStatusBtn] = useState(false);

	// Form submit function
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setStatusBtn(true);

		setErrorUsername("");
		setErrorEmail("");
		setErrorPassword("");
		setErrorRepeatPassword("");

		const isUsernameValid = !(await checkExistUsername(
			setErrorUsername,
			username
		));
		const isEmailValid = !(await checkExistEmail(setErrorEmail, email));
		const isPassword = !checkPassword(setErrorPassword, password);
		const isRepeatPassword = !checkRepeatPassword(
			setErrorRepeatPassword,
			repeatPassword,
			password
		);
		const isPhoneNumberValid = !checkPhoneNumber(
			setErrorPhoneNumber,
			phoneNumber
		);

		if (
			isUsernameValid &&
			isEmailValid &&
			isPassword &&
			isRepeatPassword &&
			isPhoneNumberValid
		) {
			try {
				const endpoint = endpointBE + "/auth/register";

				const response = await toast.promise(
					fetch(endpoint, {
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							username,
							password,
							email,
							firstName,
							lastName,
							phoneNumber,
							gender: "M",
						}),
					}),
					{ pending: "Processing..." }
				);

				console.log(response + "response");

				if (response.ok) {
					toast.success("Account registration successful.");
					toast.info("Please check your email to activate your account.");
					navigation("/login");
					setStatusBtn(false);
					return true;
				} else {
					toast.error("Account registration failed.");
					setStatusBtn(false);
					return false;
				}
			} catch (error) {
				console.log(error);
				setStatusBtn(false);
				toast.error("Account registration failed.");
			}
		} else {
			setStatusBtn(false);
		}
	};

	const handleUsernameChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUserName(e.target.value);
		setErrorUsername("");
	};

	const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrorEmail("");
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrorPassword("");
	};

	const handleRepeatPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setRepeatPassword(e.target.value);
		setErrorRepeatPassword("");
	};

	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
		setErrorPhoneNumber("");
	};

	return (
		<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
			<div className="video-background">
				<video autoPlay muted loop playsInline>
					<source src="/background_video.mp4" type="video/mp4" />
				</video>
				<div className='container container-signup py-4 rounded-5 shadow-5 bg-light w-50'>

						<h1 className='text-center' style={{color: "#880a0a", fontWeight: "600"}}>REGISTER </h1>

						<form onSubmit={handleSubmit} className='form'>
							<div className='row px-2'>
								<div className='col-lg-6 col-md-12 col-12'>
									<label>Username</label>
									<input
										type="text" className={"input-username c95"}
										placeholder="Enter your username"
										required
										onChange={(e) => setUserName(e.target.value)}
									/>

									<label>Password</label>
									<input
										type="password" className={"c95"}
										placeholder="Enter your password"
										required
										onChange={(e) => setPassword(e.target.value)}
									/>

									<label>Repeat Password</label>
									<input
										type="password" className={"c95"}
										placeholder="Repeat your password"
										required
										onChange={(e) => setRepeatPassword(e.target.value)}
									/>
								</div>
								<div className='col-lg-6 col-md-12 col-12'>
									<label>First Name</label>
									<input
										type="text"
										placeholder="Enter your first name"
										required
										onChange={(e) => setFirstName(e.target.value)}
									/>
									<label>Last Name</label>
									<input
										type="text"
										placeholder="Enter your last name"
										required
										onChange={(e) => setLastName(e.target.value)}
									/>
									<label>Phone Number</label>
									<input
										type="text"
										placeholder="Enter your phone number"
										required
										onBlur={(e: any) => {
											checkPhoneNumber(setErrorPhoneNumber, e.target.value);
										}}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>
								<div>
									<label>Email</label>
									<input
										type="email"
										placeholder="Enter your email"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
							<div className='d-flex justify-content-end mt-2 px-3'>
							<span>
								Already have an account? <Link to={"/login"} className={"log-in"}>Sign In</Link>
							</span>
							</div>
							<div className='loading-button text-center my-3'>
								<Button fullWidth type='submit' sx={{padding: "10px", color: '#fff'}}>
									Register
								</Button>
							</div>
						</form>
					</div>
				</div>
		</GoogleOAuthProvider>
);
};

export default RegisterPage;
