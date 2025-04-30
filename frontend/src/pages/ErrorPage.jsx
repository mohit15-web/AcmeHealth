import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-6">
              <div className="flex justify-center">
                <svg className="h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but the page you're looking for doesn't exist or has been moved.
                Please check the URL or navigate back to the dashboard.
              </p>
              
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </button>
                
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors" onClick={() => navigate(-1)}>
                  Go Back
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Error Code: 404 - Page Not Found
              </p>
            </div>
          </div>
        </div>
      );
};

export default ErrorPage;