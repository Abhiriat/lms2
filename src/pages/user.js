import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { UserView } from 'src/sections/user/view';
// ----------------------------------------------------------------------
export default function Page() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Users - ${CONFIG.appName}` }), _jsx(UserView, {})] }));
}
