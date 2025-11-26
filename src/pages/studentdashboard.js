import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { OverviewAnalyticsView as DashboardView } from 'src/sections/studentoverview/view/overview-analytics-view';
// ----------------------------------------------------------------------
export default function StudentPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Dashboard - ${CONFIG.appName}` }), _jsx("meta", { name: "description", content: "The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI \u00A9, ready to be customized to your style" }), _jsx("meta", { name: "keywords", content: "react,material,kit,application,dashboard,admin,template" }), _jsx(DashboardView, {})] }));
}
