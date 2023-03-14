import { Children } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
// import Product from './pages/Product/Product';
// import Products from './pages/Products/Products';
import './app.scss';
import Signin from './components/Auth';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Signin />,
      },
      // {
      //   path: '/products/:id',
      //   element: <Products />,
      // },
      // {
      //   path: '/product/:id',
      //   element: <Product />,
      // },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
