import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function RootErrorBoundary() {
    const error = useRouteError();

    let title = "404";
    let message = "The page you are looking for does not exist.";
    let statusCode = 404;

    if (isRouteErrorResponse(error)) {
        statusCode = error.status;

        if (statusCode === 404) {
            title = "404";
            message = "The page you are looking for does not exist.";
        } else if (statusCode === 500) {
            title = "500";
            message = "Internal server error. Please try again later.";
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center bg-background text-center">
            <h1 className="text-[200px] font-heading text-app-primary-500">
                {title}
            </h1>
            <p className="text-lg font-light text-text-primary mt-4">
                {message}
            </p>
            <a
                href="/"
                className="border border-primary-500 rounded-3xl py-4 mt-8 text-primary-500"
            >
                Go to Home Page
            </a>
        </div>
    );
}


export default RootErrorBoundary;
