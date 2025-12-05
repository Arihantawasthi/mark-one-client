import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import LandingPage from "./pages/LandingPage.jsx"
import Analysis from "./pages/Analysis.jsx"
import RootErrorBoundary from "./components/RootErrorBoundary.jsx"


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
        <RouterProvider router={router} />
    </StrictMode>,
)
