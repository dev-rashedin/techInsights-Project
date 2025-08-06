import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Root from '../layouts/Root';
import ErrorPage from './../error/ErrorPage';
import Login from './../pages/auth/Login';
import Register from './../pages/auth/Register';

import DashboardLayout from '../layouts/DashboardLayout';
import AllUsers from '../pages/dashboard/AllUsers';

import AddPublisher from './../pages/dashboard/AddPublisher';
import Statistics from '../pages/dashboard/Statistics';
import AddArticles from './../pages/AddArticles';
import AllArticles from '../pages/AllArticles';
import Subscription from './../pages/Subscription';
import MyArticles from './../pages/MyArticles';
import PremiumArticles from './../pages/PremiumArticles';
import UserProfile from './../pages/UserProfile';
import PrivateRoute from './PrivateRoute';
import AdminArticles from '../pages/dashboard/AdminArticles';
import Details from '../pages/Details';
import UpdateArticle from '../pages/UpdateArticle';
import AdminRoute from './AdminRoute';
import Payment from '../pages/payment/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/add-article',
        element: (
          <PrivateRoute>
            <AddArticles />
          </PrivateRoute>
        ),
      },
      {
        path: '/all-articles',
        element: <AllArticles />
      },
      {
        path: '/details/:id',
        element: <Details />,
      },
      {
        path: '/update/:id',
        element: <UpdateArticle />,
      },
      {
        path: '/subscription',
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-articles',
        element: <MyArticles />,
      },
      {
        path: '/premium-articles',
        element: (
          <PrivateRoute>
            <PremiumArticles />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment',
        element: <PrivateRoute>
          <Payment/>
        </PrivateRoute>
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'all-articles-admin',
        element: <AdminArticles />,
      },
      {
        path: 'add-publisher',
        element: <AddPublisher />,
      },
    ],
  },
]);

export default router;
