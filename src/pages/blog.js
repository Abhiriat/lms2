import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { BlogView } from 'src/sections/blog/view';
// ----------------------------------------------------------------------
export default function Page() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Blog - ${CONFIG.appName}` }), _jsx(BlogView, { posts: _posts })] }));
}
