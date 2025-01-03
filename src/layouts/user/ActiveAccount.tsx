/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { endpointBE } from "../utils/Constant";
import { useAuth } from "../utils/AuthContext";
import useScrollToTop from "../../hooks/ScrollToTop";
import { Button } from "@mui/material";

const ActiveAccount: React.FC = () => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng

	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigation("/");
		}
	}, [isLoggedIn, navigation]); // Added isLoggedIn and navigation to dependencies

	const [enabled, setEnabled] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState("");
	const { email, activationCode } = useParams(); // Combined useParams for better readability

	useEffect(() => {
		if (email && activationCode) {
			handleActiveAccount();
		}
	}, [email, activationCode]); // Added email and activationCode to dependencies

	const handleActiveAccount = async () => {
		setLoading(true); // Set loading to true immediately
		try {
			const url = `${endpointBE}/auth/activate-account?email=${email}&code=${activationCode}`;
			const response = await fetch(url, { method: "GET" });

			if (response.ok) {
				setEnabled(true);
				setNotifications("Tài khoản kích hoạt thành công."); // Success message
			} else {
				const errorText = await response.text(); // Await response text
				setNotifications(errorText);
				setEnabled(false);
			}
		} catch (error) {
			console.log("Lỗi kích hoạt: " + error);
			setNotifications("Có lỗi xảy ra trong quá trình kích hoạt."); // General error message
			setEnabled(false);
		} finally {
			setLoading(false); // Ensure loading is set to false after the operation
		}
	};

	if (isLoading) {
		return (
			<div>
				<div className='container bg-light my-3 rounded-3 p-4'>
					<h1 className='text-center text-black'>KÍCH HOẠT TÀI KHOẢN</h1>
					<div className='d-flex align-items-center justify-content-center flex-column p-5'>
						{/* Display loading state */}
						<h2>Đang kích hoạt tài khoản...</h2>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className='container bg-light my-3 rounded-3 p-4'>
					<h1 className='text-center text-black'>KÍCH HOẠT TÀI KHOẢN</h1>
					<div className='d-flex align-items-center justify-content-center flex-column p-5'>
						{enabled ? (
							<>
								<img
									src='https://cdn0.fahasa.com/skin/frontend/base/default/images/order_status/ico_successV2.svg?q=10311'
									alt='success'
								/>
								<h2 className='my-3 text-success'>
									Tài khoản kích hoạt thành công
								</h2>
								<Link to={"/login"}>
									<Button variant='contained' className='my-3'>
										Đăng nhập để tiếp tục
									</Button>
								</Link>
							</>
						) : (
							<>
								<img
									src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'
									alt='fail'
									width={150}
								/>
								<h2 className='my-3 text-danger'>
									Tài khoản kích hoạt thất bại. Lỗi: {notifications}
								</h2>
							</>
						)}
					</div>
				</div>
			</div>
		);
	}
};

export default ActiveAccount;