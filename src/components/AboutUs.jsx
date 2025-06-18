import React, { useState, useCallback } from 'react'; // Исправленный импорт
import { NavLink } from 'react-router-dom';
import {
    Typography,
    Container,
    Grid,
    Box,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
    Card,
    CardContent,
    Button,
    useMediaQuery,
    useTheme,
    Divider
} from '@mui/material';
import {
    Instagram as InstagramIcon,
    Telegram as TelegramIcon,
    WhatsApp as WhatsAppIcon,
    School as SchoolIcon,
    ContactMail as ContactMailIcon
} from '@mui/icons-material';
import Header from "./Header";
import { useLanguage } from './LanguageContext';
import translations from '../locales/translations'; // Исправленный путь

// Остальной код без изменений...

const AboutUs = ({ avatar, themeMode, toggleTheme }) => {
    const { language } = useLanguage();
    const t = translations[language]?.about || translations.en.about;
    const theme = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header
                avatar={avatar}
                toggleMenu={toggleMenu}
                isMobile={isMobile}
                themeMode={themeMode}
                toggleTheme={toggleTheme}
            />

            <Drawer
                anchor="left"
                open={menuOpen}
                onClose={closeMenu}
            >
                <Box sx={{ width: 250 }} role="presentation" onClick={closeMenu}>
                    <List>
                        <ListItem button component={NavLink} to="/">
                            <ListItemText primary={translations[language]?.home || "Home"} />
                        </ListItem>
                        <ListItem button component={NavLink} to="/support">
                            <ListItemText primary={translations[language]?.supportTitle || "Support"} />
                        </ListItem>
                        <ListItem button component={NavLink} to="/about">
                            <ListItemText primary={translations[language]?.aboutTitle || "About Us"} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* About intro section */}
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.background.default,
                    py: { xs: 4, md: 8 },
                    px: { xs: 2, md: 5 },
                    borderRadius: 0
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Box sx={{ animation: 'fadeIn 0.8s ease-out' }}>
                                <Typography variant="h2" component="h1" gutterBottom sx={{
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                    fontWeight: 700,
                                    mb: 3
                                }}>
                                    {t.title}
                                </Typography>
                                <Typography variant="body1" sx={{
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    color: theme.palette.text.primary,
                                    maxWidth: '600px'
                                }}>
                                    {t.description}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <Box sx={{
                                animation: 'fadeIn 0.8s ease-out 0.2s both',
                                display: 'flex',
                                justifyContent: { xs: 'center', md: 'flex-end' }
                            }}>
                                <Avatar
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    alt={t.imageAlt || "About our platform"}
                                    sx={{
                                        width: { xs: 200, sm: 250, md: 320 },
                                        height: { xs: 200, sm: 250, md: 320 },
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            {/* Contact section */}
            <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
                <Box textAlign="center" mb={5}>
                    <ContactMailIcon sx={{
                        fontSize: 40,
                        color: theme.palette.text.primary,
                        mb: 2
                    }} />
                    <Typography variant="h3" component="h2" gutterBottom sx={{
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        fontWeight: 600
                    }}>
                        {t.contactTitle}
                    </Typography>
                </Box>

                <Grid container spacing={3} justifyContent="center">
                    {t.contactMethods.map((method, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 3
                                }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: method.color || theme.palette.primary.main,
                                            width: 60,
                                            height: 60,
                                            mb: 1
                                        }}
                                    >
                                        {method.icon === 'instagram' && <InstagramIcon />}
                                        {method.icon === 'telegram' && <TelegramIcon />}
                                        {method.icon === 'whatsapp' && <WhatsAppIcon />}
                                    </Avatar>
                                    <Typography variant="h6" component="div">
                                        {method.text}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        href={method.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ mt: 'auto' }}
                                    >
                                        {t.connectButton}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Mission section */}
            <Paper elevation={0} sx={{
                backgroundColor: theme.palette.background.default,
                py: { xs: 5, md: 8 },
                px: { xs: 2, md: 0 }
            }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={5}>
                        <SchoolIcon sx={{
                            fontSize: 40,
                            color: theme.palette.text.primary,
                            mb: 2
                        }} />
                        <Typography variant="h3" component="h2" gutterBottom sx={{
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            fontWeight: 600
                        }}>
                            {t.missionTitle}
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        textAlign: 'center',
                        maxWidth: '800px',
                        mx: 'auto',
                        mb: 4
                    }}>
                        {t.missionDescription}
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {t.values.map((value, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        borderRadius: 2,
                                        bgcolor: theme.palette.background.paper,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        height: '100%',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)'
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        gutterBottom
                                        color="primary.main"
                                        fontWeight={600}
                                    >
                                        {value.title}
                                    </Typography>
                                    <Divider sx={{ my: 2, width: '30%', mx: 'auto' }} />
                                    <Typography>
                                        {value.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Paper>

            {/* Footer */}
            <Box component="footer" sx={{
                py: 3,
                textAlign: 'center',
                backgroundColor: theme.palette.background.default,
                mt: 'auto'
            }}>
                <Container>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        &copy; 2025 Education Inc. All rights reserved.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t.contactEmail || "Contact us: support@education.com"}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default AboutUs;