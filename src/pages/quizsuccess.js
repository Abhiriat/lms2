import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { QuizSuccess } from 'src/sections/quiz/quizsuccess';
// ----------------------------------------------------------------------
export default function QuizSuccessPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Quiz Success | ${CONFIG.appName}` }), _jsx(QuizSuccess, {})] }));
}
