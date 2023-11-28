import { Outlet, Navigate } from 'react-router-dom';
import Layout from '../Components/App/Layout';

function PrivateRoutes() {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={'/sign-in'} />
  );
}

export default PrivateRoutes;
