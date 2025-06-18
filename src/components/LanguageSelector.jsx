import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLanguage } from './LanguageContext';

const LanguageSelector = ({ closeMenu }) => {
    const { language, changeLanguage } = useLanguage();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
        handleClose();
        closeMenu();
    };

    const languages = [
        { code: 'az', name: 'Azerbaijan' },
        { code: 'ru', name: 'Russia' },
        { code: 'en', name: 'English' }
    ];

    return (
        <Box>
            <MenuItem
                onClick={handleClick}
                sx={{
                    py: 1.5,
                    px: 2.5,
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
            >
                <ListItemIcon sx={{ minWidth: 40 }}>
                    <LanguageIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                    <Typography variant="body1" fontWeight={500}>
                        Language
                    </Typography>
                </ListItemText>
                <ListItemIcon sx={{ minWidth: 40 }}>
                    <ArrowForwardIosIcon fontSize="small" />
                </ListItemIcon>
            </MenuItem>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
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
                {languages.map((lang) => (
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
        </Box>
    );
};

export default LanguageSelector;