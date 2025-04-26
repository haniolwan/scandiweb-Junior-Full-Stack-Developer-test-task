import { ReactNode, useState } from "react";
import Sidebar from "./sidebar";
import Navigation from "./navigation";
import CartPopup from "./cart/popup";
import { Logo } from "../icons";
import { OpenMenuButton } from "./buttons";
import { mockData } from "../../assets/dummyData/Data";
import { Category } from "../../types";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const categories = (mockData.data.categories as Category[]).map(
    category => category.name
  );
  return (
    <>
      <div>
        <Sidebar categories={categories} open={open} setOpen={setOpen} />
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center">
            <OpenMenuButton setOpen={setOpen} />
            <Navigation categories={categories} />
            <Logo />
            <CartPopup />
          </div>
          {children}
        </nav>
      </div>
    </>
  );
};

export default Layout;
