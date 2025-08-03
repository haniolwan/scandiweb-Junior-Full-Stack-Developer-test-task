import { Link } from "react-router-dom";

const PageNotFound = ({ message = "Page Not Found" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">{message}</p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 transition outline-none"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
