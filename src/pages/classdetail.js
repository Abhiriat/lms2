import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { ClassDetailView } from 'src/sections/classdetail';
// ----------------------------------------------------------------------
export default function ClassDetailViewPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Class Detail - ${CONFIG.appName}` }), _jsx(ClassDetailView, {})] }));
}
