import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import Product from "./pages/product";

import Layout from "./components/layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:id",
      element: <Product />,
    },
  ]);
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
