import { jsx as _jsx } from "react/jsx-runtime";
import 'src/global.css';
import { useEffect } from 'react';
import { usePathname } from 'src/routes/hooks';
import { ThemeProvider } from 'src/theme/theme-provider';
import { UserRoleProvider } from './context/UserRoleContext';
export default function App({ children }) {
    useScrollToTop();
    return (_jsx(UserRoleProvider, { children: _jsx(ThemeProvider, { children: children }) }));
}
// ----------------------------------------------------------------------
function useScrollToTop() {
    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
