import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-red-800 text-white p-4 rounded-lg shadow-md flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;