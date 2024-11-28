import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { getAvatarByToken, getNameByToken, getRoleByToken, logout } from "../../utils/JwtService";
import { useCartItem } from "../../utils/CartItemContext";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { isLoggedIn, setLoggedIn } = useAuth();
    const { setTotalCart, setCartList } = useCartItem();

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

    return (
        <>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar
                    style={{ fontSize: "14px" }}
                    alt={getNameByToken()?.toUpperCase()}
                    src={getAvatarByToken()}
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
