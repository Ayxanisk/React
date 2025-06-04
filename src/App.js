import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { 
    ThemeProvider, 
    CssBaseline, 
    AppBar,
    Toolbar,
    Box,
    Container,
    Typography,
    Grid,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
    Chip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { 
    Menu as MenuIcon,
    Send as SendIcon,
    School as SchoolIcon,
    People as PeopleIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import Support from './components/Support';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import { getAvatar } from './components/indexedDBUtils';
import theme from './theme';
import './components/style/App.css';
import LoginPage from './components/LoginPage';

/**
 * Main App component
 * @returns {JSX.Element} The App component
 */
const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    // Меню
    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    // Загрузка из localStorage при старте
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedEmail = localStorage.getItem('email');

        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        } else if (savedEmail) {
            setEmail(savedEmail);
            setUser({ email: savedEmail });
            setIsLoggedIn(true);
        }
    }, []);

    // Загрузка аватара, если есть email
    useEffect(() => {
        if (user?.email) {
            getAvatar(user.email).then(setAvatar);
        }
    }, [user]);

    // Авторизация через email/password
    const handleLogin = useCallback((e) => {
        e.preventDefault();
        if (email && password) {
            setUser({ email });
            setIsLoggedIn(true);
            localStorage.setItem('email', email);
        } else {
            alert('Please fill in all fields');
        }
    }, [email, password]);

    // Регистрация (аналогично логину пока без API)
    const handleRegister = useCallback((e) => {
        e.preventDefault();
        if (email && password) {
            setUser({ email });
            setIsLoggedIn(true);
            localStorage.setItem('email', email);
        } else {
            alert('Please fill in all fields');
        }
    }, [email, password]);

    // Авторизация через Google
    const handleGoogleSuccess = useCallback((credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);

            // Проверка допустимых доменов (опционально)
            const validDomains = [
                'react-zeta-liard.vercel.app',
                'react-git-main-ayxans-projects-e9372316.vercel.app',
            ];

            const tokenDomain = decoded.hd || new URL(decoded.email.split('@')[1]).hostname;

            if (!validDomains.includes(tokenDomain)) {
                throw new Error('Unauthorized domain');
            }

            setUser(decoded);
            setIsLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(decoded));
        } catch (err) {
            console.error('Google authentication error:', err);
            alert(`Authentication failed: ${err.message}`);
        }
    }, []);


    // Home page component
    const HomePage = () => (
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
                            src={avatar || 'https://cdn-icons-png.flaticon.com/128/1144/1144709.png'} 
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

            {/* Hero section */}
            <Box 
                sx={{ 
                    bgcolor: '#FFF6EB',
                    py: { xs: 4, md: 6 },
                    px: { xs: 2, md: 5 }
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{ animation: 'fadeIn 0.8s ease-out' }}>
                                <Typography variant="h2" component="h1" gutterBottom sx={{ 
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                    fontWeight: 700,
                                    mb: 3
                                }}>
                                    Welcome {user?.name || email || 'User'}!
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    color: 'text.secondary',
                                    mb: 3
                                }}>
                                    Connect in real time with the most effective peer-to-peer texting
                                    tool for higher education
                                </Typography>

                                <Box 
                                    component="form" 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        gap: 1,
                                        mb: 4
                                    }}
                                >
                                    <TextField
                                        variant="outlined"
                                        placeholder="Type your email"
                                        type="email"
                                        size="small"
                                        fullWidth
                                        sx={{ 
                                            maxWidth: { sm: 300 },
                                            bgcolor: 'background.paper'
                                        }}
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        type="submit"
                                        endIcon={<SendIcon />}
                                    >
                                        Submit
                                    </Button>
                                </Box>

                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        gap: { xs: 2, sm: 3 },
                                        mt: 2
                                    }}
                                >
                                    {[
                                        '14k+ Total Courses',
                                        '700+ Expert Mentors',
                                        '8k+ Students Globally'
                                    ].map((stat, index) => (
                                        <Chip 
                                            key={index}
                                            label={stat}
                                            sx={{ 
                                                fontWeight: 600,
                                                py: 1.5,
                                                px: 1,
                                                bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                border: '1px solid rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                            <Box 
                                sx={{ 
                                    animation: 'fadeIn 0.8s ease-out 0.2s both',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box 
                                    component="img"
                                    src="/image-from-rawpixel-id-12137309-png.png"
                                    alt="Hero"
                                    sx={{ 
                                        maxWidth: '100%',
                                        height: 'auto',
                                        maxHeight: { xs: 300, sm: 400, md: 500 },
                                        borderRadius: '50% 50% 0 0',
                                        bgcolor: '#ffd770',
                                        p: { xs: 2, md: 3 },
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)'
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Brand logos section */}
            <Box 
                sx={{ 
                    bgcolor: '#F5F2F0',
                    py: { xs: 3, md: 4 },
                    px: 2
                }}
            >
                <Container maxWidth="lg">
                    <Grid 
                        container 
                        spacing={2} 
                        justifyContent="space-around" 
                        alignItems="center"
                    >
                        {['Sprint', 'Google', 'Gillette', 'Forbes', 'Etsy'].map((brand, index) => (
                            <Grid 
                                item 
                                key={index} 
                                xs={6} 
                                sm={4} 
                                md={2} 
                                sx={{ 
                                    textAlign: 'center',
                                    typography: 'h6',
                                    color: '#888',
                                    fontWeight: brand === 'Gillette' ? 700 : 500
                                }}
                            >
                                {brand}
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Education section */}
            <Box 
                sx={{ 
                    py: { xs: 5, md: 8 },
                    px: 2
                }}
            >
                <Container maxWidth="lg">
                    <Typography 
                        variant="h3" 
                        component="h2" 
                        align="center" 
                        gutterBottom
                        sx={{ 
                            mb: { xs: 4, md: 6 },
                            fontWeight: 600,
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                        }}
                    >
                        Empowering Modern Day Education
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {[
                            {
                                title: 'Teachers',
                                icon: <PeopleIcon fontSize="large" />,
                                description: 'Bring the power of the digital age into your classroom. Enable your students to make innovative school projects.',
                                color: '#ECEBFF'
                            },
                            {
                                title: 'Students',
                                icon: <SchoolIcon fontSize="large" />,
                                description: 'Get bold and creative with your school assignments. Flipstack allows you to unleash your imagination in the easiest possible way.',
                                color: '#FFF5CF'
                            },
                            {
                                title: 'Schools',
                                icon: <BusinessIcon fontSize="large" />,
                                description: 'Publish appealing school prospectus, handbooks and admission guides to inform students, teachers, applicants and parents.',
                                color: '#FFE4E1'
                            }
                        ].map((card, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card 
                                    elevation={3} 
                                    sx={{ 
                                        height: '100%',
                                        bgcolor: card.color,
                                        borderRadius: 3,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                {card.icon}
                                            </Avatar>
                                            <Typography variant="h5" component="h3" fontWeight={600}>
                                                {card.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ mb: 2 }}>
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ px: 3, pb: 3 }}>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            sx={{ borderRadius: 2 }}
                                        >
                                            See more
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

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


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={isLoggedIn ? <HomePage /> : <LoginPage
                                isRegistering={isRegistering}
                                setIsRegistering={setIsRegistering}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                handleRegister={handleRegister}
                                handleGoogleSuccess={handleGoogleSuccess}
                                isSmall={isSmall}
                            />}
                        />
                        <Route path="/support" element={<Support avatar={avatar}/>}/>
                        <Route path="/about" element={<AboutUs avatar={avatar}/>}/>
                        <Route
                            path="/profile"
                            element={<Profile user={user} setIsLoggedIn={setIsLoggedIn} avatar={avatar} setAvatar={setAvatar}/>}
                        />
                    </Routes>
                </Router>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
};

export default App;
