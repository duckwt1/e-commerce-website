import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import {getAvatarByToken, getEmailByToken, getNameByToken, getRoleByToken, logout} from "../../utils/JwtService";
import { useCartItem } from "../../utils/CartItemContext";
import UserModel from "../../../model/UserModel";
import {endpointBE} from "../../utils/Constant";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(getAvatarByToken());
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { isLoggedIn, setLoggedIn } = useAuth();
    const { setTotalCart, setCartList } = useCartItem();

    // Cập nhật avatarUrl khi token thay đổi
    useEffect(() => {
        const updateAvatar = () => {
            const newAvatarUrl = getAvatarByToken();
            setAvatarUrl(newAvatarUrl);
        };

        updateAvatar(); // Cập nhật ngay khi component được mount

        // Lắng nghe sự thay đổi avatar trong hệ thống
        const intervalId = setInterval(() => {
            updateAvatar();
        }, 1000); // Mỗi giây kiểm tra nếu avatar thay đổi

        return () => {
            clearInterval(intervalId); // Dọn dẹp khi component unmount
        };
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setTotalCart(0);
        setCartList([]);
        navigate('/login');
    };
    const [previewAvatar, setPreviewAvatar] = useState<string>("");
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


    return (
        <>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar
                    style={{ fontSize: "14px" }}
                    alt={getNameByToken()?.toUpperCase()}
                    src={user.avatar}
                    sx={{ width: 30, height: 30 }}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleClose()}>
                    <Link to="/profile" className='dropdown-item'>
                        Personal information
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => handleClose()}>
                    <Link to="/my-favorite-books" className='dropdown-item'>
                        Wishlist
                    </Link>
                </MenuItem>
                {(getRoleByToken() === "ROLE_SELLER" || getRoleByToken() === "ROLE_MANAGER") && (
                    <MenuItem onClick={() => handleClose()}>
                        <Link to="/admin/dashboard" className='dropdown-item'>
                            Management
                        </Link>
                    </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
