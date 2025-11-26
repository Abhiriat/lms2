import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import App from './app';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';
// ----------------------------------------------------------------------
const router = createBrowserRouter([
    {
        Component: () => (_jsx(App, { children: _jsx(Outlet, {}) })),
        errorElement: _jsx(ErrorBoundary, {}),
        children: routesSection,
    },
]);
const root = createRoot(document.getElementById('root'));
root.render(_jsx(StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
