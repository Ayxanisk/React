import React, {useCallback, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    Divider,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = ({ isMobile, toggleMenu, avatar,setIsLoggedIn }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate('/');
    }, [setIsLoggedIn, navigate]);

    return (
        <AppBar position="static" color="transparent" elevation={1} sx={{ backgroundColor: '#f5f5f5' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Link to="/">
                        <img
                            src="/84c22203-25aa-4e04-9930-5243dc2d3c2d.png"
                            width={isMobile ? "120" : "166"}
                            height={isMobile ? "72" : "100"}
                            alt="Logo"
                            style={{ marginRight: '20px' }}
                        />
                    </Link>
                </Box>

                {isMobile && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleMenu}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/support" className="nav-link">Support</NavLink>
                        <NavLink to="/about" className="nav-link">About Us</NavLink>
                    </Box>
                )}

                <Box sx={{ ml: 2, position: 'relative' }}>
                    <Avatar
                        src={avatar || 'https://cdn-icons-png.flaticon.com/128/1144/1144709.png'}
                        alt="User"
                        sx={{
                            width: 42,
                            height: 42,
                            cursor: 'pointer',
                            border: '2px solid #e0e0e0',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                                transform: 'scale(1.05)'
                            }
                        }}
                        onClick={handleMenuOpen}
                    />

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            sx: {
                                width: 240,
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                marginTop: '12px',
                                overflow: 'visible',
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 12,
                                    height: 12,
                                    backgroundColor: 'white',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                }
                            }
                        }}
                    >
                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            to="/profile"
                            sx={{ py: 1.5, px: 2.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" fontWeight={500}>Profile</Typography>
                            </ListItemText>
                        </MenuItem>

                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            to="/settings"
                            sx={{ py: 1.5, px: 2.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" fontWeight={500}>Settings</Typography>
                            </ListItemText>
                        </MenuItem>

                        <Divider sx={{ my: 0.5 }} />

                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                py: 1.5,
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 0, 0, 0.05)'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <ExitToAppIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" fontWeight={500} color="error"  onClick={handleLogout}>
                                    Logout
                                </Typography>
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;