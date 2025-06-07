import React, {useCallback, useEffect, useState} from 'react';
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
    ListItemText,
    useTheme // Добавляем хук для доступа к теме
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode'; // Добавляем иконку светлой темы
import ThemeToggle from "./ThemeToggle";

const Header = ({ isMobile, toggleMenu, avatar, setIsLoggedIn, themeMode, toggleTheme }) => {
    const theme = useTheme(); // Получаем текущую тему
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

    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark'; // По умолчанию темная тема
    });

    useEffect(() => {
        document.body.className = currentTheme === 'dark' ? 'dark-theme' : '';
        document.body.style.backgroundColor = currentTheme === 'dark' ? '#121212' : '';
    }, [currentTheme]);
    useCallback(() => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.className = newTheme === 'dark' ? 'dark-theme' : '';
        document.body.style.backgroundColor = newTheme === 'dark' ? '#121212' : '';
    }, [currentTheme]);
// Стили для темной темы
    const menuPaperStyle = {
        backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#ffffff',
        color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'inherit',
        '&:before': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#ffffff'
        }
    };

    const avatarStyle = {
        border: `2px solid ${theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'}`,
        backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#f0f0f0'
    };

    const menuItemStyle = {
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#f5f5f5'
        }
    };

    return (
        <AppBar position="static" elevation={1} sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
        }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Link to="/">
                        <img
                            src="/84c22203-25aa-4e04-9930-5243dc2d3c2d.png"
                            width={isMobile ? "120" : "166"}
                            height={isMobile ? "72" : "100"}
                            alt="Logo"
                            style={{
                                marginRight: '20px',
                                filter: theme.palette.mode === 'dark' ? 'brightness(4) contrast(3.2)' : 'none'
                            }}
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
                        <NavLink
                            to="/"
                            className="nav-link"
                            style={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333' }}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/support"
                            className="nav-link"
                            style={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333' }}
                        >
                            Support
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="nav-link"
                            style={{ color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333' }}
                        >
                            About Us
                        </NavLink>
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
                            ...avatarStyle,
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
                                ...menuPaperStyle,
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 12,
                                    height: 12,
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
                            sx={{
                                py: 1.5,
                                px: 2.5,
                                ...menuItemStyle
                            }}
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
                            sx={{
                                py: 1.5,
                                px: 2.5,
                                ...menuItemStyle
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" fontWeight={500}>Settings</Typography>
                            </ListItemText>
                        </MenuItem>

                        <MenuItem
                            sx={{
                                py: 1.5,
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {themeMode === 'dark' ?
                                    <LightModeIcon fontSize="small" /> :
                                    <DarkModeIcon fontSize="small" />
                                }
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" fontWeight={500}>
                                    {themeMode === 'dark' ? 'Light theme' : 'Dark theme'}
                                </Typography>
                            </ListItemText>
                            <ThemeToggle
                                theme={themeMode}
                                onToggle={toggleTheme}
                            />
                        </MenuItem>

                        <Divider sx={{
                            my: 0.5,
                            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'
                        }} />

                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                py: 1.5,
                                px: 2.5,
                                ...menuItemStyle,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 0, 0, 0.1)'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <ExitToAppIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" fontWeight={500} color="error">
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