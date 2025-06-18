import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {
    ThemeProvider,
    CssBaseline,
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
    Drawer,
    List,
    ListItem,
    ListItemText,
    Chip,
    useMediaQuery
} from '@mui/material';
import {
    Send as SendIcon,
    School as SchoolIcon,
    People as PeopleIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import Support from './components/Support';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import {getAvatar} from './components/indexedDBUtils';
import './components/style/App.css';
import LoginPage from './components/LoginPage';
import {getUserCredentials, saveUserCredentials} from './components/indexedDBUtils';
import SettingsPage from './components/SettingsPage';
import Header from "./components/Header";
import getTheme from "./theme";
import {LanguageProvider, useLanguage} from "./components/LanguageContext";
import translations from './locales/translations';
import {jwtDecode} from "jwt-decode";

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
    const [themeMode, setThemeMode] = useState('light');

    const theme = useMemo(() => getTheme(themeMode), [themeMode]);

    const toggleTheme = useCallback(() => {
        const newMode = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newMode);
        localStorage.setItem('theme', newMode);
    }, [themeMode]);

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    // Load user data from localStorage on startup
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedEmail = localStorage.getItem('email');

        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        } else if (savedEmail) {
            setEmail(savedEmail);
            setUser({email: savedEmail});
            setIsLoggedIn(true);
        }
    }, []);

    const updateUserName = (newName) => {
        setUser(prevUser => ({
            ...prevUser,
            name: newName
        }));
        localStorage.setItem('user', JSON.stringify({
            ...user,
            name: newName
        }));
    };

    useEffect(() => {
        if (user?.email) {
            getAvatar(user.email).then(setAvatar);
        }
    }, [user]);

    // Email/password login
    const handleLogin = useCallback(async (e) => {
        e.preventDefault();

        try {
            const storedUser = await getUserCredentials(email);
            if (storedUser && storedUser.password === password) {
                setUser(storedUser);
                setIsLoggedIn(true);
                localStorage.setItem('email', email);
            } else {
                alert('Incorrect email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login error');
        }
    }, [email, password]);

    // Registration
    const handleRegister = useCallback(async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        try {
            if (!email || !password) {
                alert('Please enter email and password');
                return;
            }

            if (!passwordRegex.test(password)) {
                alert('Password must contain at least 8 characters, including uppercase, lowercase letters, numbers and special characters');
                return;
            }

            const existingUser = await getUserCredentials(email);
            if (existingUser) {
                alert('User with this email is already registered');
                return;
            }

            await saveUserCredentials(email, password);
            const userData = {email, password};
            setUser(userData);
            setIsLoggedIn(true);
            localStorage.setItem('email', email);
        } catch (error) {
            console.error('Register error:', error);
            alert('Registration error');
        }
    }, [email, password]);

    // Google auth
    const handleGoogleSuccess = useCallback((credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            setUser(decoded);
            setIsLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(decoded));
        } catch (err) {
            console.error('Google login error:', err);
            alert('Failed to log in via Google');
        }
    }, []);

    // HomePage component
    const HomePage = ({user, email, themeMode, toggleTheme}) => {
        const { language } = useLanguage();
        const t = translations[language] || translations.en;

        return (
            <Box sx={{flexGrow: 1}}>
                <Header
                    avatar={avatar}
                    toggleMenu={toggleMenu}
                    isMobile={isMobile}
                    setIsLoggedIn={setIsLoggedIn}
                    themeMode={themeMode}
                    toggleTheme={toggleTheme}
                />


                {/* Hero section */}
                <Box
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        py: {xs: 4, md: 6},
                        px: {xs: 2, md: 5}
                    }}
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Box sx={{animation: 'fadeIn 0.8s ease-out'}}>
                                    <Typography
                                        variant="h2"
                                        component="h1"
                                        gutterBottom
                                        sx={{
                                            fontSize: {xs: '2rem', sm: '2.5rem', md: '3rem'},
                                            fontWeight: 700,
                                            mb: 3
                                        }}
                                    >
                                        {t.welcome?.replace('{name}', user?.name || email || 'User') || `Welcome ${user?.name || email || 'User'}!`}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: {xs: '1rem', md: '1.2rem'},
                                            color: 'text.secondary',
                                            mb: 3
                                        }}
                                    >
                                        {t.welcome2 || "Connect in real time with the most effective peer-to-peer texting tool for higher education"}
                                    </Typography>

                                    <Box
                                        component="form"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: {xs: 'column', sm: 'row'},
                                            gap: 1,
                                            mb: 4
                                        }}
                                    >
                                        <TextField
                                            variant="outlined"
                                            placeholder={t.emailPlaceholder || "Type your email"}
                                            type="email"
                                            size="small"
                                            fullWidth
                                            sx={{
                                                maxWidth: {sm: 300},
                                                bgcolor: 'background.paper'
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            endIcon={<SendIcon/>}
                                        >
                                            {t.submit || "Submit"}
                                        </Button>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: {xs: 'column', sm: 'row'},
                                            gap: {xs: 2, sm: 3},
                                            mt: 2
                                        }}
                                    >
                                        {[
                                            t.stats?.courses || "14k+ Total Courses",
                                            t.stats?.mentors || "700+ Expert Mentors",
                                            t.stats?.students || "8k+ Students Globally"
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
                            <Grid item xs={12} md={6} sx={{textAlign: 'center'}}>
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
                                        alt="Education platform"
                                        sx={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            maxHeight: {xs: 300, sm: 400, md: 500},
                                            borderRadius: '50% 50% 0 0',
                                            bgcolor: '#ffd770',
                                            p: {xs: 2, md: 3},
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

                {/* Brand logos */}
                <Box
                    sx={{
                        bgcolor: theme.palette.background.default,
                        py: {xs: 3, md: 4},
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
                            {['Sprint', 'Google', 'Forbes', 'Gillette', 'Etsy'].map((brand, index) => (
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
                        py: {xs: 5, md: 8},
                        px: 2,
                        bgcolor: theme.palette.background.default,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            variant="h3"
                            component="h2"
                            align="center"
                            gutterBottom
                            sx={{
                                mb: {xs: 4, md: 6},
                                fontWeight: 600,
                                fontSize: {xs: '1.8rem', sm: '2.2rem', md: '2.5rem'}
                            }}
                        >
                            {t.educationTitle || "Empowering Modern Day Education"}
                        </Typography>

                        <Grid container spacing={4} justifyContent="center">
                            {[
                                {
                                    title: t.cards?.teachers || "Teachers",
                                    icon: <PeopleIcon fontSize="large"/>,
                                    description: t.cards?.teachersDesc || "Bring the power of the digital age into your classroom. Enable your students to make innovative school projects.",
                                    bgcolor: theme.palette.mode === 'light' ? '#ECEBFF' : '#4A4458'
                                },
                                {
                                    title: t.cards?.students || "Students",
                                    icon: <SchoolIcon fontSize="large"/>,
                                    description: t.cards?.studentsDesc || "Get bold and creative with your school assignments. Flipstack allows you to unleash your imagination in the easiest possible way.",
                                    bgcolor: theme.palette.mode === 'light' ? '#FFF5CF' : '#4A3C39'
                                },
                                {
                                    title: t.cards?.schools || "Schools",
                                    icon: <BusinessIcon fontSize="large"/>,
                                    description: t.cards?.schoolsDesc || "Publish appealing school prospectus, handbooks and admission guides to inform students, teachers, applicants and parents.",
                                    bgcolor: theme.palette.mode === 'light' ? '#FFE4E1' : '#4A3636'
                                }
                            ].map((card, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        elevation={3}
                                        sx={{
                                            height: '100%',
                                            bgcolor: card.bgcolor,
                                            borderRadius: 3,
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                                boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{p: 3}}>
                                            <Box sx={{display: 'flex', alignItems: 'center', mb: 2, gap: 1}}>
                                                <Avatar sx={{
                                                    bgcolor: 'primary.main',
                                                    color: theme.palette.getContrastText(theme.palette.primary.main)
                                                }}>
                                                    {card.icon}
                                                </Avatar>
                                                <Typography variant="h5" component="h3" fontWeight={600}>
                                                    {card.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" sx={{mb: 2}}>
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{px: 3, pb: 3}}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{borderRadius: 2}}
                                            >
                                                {t.seeMore || "See more"}
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
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                }}>
                    <Container>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
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

    return (
        <LanguageProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <GoogleOAuthProvider
                    clientId="205196465877-0neriok38upulqssmrufdpnj5cb60486.apps.googleusercontent.com">
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    isLoggedIn ?
                                        <HomePage
                                            user={user}
                                            email={email}
                                            themeMode={themeMode}
                                            toggleTheme={toggleTheme}
                                        /> :
                                        <LoginPage
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
                                            themeMode={themeMode}
                                            toggleTheme={toggleTheme}
                                        />
                                }
                            />
                            <Route
                                path="/support"
                                element={
                                    <Support
                                        avatar={avatar}
                                        themeMode={themeMode}
                                        toggleTheme={toggleTheme}
                                    />
                                }
                            />
                            <Route
                                path="/about"
                                element={
                                    <AboutUs
                                        avatar={avatar}
                                        themeMode={themeMode}
                                        toggleTheme={toggleTheme}
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                        user={user}
                                        setIsLoggedIn={setIsLoggedIn}
                                        avatar={avatar}
                                        setAvatar={setAvatar}
                                        updateUserName={updateUserName}
                                        themeMode={themeMode}
                                        toggleTheme={toggleTheme}
                                    />
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <SettingsPage
                                        user={user}
                                        setIsLoggedIn={setIsLoggedIn}
                                        themeMode={themeMode}
                                        toggleTheme={toggleTheme}
                                    />
                                }
                            />
                        </Routes>
                    </Router>
                </GoogleOAuthProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
};

export default App;