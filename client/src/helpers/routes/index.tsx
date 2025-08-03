import { createBrowserRouter } from "react-router";
import Layout from "../../components/layout";
import Product from "../../pages/product";
import Products from "../../pages/products";
import PageNotFound from "../../pages/error/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/category/:categoryName",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
