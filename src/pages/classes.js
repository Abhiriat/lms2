import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { ClassesView } from 'src/sections/classes';
// ----------------------------------------------------------------------
export default function ClassesViewPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Classes - ${CONFIG.appName}` }), _jsx(ClassesView, {})] }));
}
