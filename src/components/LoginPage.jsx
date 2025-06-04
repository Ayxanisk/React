import React from 'react';
import {
    Button,
    TextField,
    Paper,
    Typography,
    Box
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

/**
 * LoginPage component for user authentication
 * @param {Object} props - Component props
 * @param {boolean} props.isRegistering - Flag to indicate if in registration mode
 * @param {Function} props.setIsRegistering - Function to set registration mode
 * @param {string} props.email - Email input value
 * @param {Function} props.setEmail - Function to set email
 * @param {string} props.password - Password input value
 * @param {Function} props.setPassword - Function to set password
 * @param {Function} props.handleLogin - Handler for login form submission
 * @param {Function} props.handleRegister - Handler for registration form submission
 * @param {Function} props.handleGoogleSuccess - Handler for successful Google login
 * @param {boolean} props.isSmall - Flag to indicate small screen size
 * @returns {JSX.Element} LoginPage component
 */
const LoginPage = ({
                       isRegistering,
                       setIsRegistering,
                       email,
                       setEmail,
                       password,
                       setPassword,
                       handleLogin,
                       handleRegister,
                       handleGoogleSuccess,
                       isSmall
                   }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#f5f5f5',
                p: 3
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4 },
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 2,
                    mb: 4,
                    animation: 'fadeIn 0.5s ease-out'
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{ mb: 3, fontWeight: 600 }}
                >
                    {isRegistering ? 'Register' : 'Login'}
                </Typography>

                <Box
                    component="form"
                    onSubmit={isRegistering ? handleRegister : handleLogin}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 1 }}
                    >
                        {isRegistering ? 'Register' : 'Login'}
                    </Button>
                </Box>
            </Paper>

            <Box sx={{ mb: 3, width: '100%', maxWidth: 400, textAlign: 'center' }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => alert('Login Failed')}
                    width={isSmall ? '100%' : undefined}
                />
            </Box>

            <Button
                onClick={() => setIsRegistering(!isRegistering)}
                color="primary"
                sx={{ textTransform: 'none' }}
            >
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Button>
        </Box>
    );
};

export default LoginPage;