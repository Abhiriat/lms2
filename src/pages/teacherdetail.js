import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CONFIG } from 'src/config-global';
import { TeacherDetailView } from 'src/sections/teacherdetail';
// ----------------------------------------------------------------------
export default function TeacherDetailViewPage() {
    return (_jsxs(_Fragment, { children: [_jsx("title", { children: `Quiz Result Details |${CONFIG.appName}` }), _jsx(TeacherDetailView, {})] }));
}
