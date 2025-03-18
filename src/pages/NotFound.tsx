
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center glass-card p-12 max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-4 text-cake-600">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <Link 
          to="/" 
          className="bg-cake-500 hover:bg-cake-600 text-white py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
