import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style/AboutUs.css';
import './style/App.css';

// Material UI imports
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Box, 
  Avatar, 
  IconButton, 
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
  Menu as MenuIcon, 
  Instagram as InstagramIcon,
  Telegram as TelegramIcon,
  WhatsApp as WhatsAppIcon,
  School as SchoolIcon,
  ContactMail as ContactMailIcon
} from '@mui/icons-material';

/**
 * AboutUs component with improved design using Material UI
 * @param {Object} props - Component props
 * @param {string} props.avatar - User avatar URL
 * @returns {JSX.Element} The AboutUs component
 */
const AboutUs = ({ avatar }) => {
    // Use provided avatar or fallback to default
    const avatarSrc = avatar || "https://cdn-icons-png.flaticon.com/128/1144/1144709.png";
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Toggle mobile menu
    const toggleMenu = useCallback(() => setMenuOpen(!menuOpen), [menuOpen]);

    // Close mobile menu
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header with Material UI AppBar */}
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

                    {/* Mobile menu button */}
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

                    {/* Desktop navigation */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to="/support" className="nav-link">Support</NavLink>
                            <NavLink to="/about" className="nav-link">About Us</NavLink>
                        </Box>
                    )}

                    {/* Profile avatar */}
                    <Link to="/profile">
                        <Avatar 
                            src={avatarSrc} 
                            alt="User" 
                            sx={{ 
                                width: 48, 
                                height: 48, 
                                cursor: 'pointer',
                                ml: 2,
                                border: '2px solid white',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }} 
                        />
                    </Link>
                </Toolbar>
            </AppBar>

            {/* Mobile navigation drawer */}
            <Drawer
                anchor="left"
                open={menuOpen}
                onClose={closeMenu}
            >
                <Box sx={{ width: 250 }} role="presentation" onClick={closeMenu}>
                    <List>
                        <ListItem button component={NavLink} to="/">
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/support">
                            <ListItemText primary="Support" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/about">
                            <ListItemText primary="About Us" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* About intro section */}
            <Paper 
                elevation={0} 
                sx={{ 
                    backgroundColor: '#e8f0fe', 
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
                                    About Our Platform
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    color: 'text.secondary',
                                    maxWidth: '600px'
                                }}>
                                    We are committed to providing high-quality educational content and support to
                                    learners around the world. Our mission is to make education accessible,
                                    engaging, and effective for everyone.
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
                                    alt="About"
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
                    <ContactMailIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" component="h2" gutterBottom sx={{ 
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        fontWeight: 600
                    }}>
                        Contact Us
                    </Typography>
                </Box>

                <Grid container spacing={3} justifyContent="center">
                    {[
                        { 
                            icon: <InstagramIcon fontSize="large" />, 
                            text: '@education_platform', 
                            link: 'https://instagram.com',
                            color: '#E1306C'
                        },
                        { 
                            icon: <TelegramIcon fontSize="large" />, 
                            text: 't.me/education_platform', 
                            link: 'https://t.me/education_platform',
                            color: '#0088cc'
                        },
                        { 
                            icon: <WhatsAppIcon fontSize="large" />, 
                            text: '+1 (234) 567-890', 
                            link: 'https://wa.me/1234567890',
                            color: '#25D366'
                        }
                    ].map((item, index) => (
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
                                            bgcolor: item.color, 
                                            width: 60, 
                                            height: 60,
                                            mb: 1
                                        }}
                                    >
                                        {item.icon}
                                    </Avatar>
                                    <Typography variant="h6" component="div">
                                        {item.text}
                                    </Typography>
                                    <Button 
                                        variant="outlined" 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        sx={{ mt: 'auto' }}
                                    >
                                        Connect
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Mission section */}
            <Paper elevation={0} sx={{ backgroundColor: '#f5f7fa', py: { xs: 5, md: 8 }, px: { xs: 2, md: 0 } }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={5}>
                        <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h3" component="h2" gutterBottom sx={{ 
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            fontWeight: 600
                        }}>
                            Our Mission
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ 
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        textAlign: 'center',
                        maxWidth: '800px',
                        mx: 'auto',
                        mb: 4
                    }}>
                        Our platform is built on the belief that quality education should be accessible to everyone. 
                        We strive to create an environment where students can learn at their own pace, 
                        connect with expert mentors, and develop the skills they need to succeed.
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {['Innovation', 'Accessibility', 'Quality'].map((value, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Box 
                                    sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        height: '100%',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)'
                                        }
                                    }}
                                >
                                    <Typography variant="h5" component="h3" gutterBottom color="primary.main" fontWeight={600}>
                                        {value}
                                    </Typography>
                                    <Divider sx={{ my: 2, width: '30%', mx: 'auto' }} />
                                    <Typography>
                                        {index === 0 && "We constantly innovate our platform to provide cutting-edge learning tools."}
                                        {index === 1 && "We ensure our educational resources are accessible to learners of all backgrounds."}
                                        {index === 2 && "We maintain the highest standards of quality in all our educational content."}
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
                backgroundColor: '#f5f5f5',
                mt: 'auto'
            }}>
                <Container>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        &copy; 2025 Education Inc. All rights reserved.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Contact us: support@education.com
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default AboutUs;
