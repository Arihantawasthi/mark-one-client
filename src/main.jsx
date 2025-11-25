import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import RootErrorBoundary from './RootErrorBoundary.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
        errorElement: <RootErrorBoundary />,
    },
    {
        path: '/analysis',
        element: <App />,
        errorElement: <RootErrorBoundary />,
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
