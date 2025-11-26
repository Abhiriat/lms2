import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { varAlpha } from 'minimal-shared/utils';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';
export function AnalyticsWidgetSummary({ sx, icon, title, total, chart, percent, color = 'primary', ...other }) {
    const theme = useTheme();
    const chartColors = [theme.palette[color].dark];
    const chartOptions = useChart({
        chart: { sparkline: { enabled: true } },
        colors: chartColors,
        xaxis: { categories: chart.categories },
        grid: {
            padding: {
                top: 6,
                left: 6,
                right: 6,
                bottom: 6,
            },
        },
        tooltip: {
            y: { formatter: (value) => fNumber(value), title: { formatter: () => '' } },
        },
        markers: {
            strokeWidth: 0,
        },
        ...chart.options,
    });
    const renderTrending = () => (_jsxs(Box, { sx: {
            top: 16,
            gap: 0.5,
            right: 16,
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
        }, children: [_jsx(Iconify, { width: 20, icon: percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill' }), _jsxs(Box, { component: "span", sx: { typography: 'subtitle2' }, children: [percent > 0 && '+', fPercent(percent)] })] }));
    return (_jsxs(Card, { sx: [
            () => ({
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                color: `${color}.darker`,
                backgroundColor: 'common.white',
                backgroundImage: `linear-gradient(135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)})`,
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
        ], ...other, children: [_jsx(Box, { sx: { width: 48, height: 48, mb: 3 }, children: icon }), renderTrending(), _jsxs(Box, { sx: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                }, children: [_jsxs(Box, { sx: { flexGrow: 1, minWidth: 112 }, children: [_jsx(Box, { sx: { mb: 1, typography: 'subtitle2' }, children: title }), _jsx(Box, { sx: { typography: 'h4' }, children: fShortenNumber(total) })] }), _jsx(Chart, { type: "line", series: [{ data: chart.series }], options: chartOptions, sx: { width: 84, height: 56 } })] }), _jsx(SvgColor, { src: "/assets/background/shape-square.svg", sx: {
                    top: 0,
                    left: -20,
                    width: 240,
                    zIndex: -1,
                    height: 240,
                    opacity: 0.24,
                    position: 'absolute',
                    color: `${color}.main`,
                } })] }));
}
