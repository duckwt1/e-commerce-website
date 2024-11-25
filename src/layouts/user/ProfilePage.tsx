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
import {getEmailByToken, getIdUserByToken} from "../utils/JwtService";
import UserModel from "../../model/UserModel";
import {endpointBE} from "../utils/Constant";
import {toast} from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {useAuth} from "../utils/AuthContext";
import {useNavigate} from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";
import {jwtDecode} from "jwt-decode";
import FavoriteProductsList from "../products/FavoriteProductsList";
import {OrderForm} from "../../admin/components/order/OrderForm";

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
        email: "",
        firstname: "",
        lastname: "",
        gender: "",
        password: "",
        phoneNumber: "",
        name: "",
        avatar: "",
    });
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [dataAvatar, setDataAvatar] = useState<File | null>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string>("");


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
                                        <Tab label='Orders' value='2'/>
                                        <Tab label='Change Password' value='3'/>
                                        <Tab label='Whishlist' value='4'/>
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="form position-relative"
                                        style={{ padding: "0 20px" }}
                                    >
                                        {!modifiedStatus && (
                                            <div
                                                className="text-end my-3 position-absolute"
                                                style={{
                                                    bottom: "0",
                                                    right: "0",
                                                }}
                                            >
                                                <Tooltip title="Edit Information" placement="top-end">
                                                    <Button
                                                        variant="contained"
                                                        type="button"
                                                        className="rounded-pill"
                                                        onClick={() => setModifiedStatus(!modifiedStatus)}
                                                        style={{ position: "absolute", top: "-340px", right: "10px" }}
                                                    >
                                                        <EditOutlined sx={{ width: "24px" }} />
                                                    </Button>
                                                </Tooltip>

                                            </div>
                                        )}
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-4">
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>ID</label>
                                                    <input
                                                        type="text"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.idUser}
                                                        disabled={true}
                                                        className="input-field form-control mb-4"
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>First Name</label>
                                                    <input
                                                        type="text"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.firstname}
                                                        onChange={(e) =>
                                                            setUser({
                                                                ...user,
                                                                firstname: e.target.value,
                                                            })
                                                        }
                                                        disabled={!modifiedStatus}
                                                        className="input-field form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>Phone Number</label>
                                                    <input
                                                        type="text"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.phoneNumber}
                                                        onChange={handlePhoneNumberChange}
                                                        onBlur={(e) => {
                                                            checkPhoneNumber(setErrorPhoneNumber, e.target.value);
                                                        }}
                                                        disabled={!modifiedStatus}
                                                        className="input-field form-control"
                                                        placeholder="Enter phone number"
                                                    />
                                                    {errorPhoneNumber && (
                                                        <div className="text-danger">{errorPhoneNumber}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-4">
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>Username</label>
                                                    <input
                                                        type="text"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.name}
                                                        disabled={true}
                                                        className="input-field form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>Last Name</label>
                                                    <input
                                                        type="text"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.lastname}
                                                        onChange={(e) =>
                                                            setUser({
                                                                ...user,
                                                                lastname: e.target.value,
                                                            })
                                                        }
                                                        disabled={!modifiedStatus}
                                                        className="input-field form-control"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>Address</label>
                                                    <input
                                                        type="text"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.address}
                                                        onChange={(e) =>
                                                            setUser({
                                                                ...user,
                                                                address: e.target.value,
                                                            })
                                                        }
                                                        disabled={!modifiedStatus}
                                                        className="input-field form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-4">
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>Email</label>
                                                    <input
                                                        type="email"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.email}
                                                        className="input-field form-control"
                                                        disabled={true}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{textAlign:"start", fontWeight:"bold", fontSize:"15px", color:"red"}}>Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        style={{ background: "transparent", marginBottom: "10px" }}
                                                        required
                                                        value={user.birthDate.toISOString().split("T")[0]}
                                                        onChange={handleDateChange}
                                                        disabled={!modifiedStatus}
                                                        className="input-field form-control"
                                                />
                                                </div>
                                                <FormControl>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                                        Gender
                                                    </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        value={user.gender}
                                                        onChange={(e) =>
                                                            setUser({
                                                                ...user,
                                                                gender: e.target.value,
                                                            })
                                                        }
                                                    >
                                                        <FormControlLabel
                                                            disabled={!modifiedStatus}
                                                            value="M"
                                                            control={<Radio />}
                                                            label="Male"
                                                        />
                                                        <FormControlLabel
                                                            disabled={!modifiedStatus}
                                                            value="F"
                                                            control={<Radio />}
                                                            label="Female"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                        {modifiedStatus && (
                                            <div className="text-center my-3">
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    type="submit"
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
                                        <OrderForm
                                        	id={id}
                                        	setKeyCountReload={setKeyCountReload}
                                        	handleCloseModal={handleCloseModal}
                                        	option='view-customer'
                                        />
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
                                                sx={{width: "50%", padding: "10px"}}
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                </TabPanel>


                                <TabPanel value='4'>
                                    <div>
                                        <FavoriteProductsList />
                                    </div>
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
