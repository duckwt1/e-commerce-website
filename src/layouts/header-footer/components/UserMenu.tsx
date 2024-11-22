import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { isLoggedIn, user, setLoggedIn } = useAuth();

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

    const handleMenuItemClick = (path: string) => {
        navigate(path);
        handleClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/login');
    };

    return (
        <div>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                {isLoggedIn && user ? (
                    <Avatar alt={user.name} src={user.avatarUrl} />
                ) : (
                    <AccountCircle />
                )}
            </IconButton>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleMenuItemClick('/profile?tab=1')}>View Profile</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/profile?tab=2')}>Edit Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
