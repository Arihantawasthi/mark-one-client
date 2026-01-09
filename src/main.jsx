import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import { AppProvider } from "./context/AppContext"
import LandingPage from "./pages/LandingPage"
import ProtectedRoute from "./components/ProtectedRoute"
import Analysis from "./pages/Analysis"
import RootErrorBoundary from "./components/RootErrorBoundary"
import Banner from "./components/Banner"
import { AnalysisProvider } from "./context/AnalysisProvider"
import AppLayout from "./pages/AppLayout"
import { AuthProvider } from "./context/AuthProvider"


const router = createBrowserRouter([
    {
        path: "/login",
        element: <div>Login Page (to be implemented)</div>,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <AppLayout />,
                errorElement: <RootErrorBoundary />,
                children: [
                    {
                        index: true,
                        element: <LandingPage />,
                    },
                    {
                        path: "analysis/:analysisId",
                        element: (
                            <AnalysisProvider>
                                <Analysis />
                            </AnalysisProvider>
                        ),
                    }
                ]
            },
        ]
    },
]);

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <AppProvider>
            <Banner />
            <RouterProvider router={router} />
        </AppProvider>
    </AuthProvider>
)
