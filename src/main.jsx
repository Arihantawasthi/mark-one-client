import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import { AppProvider } from "./context/AppContext"
import LandingPage from "./pages/LandingPage"
import Analysis from "./pages/Analysis"
import RootErrorBoundary from "./components/RootErrorBoundary"
import Banner from "./components/Banner"
import { AnalysisProvider } from "./context/AnalysisProvider"


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <RootErrorBoundary />,
    },
    {
        path: "/analysis/:analysisId",
        element: <AnalysisProvider> <Analysis /> </AnalysisProvider>,
        errorElement: <RootErrorBoundary />,
    }
]);

createRoot(document.getElementById("root")).render(
        <AppProvider>
            <Banner />
            <RouterProvider router={router} />
        </AppProvider>
)
