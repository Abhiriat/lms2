import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { InstructorsListView } from 'src/sections/instructors';
// ----------------------------------------------------------------------
export default function InstructorListPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `404 page not found! | Error - ${CONFIG.appName}` }), _jsx(InstructorsListView, {})] }));
}
