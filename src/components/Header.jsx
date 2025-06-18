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
    ListItemText,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from './LanguageContext';
import translations from '../locales/translations';

const Header = ({ isMobile, toggleMenu, avatar, setIsLoggedIn, themeMode, toggleTheme }) => {
    const { language, changeLanguage } = useLanguage();
    const t = translations[language] || translations.en;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const languageOpen = Boolean(languageAnchorEl);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageMenuOpen = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageAnchorEl(null);
    };

    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
        handleLanguageMenuClose();
    };

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate('/');
        handleMenuClose();
    }, [setIsLoggedIn, navigate]);

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
                            style={{ color: theme.palette.text.primary }}
                        >
                            {t.home}
                        </NavLink>
                        <NavLink
                            to="/support"
                            className="nav-link"
                            style={{ color: theme.palette.text.primary }}
                        >
                            {t.supportTitle}
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="nav-link"
                            style={{ color: theme.palette.text.primary }}
                        >
                            {t.aboutTitle}
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
                                <Typography variant="body1" fontWeight={500}>
                                    {t.profile.settings || "Profile"}
                                </Typography>
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
                                <Typography variant="body1" fontWeight={500}>
                                    {t.profile.settings || "Settings"}
                                </Typography>
                            </ListItemText>
                        </MenuItem>

                        <MenuItem
                            onClick={handleLanguageMenuOpen}
                            sx={{
                                py: 1.5,
                                px: 2.5,
                                ...menuItemStyle
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <LanguageIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" fontWeight={500}>
                                    {t.language || "Language"}
                                </Typography>
                            </ListItemText>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <ArrowForwardIosIcon fontSize="small" />
                            </ListItemIcon>
                        </MenuItem>

                        <Menu
                            anchorEl={languageAnchorEl}
                            open={languageOpen}
                            onClose={handleLanguageMenuClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            PaperProps={{
                                style: {
                                    width: '200px',
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'
                                }
                            }}
                        >
                            {[
                                { code: 'az', name: 'Azerbaijan' },
                                { code: 'ru', name: 'Russia' },
                                { code: 'en', name: 'English' }
                            ].map((lang) => (
                                <MenuItem
                                    key={lang.code}
                                    selected={language === lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(25, 118, 210, 0.12)'
                                            }
                                        }
                                    }}
                                >
                                    <Typography variant="body1">{lang.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

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
                                    {t.logout || "Logout"}
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