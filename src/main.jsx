import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import { AppProvider } from "./context/AppContext"
import LandingPage from "./pages/LandingPage"
import Analysis from "./pages/Analysis"
import RootErrorBoundary from "./components/RootErrorBoundary"
import Banner from "./components/Banner"


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <RootErrorBoundary />,
    },
    {
        path: "/analysis",
        element: <Analysis />,
        errorElement: <RootErrorBoundary />,
    }
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppProvider>
            <Banner />
            <RouterProvider router={router} />
        </AppProvider>
    </StrictMode>,
)
