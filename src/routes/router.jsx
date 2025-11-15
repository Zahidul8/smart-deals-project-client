import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllProducts from "../pages/AllProducts";
import MyProducts from "../pages/MyProducts";
import MyBIds from "../pages/MyBIds";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import PriveteRoutes from "./PriveteRoutes";
import CreateAProduct from "../pages/CreateAProduct";
import ResetPassword from "../pages/ResetPassword";

const router =  createBrowserRouter([
    {
        path : '/',
        Component: RootLayout,
        children: [
           {
             index: true,
            Component: Home,
            loader: () => fetch('https://smart-deals-project-server.vercel.app/recentProducts')
           }, 
           {
            path: '/login',
            Component: Login
           },
           {
            path: '/register',
            Component: Register
           },
           {
            path: '/allProducts',
            Component: AllProducts,
            loader: () => fetch('https://smart-deals-project-server.vercel.app/products')

           },
           {
            path: '/myProducts',
            element: <PriveteRoutes>
                <MyProducts></MyProducts>
            </PriveteRoutes>
           },
           {
            path: '/createAProduct',
            element: <PriveteRoutes>
                <CreateAProduct></CreateAProduct>
            </PriveteRoutes>
           },
           {
            path: '/myBids',
             element: <PriveteRoutes>
                <MyBIds></MyBIds>
            </PriveteRoutes>
           },
           {
            path: '/productDetails/:id',
            // loader: ({params}) => fetch(`https://smart-deals-project-server.vercel.app/products/${params.id}`),
            element: <PriveteRoutes>
                <ProductDetails></ProductDetails>
            </PriveteRoutes>
           },
           {
            path: '/profile',
             element: <PriveteRoutes>
                <Profile></Profile>
            </PriveteRoutes>
           },
           {
            path: '/resetPassword',
            Component: ResetPassword
           }

           
        ]
    }


])

export default router; 