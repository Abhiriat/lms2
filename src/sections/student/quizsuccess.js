import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Typography, Box } from '@mui/material';
import img from './undraw_completing_3pe7.png';
export function QuizSuccess() {
    return (_jsx(Container, { maxWidth: "sm", sx: { py: 5 }, children: _jsxs(Box, { sx: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
            }, children: [_jsx("img", { src: img, alt: "Quiz completed successfully", style: {
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '400px',
                    } }), _jsx(Typography, { variant: "h3", sx: { textAlign: 'center', fontWeight: 600 }, children: "Successfully Submitted" })] }) }));
}
