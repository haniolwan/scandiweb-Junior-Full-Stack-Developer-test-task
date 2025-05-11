import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Navigation } from "./navigation";
import CartPopup from "./cart/popup";
import { Logo } from "../icons";
import { OpenMenuButton } from "./buttons";
import { mockData } from "../../assets/dummyData/Data";
import { Category } from "../../helpers/types";
import { Outlet, useLocation } from "react-router";
import Overlay from "./overlay";
import { createClient, Provider, cacheExchange, fetchExchange } from "urql";
const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const categories = (mockData.data.categories as Category[]).map(
    category => category.name
  );

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const client = createClient({
    url: "http://localhost/graphql/",
    exchanges: [
      cacheExchange, // Provides caching functionality
      fetchExchange, // Performs the actual HTTP request
    ],
  });

  return (
    <Provider value={client}>
      <Overlay open={openCart} />
      <div>
        <Sidebar
          categories={categories}
          open={openSidebar}
          setOpen={setOpenSidebar}
        />
        <nav aria-label="Top" className="">
          <div
            className="relative flex h-16 items-center !bg-white !z-40
          px-4 sm:px-6 lg:px-8
          "
          >
            <OpenMenuButton setOpen={setOpenSidebar} />
            <Navigation categories={categories} />
            <Logo />
            <CartPopup open={openCart} setOpen={setOpenCart} />
          </div>
          <Outlet />
        </nav>
      </div>
    </Provider>
  );
};

export default Layout;
