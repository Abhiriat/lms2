import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// ----------------------------------------------------------------------
export function NavUpgrade({ sx, ...other }) {
    return (_jsxs(Box, { sx: [
            {
                mb: 4,
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ], ...other, children: [_jsx(Typography, { variant: "h6", sx: [
                    (theme) => ({
                        background: `linear-gradient(to right, ${theme.vars.palette.secondary.main}, ${theme.vars.palette.warning.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        color: 'transparent',
                    }),
                ], children: "More features?" }), _jsxs(Typography, { variant: "body2", sx: { color: 'text.secondary', mt: 0.5 }, children: [`From only `, _jsx(Box, { component: "strong", sx: { color: 'text.primary' }, children: "$69" })] }), _jsx(Box, { component: "img", alt: "Minimal dashboard", src: "/assets/illustrations/illustration-dashboard.webp", sx: { width: 200, my: 2 } }), _jsx(Button, { href: "https://material-ui.com/store/items/minimal-dashboard/", target: "_blank", variant: "contained", color: "inherit", children: "Upgrade to Pro" })] }));
}
