import { useEffect } from "react";
import CartPopup from "./cart/popup";
import { Logo } from "../icons";
import { Outlet, useLocation } from "react-router";
import Overlay from "./overlay";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Navigation } from "./navigation";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache({
      typePolicies: {
        Product: {
          keyFields: ["id"],
        },
        Attribute: {
          keyFields: ["id"],
        },
        AttributeItem: {
          keyFields: ["id", "value", "displayValue"], // Force uniqueness
        },
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <nav aria-label="Top" className="">
          <Overlay />

          <div
            className="relative flex h-16 items-center !bg-white !z-40
          px-4 sm:px-6 lg:px-8"
          >
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
