import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scarecrow from '../../assets/Scarecrow.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="h-full w-full bg-back">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto ">
        <div className="pt-5 md:pt-10">
          <h3 className="font-mono text-xl font-bold">404 NOT FOUND</h3>
        </div>

        <div className="flex flex-col md:flex-row mt-16 md:mt-36 items-center">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={Scarecrow}
              alt="Error 404 Scarecrow"
              className="w-64 h-auto md:w-auto md:h-96"
            />
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold">
              I have bad news for you
            </h1>
            <p className="font-mono text-lg md:text-xl mt-6 md:pr-12 lg:pr-24">
              The page you are looking for might be removed or is temporarily unavailable.
            </p>
            <div className="mt-8 md:mt-12">
              <button
                onClick={handleBackToHome}
                className="bg-gray-900 text-white px-8 py-4 font-mono text-sm font-bold
                        rounded shadow-lg transition duration-200 transform hover:scale-110"
              >
                BACK TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
