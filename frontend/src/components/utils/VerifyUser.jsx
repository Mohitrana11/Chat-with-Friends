import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function VerifyUser() {
  const userAuth = useSelector((state) => state.auth);  

  return userAuth.isLoggedIn ? <Outlet /> : <Navigate to={'/'} />;
}

export default VerifyUser;
