import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { QuizInterface } from 'src/sections/quiz/quizinterface';
// ----------------------------------------------------------------------
export default function QuizInterfacePage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Quiz Interface | ${CONFIG.appName}` }), _jsx(QuizInterface, {})] }));
}
