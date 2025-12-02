import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { AssignmentView } from 'src/sections/assignments';
// ----------------------------------------------------------------------
export default function AssignmentViewPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Assignment - ${CONFIG.appName}` }), _jsx(AssignmentView, {})] }));
}
