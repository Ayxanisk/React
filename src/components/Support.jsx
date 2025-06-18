import React, {useState, useCallback} from 'react';
import { NavLink } from 'react-router-dom';
import {
    Container,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Box,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Snackbar,
    Alert,
    useMediaQuery,
    useTheme, Typography
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Send as SendIcon,
    QuestionAnswer as QuestionIcon,
    ContactSupport as ContactSupportIcon
} from '@mui/icons-material';
import './style/Support.css';
import './style/App.css';
import Header from "./Header";
import { useLanguage } from './LanguageContext';
import translations from '../locales/translations';

// Остальной код без изменений...

const Support = ({ avatar, themeMode, toggleTheme }) => {
    const { language } = useLanguage();
    const t = translations[language]?.support || translations.en.support;
    const theme = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formSent, setFormSent] = useState(false);

    const toggleMenu = useCallback(() => setMenuOpen(!menuOpen), [menuOpen]);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            console.log("Sending message:", formData);
            setFormData({ name: '', email: '', message: '' });
            setFormSent(true);
        } else {
            alert(t.fillFields || "Please fill in all fields.");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* AppBar */}
            <Header
                avatar={avatar}
                toggleMenu={toggleMenu}
                isMobile={isMobile}
                themeMode={themeMode}
                toggleTheme={toggleTheme}
            />

            {/* Drawer for mobile */}
            <Drawer anchor="left" open={menuOpen} onClose={closeMenu}>
                <Box sx={{ width: 250 }} onClick={closeMenu}>
                    <List>
                        <ListItem button component={NavLink} to="/">
                            <ListItemText primary={translations[language]?.home || "Home"} />
                        </ListItem>
                        <ListItem button component={NavLink} to="/support">
                            <ListItemText primary={translations[language]?.supportTitle || "Support"} />
                        </ListItem>
                        <ListItem button component={NavLink} to="/about">
                            <ListItemText primary={translations[language]?.about || "About Us"} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Hero Section */}
            <Paper sx={{
                backgroundColor: theme.palette.background.default,
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 5 }
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
                                {t.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {t.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} textAlign="center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2957/2957019.png"
                                alt="Support"
                                style={{ maxHeight: '80%', width: '80%' }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            {/* Contact Form */}
            <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
                <Box textAlign="center" mb={5}>
                    <ContactSupportIcon sx={{
                        fontSize: 40,
                        color: theme.palette.text.primary,
                        mb: 2
                    }} />
                    <Typography variant="h3" fontWeight={600}>
                        {t.contact}
                    </Typography>
                </Box>

                <Card elevation={3} sx={{ maxWidth: 600, mx: 'auto', borderRadius: 2 }}>
                    <CardContent>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                        >
                            <TextField
                                label={t.yourName}
                                variant="outlined"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={handleChange('name')}
                            />
                            <TextField
                                label={t.yourEmail}
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                                value={formData.email}
                                onChange={handleChange('email')}
                            />
                            <TextField
                                label={t.describeIssue}
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                required
                                value={formData.message}
                                onChange={handleChange('message')}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                endIcon={<SendIcon />}
                                sx={{ alignSelf: { xs: 'stretch', sm: 'flex-end' }, fontWeight: 600 }}
                            >
                                {t.send}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            {/* FAQ Section */}
            <Paper sx={{
                backgroundColor: theme.palette.background.default,
                py: { xs: 5, md: 8 }
            }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={5}>
                        <QuestionIcon sx={{
                            fontSize: 40,
                            color: theme.palette.text.primary,
                            mb: 2
                        }} />
                        <Typography variant="h3" fontWeight={600}>
                            {t.faqTitle}
                        </Typography>
                    </Box>

                    {t.faq.map((item, index) => (
                        <Accordion key={index} sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{item.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{item.a}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </Paper>

            {/* Snackbar for form submission */}
            <Snackbar
                open={formSent}
                autoHideDuration={4000}
                onClose={() => setFormSent(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    onClose={() => setFormSent(false)}
                    sx={{ width: '100%' }}
                >
                    {t.success}
                </Alert>
            </Snackbar>

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
                        Contact us: support@education.com
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Support;