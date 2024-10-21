import { useRouteError } from "react-router-dom";

// Define an interface for the error object
type RouteError = {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouteError; // Cast the error to RouteError
    console.error(error);

    return (
        <div className="flex-col-center" id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
