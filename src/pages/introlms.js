import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { LMSIntroView } from 'src/sections/lmsintro';
// ----------------------------------------------------------------------
export default function IntroLmsPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Blog - ${CONFIG.appName}` }), _jsx(LMSIntroView, {})] }));
}
