import {CloudUpload, EditOutlined} from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import React, {FormEvent, useEffect, useLayoutEffect, useState} from "react";
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
import {FadeModal} from "../utils/FadeModal";

import {get1User} from "../../api/UserApi";
import {getEmailByToken, getIdUserByToken, getRoleByToken} from "../utils/JwtService";
import UserModel from "../../model/UserModel";
import {endpointBE} from "../utils/Constant";
import {toast} from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {useAuth} from "../utils/AuthContext";
import {useNavigate} from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";
import {jwtDecode} from "jwt-decode";

// import { OrderForm } from "../../admin/order/OrderForm";

interface ProfilePageProps {
    setReloadAvatar: any;
}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    useScrollToTop(); // Scroll to top each time this component is accessed

    const {isLoggedIn} = useAuth();
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
        address: "",
        // purchaseAddress: "",
        email: "",
        firstname: "",
        lastname: "",
        gender: "",
        password: "",
        phoneNumber: "",
        name: "",
        avatar: "",
        role: "",
    });
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [dataAvatar, setDataAvatar] = useState<File | null>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string>("");
    const [isShopCreated, setIsShopCreated] = useState(false); // Trạng thái shop đã được tạo


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

    // Register shop
    const [shopName, setShopName] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    const [shopContact, setShopContact] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch user data
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const email = getEmailByToken();
            const role = getRoleByToken();
            console.log("Role: " + role);

            // Fetch user data by email
            fetchUserByEmail(email)
                .then((userData) => {
                    // Safely handle dateOfBirth, ensuring it's a valid date
                    let validDateOfBirth = new Date(userData.birthDate + "T00:00:00Z");
                    if (isNaN(validDateOfBirth.getTime())) {
                        validDateOfBirth = new Date();
                    }

                    setUser({
                        ...userData,
                        birthDate: validDateOfBirth,
                        role: role,
                    });

                    console.log("Role: " + role);

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
        console.log("Response: ", response);
        return response.json();
    }

    // Handle phone number change
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = e.target.value;
        console.log("New Phone Number:", newPhoneNumber); // Log the new phone number
        setUser({...user, phoneNumber: newPhoneNumber});
        setErrorPhoneNumber("");
    };


    // Handle image upload (preview)
    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = event.target as HTMLInputElement;

        if (inputElement.files && inputElement.files.length > 0) {
            const selectedFile = inputElement.files[0];

            // Set the preview for the uploaded image
            setPreviewAvatar(URL.createObjectURL(selectedFile));
            setDataAvatar(selectedFile); // Store the actual File object
            setIsUploadAvatar(true);
            props.setReloadAvatar(Math.random());
        }
    }

    function handleSubmitAvatar() {
        const token = localStorage.getItem("token");
        const formData = new FormData(); // Create a FormData object
        if (dataAvatar) {
            formData.append("file", dataAvatar); // Append the File object
            formData.append("name", user.name); // Append the name or any identifier

            toast.promise(
                fetch(endpointBE + "/api/upload", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // No need to set 'Content-Type' header, it will be set automatically
                    },
                    body: formData, // Send the FormData object
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text(); // Get the image URL from the response
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then((imageUrl) => {
                        toast.success("Change avatar successfully");
                        setPreviewAvatar(imageUrl); // Update the preview with the new avatar URL
                        setIsUploadAvatar(false);
                        props.setReloadAvatar(Math.random());
                    })
                    .catch((error) => {
                        toast.error("Change avatar failed");
                        setPreviewAvatar(user.avatar);
                        setIsUploadAvatar(false);
                        console.log(error);
                    }),
                {pending: "Uploading..."}
            );
        } else {
            toast.error("No file selected for upload.");
        }
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
        console.log("email: " + user.email,
            "name: " + user.name,
            "firstname: " + user.firstname,
            "lastname: " + user.lastname,
            "birthDate: " + user.birthDate,
            "phoneNumber: " + user.phoneNumber,
            "address: " + user.address,
        );
        toast.promise(
            fetch(endpointBE + `/auth/update-user`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    // idUser: getIdUserByToken(),
                    email: user.email,
                    name: user.name,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    birthDate: user.birthDate,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
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
            {pending: "Processing..."}
        );
    }

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
        fetch(endpointBE + "/auth/update-user-password?email=" + user.email, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: newPassword,
        })
            .then((response) => {
                setNewPassword("");
                setRepeatPassword("");
                toast.success("Password changed successfully");
                console.log("response: " + response);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Password change failed");
            });
    }

    function handleRegisterShop(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault(); // Prevent the default form submission

        // Basic validation
        if (!shopName || !shopAddress || !shopContact) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        const token = localStorage.getItem("token");
        const shopData = {
            email: user.email,
            name: shopName,
            address: shopAddress,
            "phoneNumber": shopContact,
        };

        console.log("Shop data:", shopData);

        toast.promise(
            fetch(endpointBE + "/auth/register-shop", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(shopData),
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("Response: " + response);
                        throw new Error("Failed to register shop");
                    }
                    return response.text();
                })
                .then((data) => {
                    toast.success("Shop registered successfully!");
                    // Optionally reset the form or update the state
                    setShopName("");
                    setShopAddress("");
                    setShopContact("");
                })
                .catch((error) => {
                    toast.error("Error: " + error.message);
                    console.error(error);
                }),
            {pending: "Registering shop..."}
        );
    }

    const visibleTabs = {
        order: user.role == "ROLE_USER" ? false : true,
        isShopCreated: user.role == "ROLE_SELLER" ? false : true,

    };


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
                            <Avatar style={{fontSize: "50px"}} alt={user.name}
                                    src={previewAvatar}
                                    sx={{width: 100, height: 100}}
                            />
                            {!isUploadAvatar ? (
                                <Button
                                    className='mt-3'
                                    size='small'
                                    component='label'
                                    variant='outlined'
                                    startIcon={<CloudUpload/>}
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
                                        startIcon={<CloseIcon/>}
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
                                        startIcon={<CheckIcon/>}
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
                        style={{minHeight: "300px"}}
                    >
                        <Box sx={{width: "100%", typography: "body1"}}>
                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                    <TabList
                                        onChange={handleChange}
                                        aria-label='lab API tabs example'
                                    >
                                        <Tab label='Personal Information' value='1'/>
                                        <Tab label='Change Password' value='3'/>
                                        <Tab label='Order' value='2'/>

                                        {user.role === "ROLE_USER" &&  <Tab label='Register Shop' value='4'/>}

                                        {/*{user.role == "ROLE_USER" && <Tab label='Order' value='2'/>}*/}
                                        {/*{visibleTabs.isShopCreated && <Tab label='Register Shop' value='4'/>}*/}
                                        {/*{user.role == "ROLE_SELLER" && <Tab label='Shop Management' value='5'/>}*/}
                                    </TabList>
                                </Box>
                                <TabPanel value='1'>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='form position-relative'
                                        style={{padding: "0 20px"}}
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
                                                    style={{  padding: "10px"}}
                                                    title='Edit Information'
                                                    placement='bottom-end'>
                                                    <Button
                                                        variant='contained'
                                                        type='button'
                                                        className='rounded-pill'
                                                        onClick={() => setModifiedStatus(!modifiedStatus)}>
                                                        <EditOutlined sx={{width: "24px"}}/>
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
                                                           value={user.firstname}
                                                           onChange={(e) => setUser({
                                                               ...user,
                                                               firstname: e.target.value,
                                                           })
                                                           } disabled={modifiedStatus ? false : true}
                                                           InputProps={{
                                                               style: { paddingTop: '20px' } // Adjust the padding as needed
                                                           }}
                                                           className='input-field tabb1'/>
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
                                                           InputProps={{
                                                               style: { paddingTop: '20px' } // Adjust the padding as needed
                                                           }}
                                                           className='input-field tabb1'/>
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                                <TextField required fullWidth label='Username'
                                                           value={user.name} disabled={true} className='input-field tabb1'
                                                           InputProps={{
                                                               style: { paddingTop: '20px' } // Adjust the padding as needed
                                                           }}
                                                />
                                                <TextField required fullWidth label='Last Name' value={user.lastname}
                                                           onChange={(e) =>
                                                               setUser({...user, lastname: e.target.value,})
                                                           }
                                                           InputProps={{
                                                               style: { paddingTop: '20px' } // Adjust the padding as needed
                                                           }}
                                                           disabled={modifiedStatus ? false : true}
                                                           className='input-field tabb1'
                                                />
                                                <TextField required fullWidth label='Address' value={user.address}
                                                           onChange={(e) =>
                                                               setUser({...user, address: e.target.value,})}
                                                           disabled={modifiedStatus ? false : true}
                                                           InputProps={{
                                                               style: { paddingTop: '20px' } // Adjust the padding as needed
                                                           }}
                                                           className='input-field'
                                                />
                                            </div>
                                            <div className='col-sm-12 col-md-6 col-lg-4'>
                                                <TextField required fullWidth label='Email' value={user.email}
                                                           className='input-field tabb1'
                                                           InputProps={{
                                                               style: { paddingTop: '20px' } // Adjust the padding as needed
                                                           }}
                                                           disabled={true} />
                                                <TextField required fullWidth className='input-field tabb1'
                                                           label='Date of Birth'
                                                           InputProps={{
                                                               style: { paddingTop: '20px' } // Adjust the padding as needed
                                                           }}
                                                           style={{width: "100%"}} type='date' value={
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
                                                            control={<Radio/>}
                                                            label='Male'
                                                        />
                                                        <FormControlLabel
                                                            disabled={
                                                                modifiedStatus ? false : true
                                                            }
                                                            value='F'
                                                            control={<Radio/>}
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
                                                    sx={{width: "50%", padding: "10px"}}
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
                                        style={{padding: "0 120px"}}
                                    >
                                        <TextField
                                            error={
                                                errorNewPassword.length > 0 ? true : false
                                            }
                                            helperText={errorNewPassword} required={true} fullWidth type='password'
                                            label='New Password'
                                            placeholder='Enter new password' value={newPassword}
                                            InputProps={{
                                                style: { paddingTop: '20px' } // Adjust the padding as needed
                                            }}
                                            onChange={handlePasswordChange}
                                            onBlur={(e) => {
                                                checkPassword(setErrorNewPassword, e.target.value);
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
                                            InputProps={{
                                                style: { paddingTop: '20px' } // Adjust the padding as needed
                                            }}
                                            value={repeatPassword}
                                            onChange={handleRepeatPasswordChange}
                                            onBlur={(e) => {
                                                checkRepeatPassword(
                                                    setErrorRepeatPassword,
                                                    e.target.value,
                                                    newPassword
                                                );
                                            }}
                                            className='input-field tabb1'
                                        />
                                        <div className='text-center my-3'>
                                            <Button
                                                fullWidth
                                                variant='outlined'
                                                type='submit'
                                                sx={{width: "50%", padding: "10px"}}>Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                </TabPanel>
                                <TabPanel value='4'>

                                    <form onSubmit={handleRegisterShop}>
                                        <TextField label="Shop Name" value={shopName}
                                                   onChange={(e) => setShopName(e.target.value)}
                                                   required fullWidth
                                                   InputProps={{
                                                       style: { paddingTop: '20px' } // Adjust the padding as needed
                                                   }}
                                        />
                                        <TextField
                                            label="Shop Address"
                                            value={shopAddress}
                                            onChange={(e) => setShopAddress(e.target.value)}
                                            required fullWidth
                                            InputProps={{
                                                style: { paddingTop: '20px' } // Adjust the padding as needed
                                            }}
                                        />
                                        <TextField
                                            label="Contact Number"
                                            value={shopContact}
                                            onChange={(e) => setShopContact(e.target.value)}
                                            required fullWidth
                                            InputProps={{
                                                style: { paddingTop: '20px' } // Adjust the padding as needed
                                            }}
                                        />
                                        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                                        <div className='text-center my-3'>
                                            <Button
                                                fullWidth variant='outlined'
                                                type='submit' sx={{width: "50%", padding: "10px"}}>
                                                Register Now
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
