import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
import { mergeClasses } from 'minimal-shared/utils';
import { logoClasses } from './classes';
// Replace this path with your actual logo location
import MyLogo from '../../../public/assets/Logo.png'; // ← YOUR LOGO HERE
export function Logo({ sx, disabled, className, href = '/', ...other }) {
    return (_jsx(LogoRoot, { component: RouterLink, href: href, "aria-label": "Home", underline: "none", className: mergeClasses([logoClasses.root, className]), sx: [
            {
                width: 50,
                height: 50,
                // mt:2,
                mb: 2,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...(disabled && { pointerEvents: 'none', opacity: 0.48 }),
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ], ...other, children: _jsx("img", { src: MyLogo, alt: "My Logo", style: {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            } }) }));
}
const LogoRoot = styled(Link)(() => ({
    flexShrink: 0,
    display: 'inline-flex',
}));
