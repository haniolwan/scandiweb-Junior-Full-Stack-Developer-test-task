import { useRef, useState } from "react";
import { CartIcon } from "../../../icons";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import Item from "../item";

const CartPopup = () => {
  const [open, setOpen] = useState(false);

  const cartMenuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(cartMenuRef, () => setOpen(false));

  return (
    <div className="ml-auto flex items-center">
      <div className="ml-4 flow-root lg:ml-6">
        <div className="relative inline-block text-left">
          <div
            className={`fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 ease-in-out ${
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden="true"
          />
          <button
            type="button"
            className="group -m-2 flex items-center p-2"
            aria-haspopup="true"
            aria-expanded={open ? "true" : "false"}
            aria-controls="cart-menu"
            aria-label="Shopping cart. 0 items. View bag"
            id="cart-menu-button"
            onClick={() => setOpen(!open)}
          >
            <div className="relative">
              <CartIcon className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-gray-900 px-1.5 py-0.5 text-xs font-bold text-white">
                0
              </span>
            </div>
            <span className="sr-only">items in cart, view bag</span>
          </button>

          {open && (
            <div
              ref={cartMenuRef}
              id="cart-menu"
              className="z-40 absolute right-0 mt-2 w-auto origin-top-right bg-white focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="cart-menu-button"
              tabIndex={-1}
            >
              <div className="py-8 px-4" role="none">
                <p className="text-md font-bold">
                  My Bag, <span className="text-sm font-medium"> 3 items</span>
                </p>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      <Item />
                      <Item />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
