import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const { state } = useLocation();
  const errorMessage = state?.error || 'An error occurred';

  return (
    <div className="p-8 text-red-500">
      <h2>Oops!</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;