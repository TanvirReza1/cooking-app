import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-xl mt-2 text-red-500">
        {error?.statusText || error?.message}
      </p>

      <a href="/" className="btn btn-primary mt-6">
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
