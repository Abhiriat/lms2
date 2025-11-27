import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { fToNow } from 'src/utils/format-time';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
export function AnalyticsNews({ title, subheader, classes, list, sx, ...other }) {
    const [selectedClass, setSelectedClass] = useState('All');
    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };
    const filteredList = selectedClass === 'All'
        ? list
        : list.filter((item) => item.studentClass === selectedClass);
    return (_jsxs(Card, { sx: sx, ...other, children: [_jsx(CardHeader, { title: title, subheader: subheader, sx: { mb: 1 }, action: _jsxs(FormControl, { size: "small", sx: { minWidth: 120 }, children: [_jsx(InputLabel, { children: "Class" }), _jsxs(Select, { value: selectedClass, label: "Class", onChange: handleClassChange, children: [_jsx(MenuItem, { value: "All", children: "All Classes" }), classes.map((cls) => (_jsx(MenuItem, { value: cls, children: cls }, cls)))] })] }) }), _jsx(Scrollbar, { sx: { minHeight: 405 }, children: _jsx(Box, { sx: { minWidth: 640 }, children: filteredList.map((item, index) => (_jsx(Item, { item: item, rank: item.rank ?? (index + 1) }, item.id))) }) }), _jsx(Box, { sx: { p: 2, textAlign: 'right' }, children: _jsx(Button, { size: "small", color: "inherit", endIcon: _jsx(Iconify, { icon: "eva:arrow-ios-forward-fill", width: 18, sx: { ml: -0.5 } }), children: "View full rankings" }) })] }));
}
function Item({ item, rank, sx, ...other }) {
    return (_jsxs(Box, { sx: [
            (theme) => ({
                py: 2,
                px: 3,
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
        ], ...other, children: [_jsxs(Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    flexShrink: 0
                }, children: ["#", rank] }), _jsx(ListItemText, { primary: item.title, secondary: item.description, slotProps: {
                    primary: { noWrap: true },
                    secondary: {
                        noWrap: true,
                        sx: { mt: 0.5 },
                    },
                } }), _jsx(Box, { sx: { flexShrink: 0, typography: 'caption', color: 'text.disabled' }, children: fToNow(item.postedAt) })] }));
}
