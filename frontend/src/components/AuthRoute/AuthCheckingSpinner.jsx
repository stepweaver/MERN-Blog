import { FaSpinner } from 'react-icons/fa';

const AuthLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-96 bg-white'>
      <FaSpinner className='animate-spin text-4xl text-blue-500' />
      <p className='mt-4 text-lg text-gray-900'>
        Checking authentication status, please wait...
      </p>
    </div>
  );
};

export default AuthLoader;
