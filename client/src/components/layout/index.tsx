import {
  useEffect,
  //  useState
} from "react";
// import Sidebar from "./sidebar";
import { Navigation } from "./navigation";
import CartPopup from "./cart/popup";
import { Logo } from "../icons";
// import { OpenMenuButton } from "./buttons";
import { Outlet, useLocation } from "react-router";
import Overlay from "./overlay";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const Layout = () => {
  // const [openSidebar, setOpenSidebar] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        {/* <Sidebar open={openSidebar} setOpen={setOpenSidebar} /> */}
        <nav aria-label="Top" className="">
          <Overlay />

          <div
            className="relative flex h-16 items-center !bg-white !z-40
          px-4 sm:px-6 lg:px-8"
          >
            {/* <OpenMenuButton setOpen={setOpenSidebar} /> */}
            <Navigation />
            <Logo />
            <CartPopup />
          </div>
          <Outlet />
        </nav>
      </div>
    </ApolloProvider>
  );
};

export default Layout;
