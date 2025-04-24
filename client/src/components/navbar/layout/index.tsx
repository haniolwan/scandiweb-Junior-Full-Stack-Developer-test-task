import { useState } from "react";
import Sidebar from "../sidebar";
import Navigation from "../navigation";
import CartPopup from "../cart/popup";
import { Logo, OpenMenuIcon } from "../../icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sidebar open={open} setOpen={setOpen} />
      <span className="sr-only">mobile navbar view</span>
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
          >
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open menu</span>
            <OpenMenuIcon className="size-6" />
          </button>

          <Navigation />
          <Logo />
          <CartPopup />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
