import React from "react";

const LoadingUi = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
        <p className="animate-pulse mt-4 text-sm text-gray-600 font-medium">{`${message}...`}</p>
      </div>
    </div>
  );
};

export default LoadingUi;
