import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style/Support.css';
import './style/App.css';

// Material UI imports
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
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ExpandMore as ExpandMoreIcon, 
  Send as SendIcon, 
  QuestionAnswer as QuestionIcon,
  ContactSupport as ContactSupportIcon
} from '@mui/icons-material';

/**
 * Support component with improved design using Material UI
 * @param {Object} props - Component props
 * @param {string} props.avatar - User avatar URL
 * @returns {JSX.Element} The Support component
 */
const Support = ({ avatar }) => {
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

            {/* Support intro section */}
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
                            <Typography variant="h2" component="h1" gutterBottom sx={{ 
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                mb: 3
                            }}>
                                Need Help? We're Here for You
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                color: 'text.secondary',
                                maxWidth: '600px'
                            }}>
                                Our support team is ready to help you with account issues, technical problems,
                                and anything else you need. Reach out to us using the form below or browse
                                our FAQs.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2957/2957019.png"
                                alt="Support"
                                style={{ 
                                    maxWidth: '100%', 
                                    height: 'auto',
                                    maxHeight: '300px',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            {/* Contact form section */}
            <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
                <Box textAlign="center" mb={5}>
                    <ContactSupportIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" component="h2" gutterBottom sx={{ 
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        fontWeight: 600
                    }}>
                        Contact Support
                    </Typography>
                </Box>

                <Card elevation={3} sx={{ 
                    maxWidth: 600, 
                    mx: 'auto', 
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                    }
                }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Box component="form" noValidate autoComplete="off" sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 3 
                        }}>
                            <TextField
                                label="Your Name"
                                variant="outlined"
                                fullWidth
                                required
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                label="Your Email"
                                variant="outlined"
                                type="email"
                                fullWidth
                                required
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <TextField
                                label="Describe your issue"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                required
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large" 
                                endIcon={<SendIcon />}
                                sx={{ 
                                    borderRadius: 2,
                                    py: 1.5,
                                    fontWeight: 600,
                                    alignSelf: { xs: 'stretch', sm: 'flex-end' }
                                }}
                            >
                                Send Message
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            {/* FAQ section */}
            <Paper elevation={0} sx={{ backgroundColor: '#f5f7fa', py: { xs: 5, md: 8 }, px: { xs: 2, md: 0 } }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={5}>
                        <QuestionIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h3" component="h2" gutterBottom sx={{ 
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            fontWeight: 600
                        }}>
                            Frequently Asked Questions
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Accordion elevation={2} sx={{ mb: 2, borderRadius: '8px !important', overflow: 'hidden' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>How do I reset my password?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    You can reset your password from the login screen by clicking "Forgot password". 
                                    You'll receive an email with instructions to create a new password.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={2} sx={{ mb: 2, borderRadius: '8px !important', overflow: 'hidden' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>How can I change my email address?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Go to account settings and click "Change email" under your profile section. 
                                    You'll need to verify your new email address before the change takes effect.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={2} sx={{ mb: 2, borderRadius: '8px !important', overflow: 'hidden' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>Why can't I access some courses?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Some courses may be restricted to paid users or may require special access. 
                                    Check the course requirements or contact our support team for assistance.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
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

export default Support;
