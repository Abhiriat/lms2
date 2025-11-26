import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
// ----------------------------------------------------------------------
export default function Blog2Page() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Blog - ${CONFIG.appName}` }), "BLog"] }));
}
