import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
export function NavDesktop({ sx, data, slots, workspaces, layoutQuery, }) {
    const theme = useTheme();
    return (_jsx(Box, { sx: {
            pt: 2.5,
            px: 2.5,
            top: 0,
            left: 0,
            height: 1,
            display: 'none',
            position: 'fixed',
            flexDirection: 'column',
            bgcolor: '#173345',
            zIndex: 'var(--layout-nav-zIndex)',
            width: 'var(--layout-nav-vertical-width)',
            borderRight: `2px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.3)}`,
            [theme.breakpoints.up(layoutQuery)]: {
                display: 'flex',
            },
            ...sx,
        }, children: _jsx(NavContent, { data: data, slots: slots, workspaces: workspaces }) }));
}
// ----------------------------------------------------------------------
export function NavMobile({ sx, data, open, slots, onClose, workspaces, }) {
    const pathname = usePathname();
    useEffect(() => {
        if (open) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    return (_jsx(Drawer, { open: open, onClose: onClose, sx: {
            [`& .${drawerClasses.paper}`]: {
                pt: 2.5,
                px: 2.5,
                overflow: 'unset',
                width: 'var(--layout-nav-mobile-width)',
                ...sx,
            },
        }, children: _jsx(NavContent, { data: data, slots: slots, workspaces: workspaces }) }));
}
// ----------------------------------------------------------------------
export function NavContent({ data, slots, workspaces, sx }) {
    const pathname = usePathname();
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }, children: _jsx(Logo, {}) }), slots?.topArea, _jsx(Scrollbar, { fillContent: true, children: _jsx(Box, { component: "nav", sx: [
                        {
                            display: 'flex',
                            flex: '1 1 auto',
                            flexDirection: 'column',
                        },
                        ...(Array.isArray(sx) ? sx : [sx]),
                    ], children: _jsx(Box, { component: "ul", sx: {
                            gap: 0.5,
                            display: 'flex',
                            flexDirection: 'column',
                        }, children: data.map((item) => {
                            const isActived = item.path === pathname;
                            return (_jsx(ListItem, { disableGutters: true, disablePadding: true, children: _jsxs(ListItemButton, { disableGutters: true, component: RouterLink, href: item.path, sx: [
                                        (theme) => ({
                                            pl: 2,
                                            py: 1,
                                            gap: 2,
                                            pr: 1.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            fontWeight: 'fontWeightMedium',
                                            color: 'white',
                                            minHeight: 44,
                                            ...(isActived && {
                                                fontWeight: 'fontWeightSemiBold',
                                                color: 'white',
                                                bgcolor: varAlpha('white', 0.08),
                                                '&:hover': {
                                                    bgcolor: varAlpha('white', 0.16),
                                                },
                                            }),
                                        }),
                                    ], children: [_jsx(Box, { component: "span", sx: { width: 24, height: 24 }, children: item.icon }), _jsx(Box, { component: "span", sx: { flexGrow: 1 }, children: item.title }), item.info && item.info] }) }, item.title));
                        }) }) }) }), _jsxs(Box, { sx: {
                    mt: 'auto', // pushes it to the very bottom even when content is short
                    py: 2.5,
                    textAlign: 'center',
                    borderTop: (theme) => `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                    color: 'grey.500',
                    fontSize: '0.75rem',
                }, children: ["Developed by ", _jsx(Box, { component: "span", sx: { fontWeight: 600, color: 'white' }, children: "Team Mera Pind" })] }), slots?.bottomArea] }));
}
