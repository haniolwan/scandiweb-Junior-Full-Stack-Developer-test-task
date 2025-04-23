import { useState } from "react";
import CartIcon from "./assets/cart";
import OpenMenuIcon from "./assets/open-menu";
import Logo from "./components/logo";
import MobileNav from "./components/mobile-nav";
import NavLinks from "./components/nav-links";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      <MobileNav open={open} setOpen={setOpen} />
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
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

              <NavLinks />
              <Logo />

              <div className="ml-auto flex items-center">
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <CartIcon className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default App;
