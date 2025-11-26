import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { SignInView } from 'src/sections/auth';
// ----------------------------------------------------------------------
export default function Page() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Sign in - ${CONFIG.appName}` }), _jsx(SignInView, {})] }));
}
