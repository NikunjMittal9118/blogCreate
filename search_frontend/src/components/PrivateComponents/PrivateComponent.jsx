import { Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const PrivateComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get('access_token');
    if (userToken) {
      console.log('Cookie found:', userToken);
    } else {
        console.log('Cookie not found');
    }

    if (!userToken) {
      navigate('/register');
    }
  }, [navigate]); // Empty dependency array to run effect only once on mount

  return <Outlet />;
};

export default PrivateComponent;