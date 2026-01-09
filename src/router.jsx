import { createBrowserRouter  } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";
import Banner from "./components/Banner";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import RootErrorBoundary from "./components/RootErrorBoundary";
import LandingPage from "./pages/LandingPage";
import Analysis from "./pages/Analysis";
import { AnalysisProvider } from "./context/AnalysisProvider";
import { AuthProvider } from "./context/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <AuthProvider>
                <AppProvider>
                    <Banner />
                    <Login />
                </AppProvider>
            </AuthProvider>
        ),
    },
    {
        element: (
            <AuthProvider>
                <ProtectedRoute />
            </AuthProvider>
        ),
        children: [
            {
                path: "/",
                element: (
                    <AppProvider>
                        <Banner />
                        <AppLayout />
                    </AppProvider>
                ),
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
            }
        ]
    }
]);

export default router;
