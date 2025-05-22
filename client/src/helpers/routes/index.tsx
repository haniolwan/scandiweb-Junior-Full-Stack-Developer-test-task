import { createBrowserRouter } from "react-router";
import Layout from "../../components/layout";
import Home from "../../pages/home";
// import Product from "../../pages/product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:category",
        element: <Home />,
      },
      // {
      //   path: "/:id",
      //   element: <Product />,
      // },
    ],
  },
]);

export default router;
