import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import NotFound from "./component/NotFound/NotFound";
import AuthenticationProvider from "./Context/Authentication/Authentication";
import Product from "./component/Product/Product";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import Cart from "./component/Cart/Cart";
import CartProvider from "./Context/Cart/Cart";
import { Toaster } from "react-hot-toast";
import Payment from "./component/Payment/Payment";
import AllOrders from "./component/AllOrders/AllOrders";
import WishlistProvider from "./Context/Wishlist/Wishlist";
import WishList from "./component/WishList/WishList";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import { Offline } from "react-detect-offline";
import { ToastContainer } from 'react-toastify';


let queryClient = new QueryClient();
// document.addEventListener("keydown", function (e) {
//   if (e.code === "F12") {
//     e.preventDefault();
//   }
// });
// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

const router = createHashRouter([

  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "resetpassword", element: <ResetPassword /> },
  { path: "forgetpassword", element: <ForgetPassword /> },
  {
    index: true,
    element: (
      <ProtectedRoute>
        {" "}
        <Product />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "product",
    element: (
      <ProtectedRoute>
        {" "}
        <Product />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "cart",
    element: (
      <ProtectedRoute>
        {" "}
        <Cart />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "wishlist",
    element: (
      <ProtectedRoute>
        {" "}
        <WishList />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "allorders",
    element: (
      <ProtectedRoute>
        {" "}
        <AllOrders />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "payment",
    element: (
      <ProtectedRoute>
        {" "}
        <Payment />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "details/:id",
    element: (
      <ProtectedRoute>
        {" "}
        <ProductDetails />{" "}
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> }
  
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CartProvider>
        <WishlistProvider>
          <AuthenticationProvider>
            <ToastContainer />
            <RouterProvider router={router} />
            <Offline>
              <div className="offline bg-success">You Are Offline Now!</div>
            </Offline>
          </AuthenticationProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
