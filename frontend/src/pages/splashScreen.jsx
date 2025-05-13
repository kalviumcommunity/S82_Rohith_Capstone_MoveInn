import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/move_logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/login');
      } else {
        navigate('/home');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex items-center justify-center">
      <img
        src={logo}
        alt="MoveInn Logo"
        className="h-full w-full object-contain animate-bounce"
      />
    </div>
  );
};

export default SplashScreen;
