import { createBrowserRouter } from "react-router";
import Layout from "../../components/layout";
import Product from "../../pages/product";
import Products from "../../pages/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/:id",
        element: <Product />,
      },
    ],
  },
]);

export default router;
