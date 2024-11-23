import { CloudUpload, EditOutlined } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import React, { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import HiddenInputUpload from "../utils/HiddenInputUpload";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import {
	checkPassword,
	checkPhoneNumber,
	checkRepeatPassword,
} from "../utils/Validation";
import Tooltip from "@mui/material/Tooltip";
import OrderTable from "./components/OrderTable";
import { FadeModal } from "../utils/FadeModal";

import { get1User } from "../../api/UserApi";
import {getEmailByToken, getIdUserByToken} from "../utils/JwtService";
import UserModel from "../../model/UserModel";
import { endpointBE } from "../utils/Constant";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";
import {jwtDecode} from "jwt-decode";
// import { OrderForm } from "../../admin/order/OrderForm";

interface ProfilePageProps {
	setReloadAvatar: any;
}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
	useScrollToTop(); // Scroll to top each time this component is accessed

	const { isLoggedIn } = useAuth();
	const navigation = useNavigate();

	useLayoutEffect(() => {
		if (!isLoggedIn) {
			navigation("/login");
		}
	});

	// Personal information variables
	const [user, setUser] = useState<UserModel>({
		idUser: 0,
		birthDate: new Date(),
		deliveryAddress: "",
		purchaseAddress: "",
		email: "",
		firstName: "",
		lastName: "",
		gender: "",
		password: "",
		phoneNumber: "",
		name: "",
		avatar: "",
	});
	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [dataAvatar, setDataAvatar] = useState("");
	const [previewAvatar, setPreviewAvatar] = useState("");

	// Reload order table component
	const [keyCountReload, setKeyCountReload] = useState(0);

	// Handle order table
	const [id, setId] = useState(0);
	const [openModal, setOpenModal] = React.useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	// State variables
	const [modifiedStatus, setModifiedStatus] = useState(false);
	const [isUploadAvatar, setIsUploadAvatar] = useState(false);

	// Error message variables
	const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
	const [errorNewPassword, setErrorNewPassword] = useState("");
	const [errorRepeatPassword, setErrorRepeatPassword] = useState("");

	// Fetch user data
	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const email = getEmailByToken();  // Get email from token
			console.log("Email: " + email);

			// Fetch user data by email
			fetchUserByEmail(email)
				.then((userData) => {
					console.log("dateOfBirth: " + userData.birthDate);
					// Safely handle dateOfBirth, ensuring it's a valid date
					let validDateOfBirth = new Date(userData.birthDate + "T00:00:00Z");
					if (isNaN(validDateOfBirth.getTime())) {
						validDateOfBirth = new Date();
					}

					setUser({
						...userData,
						birthDate: validDateOfBirth,
					});

					setPreviewAvatar(userData.avatar);
					console.log("User data loaded:", userData);
				})
				.catch((error) => {
					console.error("Failed to fetch user data:", error);
				});
		} else {
			console.log("No token found in localStorage");
		}
	}, []);

	// Fetch user data by email
	async function fetchUserByEmail(email: string | undefined): Promise<UserModel> {
		const endpoint = `${endpointBE}/auth/get-user?email=${email}`;
		console.log("Endpoint: " + endpoint);
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
		}
		return response.json();
	}

	// Handle phone number change
	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, phoneNumber: e.target.value });
		setErrorPhoneNumber("");
	};

	// Handle image upload (preview)
	function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
		const inputElement = event.target as HTMLInputElement;

		if (inputElement.files && inputElement.files.length > 0) {
			const selectedFile = inputElement.files[0];

			const reader = new FileReader();

			// Xử lý sự kiện khi tệp đã được đọc thành công
			reader.onload = (e: any) => {
				// e.target.result chính là chuỗi base64
				const avatarBase64 = e.target?.result as string;

				setDataAvatar(avatarBase64);
				setPreviewAvatar(URL.createObjectURL(selectedFile));
				setIsUploadAvatar(true);
				props.setReloadAvatar(Math.random());
			};

			// Đọc tệp dưới dạng chuỗi base64
			reader.readAsDataURL(selectedFile);
		}
	}

	function handleSubmitAvatar() {
		const token = localStorage.getItem("token");
		const formData = new FormData(); // Create a FormData object
		formData.append("file", dataAvatar); // Append the image data
		formData.append("name", user.name); // Append the name or any other identifier

		toast.promise(
			fetch(endpointBE + "/api/upload", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					// No need to set 'Content-Type' header, it will be set automatically
				},
				body: formData,
			})
				.then((response) => {
					if (response.ok) {
						return response.text();
					}
					throw new Error('Network response was not ok.');
				})
				.then((imageUrl) => {
					toast.success("Cập nhật ảnh đại diện thành công");
					setPreviewAvatar(imageUrl); // Update the preview with the new avatar URL
					setIsUploadAvatar(false);
					props.setReloadAvatar(Math.random());
				})
				.catch((error) => {
					toast.error("Cập nhật ảnh đại diện thất bại");
					setPreviewAvatar(user.avatar);
					setIsUploadAvatar(false);
					console.log(error);
				}),
			{ pending: "Đang trong quá trình xử lý ..." }
		);
	}

	// Handle date of birth change
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const dateString = e.target.value;
		// Convert string to Date object
		const dateObject = new Date(dateString);
		if (!isNaN(dateObject.getTime())) {
			// If valid date, update state
			setUser({
				...user,
				birthDate: dateObject,
			});
		}
	};

	// Handle password change
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
		setErrorNewPassword("");
	};

	const handleRepeatPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setRepeatPassword(e.target.value);
		setErrorRepeatPassword("");
	};

	// Handle TABS
	const [value, setValue] = React.useState("1");
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	// Handle form submit (update information)
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		const token = localStorage.getItem("token");
		toast.promise(
			fetch(endpointBE + `/user/update-profile`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					idUser: getIdUserByToken(),
					firstName: user.firstName,
					lastName: user.lastName,
					dateOfBirth: user.birthDate,
					phoneNumber: user.phoneNumber,
					deliveryAddress: user.deliveryAddress,
					gender: user.gender,
				}),
			})
				.then((response) => {
					toast.success("Profile updated successfully");
					setModifiedStatus(!modifiedStatus);
				})
				.catch((error) => {
					toast.error("Profile update failed");
					setModifiedStatus(!modifiedStatus);
					console.log(error);
				}),
			{ pending: "Processing..." }
		);
	}

	// Handle avatar change
	// function handleSubmitAvatar() {
	// 	const token = localStorage.getItem("token");
	// 	toast.promise(
	// 		fetch(endpointBE + "/user/change-avatar", {
	// 			method: "PUT",
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 				"content-type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				idUser: getIdUserByToken(),
	// 				avatar: dataAvatar,
	// 			}),
	// 		})
	// 			.then((response) => {
	// 				if (response.ok) {
	// 					return response.json();
	// 				}
	// 			})
	// 			.then((data) => {
	// 				const { jwtToken } = data;
	// 				localStorage.setItem("token", jwtToken);
	//
	// 				toast.success("Avatar updated successfully");
	// 				setPreviewAvatar(previewAvatar);
	// 				setIsUploadAvatar(false);
	// 				props.setReloadAvatar(Math.random());
	// 			})
	// 			.catch((error) => {
	// 				toast.error("Avatar update failed");
	// 				setPreviewAvatar(user.avatar);
	// 				setIsUploadAvatar(false);
	// 				console.log(error);
	// 			}),
	// 		{ pending: "Processing..." }
	// 	);
	// }

	// Handle form submit (change password)
	function handleSubmitChangePassword(
		event: FormEvent<HTMLFormElement>
	): void {
		event.preventDefault();

		if (errorNewPassword.length > 0 || errorRepeatPassword.length > 0) {
			toast.warning("Please review the entered password");
			return;
		}

		const token = localStorage.getItem("token");
		fetch(endpointBE + "/user/change-password", {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/json",
			},
			body: JSON.stringify({
				idUser: getIdUserByToken(),
				newPassword: newPassword,
			}),
		})
			.then((response) => {
				setNewPassword("");
				setRepeatPassword("");
				toast.success("Password changed successfully");
			})
			.catch((error) => {
				console.log(error);
				toast.error("Password change failed");
			});
	}

	// If not logged in, do not render the component
	if (!isLoggedIn) {
		return <></>;
	}

	return (
		<div className='container my-5'>
			<Grid container>
				<Grid item sm={12} md={12} lg={3}>
					<div className='bg-light rounded py-3 me-lg-2 me-md-0 me-sm-0'>
						<div className='d-flex align-items-center justify-content-center flex-column'>
							<Avatar style={{ fontSize: "50px" }} alt={user.name}
									src={previewAvatar}
									sx={{ width: 100, height: 100 }}
							/>
							{!isUploadAvatar ? (
								<Button
									className='mt-3'
									size='small'
									component='label'
									variant='outlined'
									startIcon={<CloudUpload />}
								>
									Upload avatar
									<HiddenInputUpload
										handleImageUpload={handleImageUpload}
									/>
								</Button>
							) : (
								<div>
									<Button
										className='mt-4 me-2'
										size='small'
										variant='outlined'
										startIcon={<CloseIcon />}
										onClick={() => {
											setPreviewAvatar(user.avatar);
											setIsUploadAvatar(false);
										}}
										color='error'
									>
										Cancel
									</Button>
									<Button
										className='mt-4 ms-2'
										size='small'
										variant='outlined'
										startIcon={<CheckIcon />}
										color='success'
										onClick={handleSubmitAvatar}
									>
										Change
									</Button>
								</div>
							)}
						</div>
						<div className='text-center mt-3'>
							<p>Email: {user.email}</p>
						</div>
					</div>
				</Grid>
				<Grid item sm={12} md={12} lg={9}>
					<div
						className='bg-light rounded px-2 ms-lg-2 ms-md-0 ms-sm-0 mt-lg-0 mt-md-3 mt-sm-3'
						style={{ minHeight: "300px" }}
					>
						<Box sx={{ width: "100%", typography: "body1" }}>
							<TabContext value={value}>
								<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
									<TabList
										onChange={handleChange}
										aria-label='lab API tabs example'
									>
										<Tab label='Personal Information' value='1' />
										<Tab label='Orders' value='2' />
										<Tab label='Change Password' value='3' />
									</TabList>
								</Box>
								<TabPanel value='1'>
									<form
										onSubmit={handleSubmit}
										className='form position-relative'
										style={{ padding: "0 20px" }}
									>
										{!modifiedStatus && (
											<div
												className='text-end my-3 position-absolute'
												style={{
													bottom: "0",
													right: "0",
												}}
											>
												<Tooltip
													title='Edit Information'
													placement='bottom-end'
												>
													<Button
														variant='contained'
														type='button'
														className='rounded-pill'
														onClick={() =>
															setModifiedStatus(!modifiedStatus)
														}
													>
														<EditOutlined
															sx={{ width: "24px" }}
														/>
													</Button>
												</Tooltip>
											</div>
										)}
										<div className='row'>
											<div className='col-sm-12 col-md-6 col-lg-4'>
												{/*<TextField required fullWidth label='ID'*/}
												{/*		   value={user.idUser} disabled={true} className='input-field'*/}
												{/*		   InputProps={{ readOnly: true, }} />*/}
												<TextField required fullWidth label='First Name'
														   value={user.firstName}
														   onChange={(e) => setUser({
															   ...user,
															   firstName: e.target.value,
														   })
														   } disabled={modifiedStatus ? false : true} className='input-field' />
												<TextField fullWidth
														   error={errorPhoneNumber.length > 0 ? true : false}
														   helperText={errorPhoneNumber}
														   required={true}
														   label='Phone Number'
														   placeholder='Enter phone number'
														   value={user.phoneNumber}
														   onChange={handlePhoneNumberChange}
														   onBlur={(e) => {
															   checkPhoneNumber(
																   setErrorPhoneNumber,
																   e.target.value
															   );
														   }}
														   disabled={modifiedStatus ? false : true}
														   className='input-field'
												/>
											</div>
											<div className='col-sm-12 col-md-6 col-lg-4'>
												<TextField required fullWidth label='Username'
														   value={user.name} disabled={true} className='input-field'
												/>
												<TextField required fullWidth label='Last Name' value={user.lastName}
														   onChange={(e) =>
															   setUser({ ...user, lastName: e.target.value, })
														   }
														   disabled={modifiedStatus ? false : true} className='input-field'
												/>
												<TextField required fullWidth label='Delivery Address' value={user.deliveryAddress}
														   onChange={(e) =>
															   setUser({ ...user, deliveryAddress: e.target.value, })}
														   disabled={modifiedStatus ? false : true}
														   className='input-field'
												/>
											</div>
											<div className='col-sm-12 col-md-6 col-lg-4'>
												<TextField required fullWidth label='Email' value={user.email} className='input-field'
														   disabled={true} InputProps={{ readOnly: true, }} />
												<TextField required fullWidth className='input-field' label='Date of Birth'
														   style={{ width: "100%" }} type='date' value={
													user.birthDate
														.toISOString()
														.split("T")[0]
												}
														   onChange={handleDateChange}
														   disabled={modifiedStatus ? false : true}
												/>
												<FormControl>
													<FormLabel id='demo-row-radio-buttons-group-label'>
														Gender
													</FormLabel>
													<RadioGroup
														row
														aria-labelledby='demo-row-radio-buttons-group-label'
														name='row-radio-buttons-group'
														value={user.gender}
														onChange={(e) =>
															setUser({
																...user,
																gender: e.target.value,
															})
														}
													>
														<FormControlLabel
															disabled={
																modifiedStatus ? false : true
															}
															value='M'
															control={<Radio />}
															label='Male'
														/>
														<FormControlLabel
															disabled={
																modifiedStatus ? false : true
															}
															value='F'
															control={<Radio />}
															label='Female'
														/>
													</RadioGroup>
												</FormControl>
											</div>
										</div>
										{modifiedStatus && (
											<div className='text-center my-3'>
												<Button
													fullWidth
													variant='outlined'
													type='submit'
													sx={{ width: "50%", padding: "10px" }}
												>
													Save Changes
												</Button>
											</div>
										)}
									</form>
								</TabPanel>
								<TabPanel value='2'>
									<div>
										<OrderTable
											handleOpenModal={handleOpenModal}
											keyCountReload={keyCountReload}
											setKeyCountReload={setKeyCountReload}
											setId={setId}
										/>
									</div>
									<FadeModal
										open={openModal}
										handleOpen={handleOpenModal}
										handleClose={handleCloseModal}
									>
										{/*<OrderForm*/}
										{/*	id={id}*/}
										{/*	setKeyCountReload={setKeyCountReload}*/}
										{/*	handleCloseModal={handleCloseModal}*/}
										{/*	option='view-customer'*/}
										{/*/>*/}
									</FadeModal>
								</TabPanel>
								<TabPanel value='3'>
									<form
										onSubmit={handleSubmitChangePassword}
										className='form position-relative'
										style={{ padding: "0 120px" }}
									>
										<TextField
											error={
												errorNewPassword.length > 0 ? true : false
											}
											helperText={errorNewPassword} required={true} fullWidth type='password' label='New Password'
											placeholder='Enter new password' value={newPassword} onChange={handlePasswordChange}
											onBlur={(e) => { checkPassword(setErrorNewPassword, e.target.value);
											}}
											className='input-field'
										/>

										<TextField
											error={errorRepeatPassword.length > 0 ? true : false}
											helperText={errorRepeatPassword}
											required={true}
											fullWidth
											type='password'
											label='Confirm New Password'
											placeholder='Re-enter new password'
											value={repeatPassword}
											onChange={handleRepeatPasswordChange}
											onBlur={(e) => {
												checkRepeatPassword(
													setErrorRepeatPassword,
													e.target.value,
													newPassword
												);
											}}
											className='input-field'
										/>
										<div className='text-center my-3'>
											<Button
												fullWidth
												variant='outlined'
												type='submit'
												sx={{ width: "50%", padding: "10px" }}
											>
												Save Changes
											</Button>
										</div>
									</form>
								</TabPanel>
							</TabContext>
						</Box>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default ProfilePage;