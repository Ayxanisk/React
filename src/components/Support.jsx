import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Box,
    Avatar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    useMediaQuery,
    useTheme,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Menu as MenuIcon,
    ExpandMore as ExpandMoreIcon,
    Send as SendIcon,
    QuestionAnswer as QuestionIcon,
    ContactSupport as ContactSupportIcon
} from '@mui/icons-material';

import './style/Support.css';
import './style/App.css';
import Header from "./Header";

const Support = ({ avatar }) => {
    const avatarSrc = avatar || "https://cdn-icons-png.flaticon.com/128/1144/1144709.png";
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
            alert("Please fill in all fields.");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* AppBar */}
            <Header avatar={avatar} toggleMenu={toggleMenu} isMobile={isMobile}/>

            {/* Drawer for mobile */}
            <Drawer anchor="left" open={menuOpen} onClose={closeMenu}>
                <Box sx={{ width: 250 }} onClick={closeMenu}>
                    <List>
                        {['/', '/support', '/about'].map((path, index) => (
                            <ListItem button component={NavLink} to={path} key={index}>
                                <ListItemText primary={path === '/' ? 'Home' : path.slice(1).replace(/^\w/, c => c.toUpperCase())} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Hero Section */}
            <Paper sx={{ backgroundColor: '#e8f0fe', py: { xs: 4, md: 8 }, px: { xs: 2, md: 5 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
                                Need Help? We're Here for You
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Our team is ready to assist with any technical issues or account questions.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} textAlign="center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2957/2957019.png"
                                alt=""
                                style={{ maxHeight: '80%', width: '80%' }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            {/* Contact Form */}
            <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
                <Box textAlign="center" mb={5}>
                    <ContactSupportIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" fontWeight={600}>
                        Contact Support
                    </Typography>
                </Box>

                <Card elevation={3} sx={{ maxWidth: 600, mx: 'auto', borderRadius: 2 }}>
                    <CardContent>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Your Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={handleChange('name')}
                            />
                            <TextField
                                label="Your Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                required
                                value={formData.email}
                                onChange={handleChange('email')}
                            />
                            <TextField
                                label="Describe your issue"
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
                                Send Message
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            {/* FAQ Section */}
            <Paper sx={{ backgroundColor: '#f5f7fa', py: { xs: 5, md: 8 } }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={5}>
                        <QuestionIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h3" fontWeight={600}>Frequently Asked Questions</Typography>
                    </Box>

                    {[
                        {
                            question: 'How do I reset my password?',
                            answer: `Click "Forgot password" on the login page. You'll receive a reset link by email.`
                        },
                        {
                            question: 'How can I change my email address?',
                            answer: `Visit your account settings, click "Change email", and follow the verification steps.`
                        },
                        {
                            question: 'How do I contact the support team?',
                            answer: `Use the contact form above or email us directly from the help center.`
                        }
                    ].map((item, index) => (
                        <Accordion key={index} sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{item.answer}</Typography>
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
                <Alert severity="success" onClose={() => setFormSent(false)} sx={{ width: '100%' }}>
                    Message sent successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Support;
