import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { useUserRole } from 'src/context/UserRoleContext';
import { Iconify } from 'src/components/iconify';
// ----------------------------------------------------------------------
export function SignInView() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('student@123');
    const [password, setPassword] = useState('student@123');
    const { role, setRole } = useUserRole();
    const handleSignIn = useCallback(() => {
        if (email === 'student@123' && password === 'student@123') {
            setRole('student');
            localStorage.setItem('role1', 'student');
            router.push('/studentdashboard');
        }
        else if (email === 'teacher@123' && password === 'teacher@123') {
            setRole('teacher');
            localStorage.setItem('role1', 'teacher');
            router.push('/teacherdashboard');
        }
        else {
            setRole('admin');
            localStorage.setItem('role1', 'admin');
            router.push('/admindashboard');
        }
    }, [router, email, password, setRole]);
    const renderForm = (_jsxs(Box, { sx: {
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
        }, children: [_jsx(TextField, { fullWidth: true, name: "email", label: "Email address", value: email, onChange: (e) => setEmail(e.target.value), sx: { mb: 3 }, slotProps: {
                    inputLabel: { shrink: true },
                } }), _jsx(Link, { variant: "body2", color: "inherit", sx: { mb: 1.5 }, children: "Forgot password?" }), _jsx(TextField, { fullWidth: true, name: "password", label: "Password", value: password, onChange: (e) => setPassword(e.target.value), type: showPassword ? 'text' : 'password', slotProps: {
                    inputLabel: { shrink: true },
                    input: {
                        endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: () => setShowPassword(!showPassword), edge: "end", children: _jsx(Iconify, { icon: showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold' }) }) })),
                    },
                }, sx: { mb: 3 } }), _jsx(Button, { fullWidth: true, size: "large", type: "submit", color: "inherit", variant: "contained", onClick: handleSignIn, children: "Sign in" })] }));
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: {
                    gap: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 5,
                }, children: [_jsx(Typography, { variant: "h5", children: "Sign in" }), _jsxs(Typography, { variant: "body2", sx: {
                            color: 'text.secondary',
                        }, children: ["Don\u2019t have an account?", _jsx(Link, { variant: "subtitle2", sx: { ml: 0.5 }, children: "Get started" })] })] }), renderForm, _jsx(Divider, { sx: { my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }, children: _jsx(Typography, { variant: "overline", sx: { color: 'text.secondary', fontWeight: 'fontWeightMedium' }, children: "OR" }) }), _jsxs(Box, { sx: {
                    gap: 1,
                    display: 'flex',
                    justifyContent: 'center',
                }, children: [_jsx(IconButton, { color: "inherit", children: _jsx(Iconify, { width: 22, icon: "socials:google" }) }), _jsx(IconButton, { color: "inherit", children: _jsx(Iconify, { width: 22, icon: "socials:github" }) }), _jsx(IconButton, { color: "inherit", children: _jsx(Iconify, { width: 22, icon: "socials:twitter" }) })] })] }));
}
