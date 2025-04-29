import { useRef, useState } from "react";
import { CartIcon } from "../../../icons";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import Item from "../item";
import { useTotalCartItems } from "../../../../context/cartItems";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

const CartPopup = () => {
  const [open, setOpen] = useState(false);

  const cartMenuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(cartMenuRef, () => setOpen(false));
  const { selectedCartItems } = useTotalCartItems();

  const cartLength = selectedCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handlePlaceOrder = () => {};

  return (
    <div className="ml-auto flex items-center">
      <div className="ml-4 flow-root lg:ml-6">
        <div className="relative inline-block text-left">
          <div
            className={classNames(
              "fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 ease-in-out",
              { "opacity-100": open, "opacity-0 pointer-events-none": !open }
            )}
            aria-hidden="true"
          />
          <button
            type="button"
            className="group -m-2 flex items-center p-2 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="cart-menu"
            aria-label="Shopping cart. 0 items. View bag"
            id="cart-menu-button"
            data-testid="cart-btn"
            onClick={() => setOpen(!open)}
          >
            <div className="relative">
              <CartIcon className="text-cart size-6 shrink-0 group-hover:text-gray-500" />
              {cartLength > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-gray-900 px-1.5 py-0.5 text-xs font-bold text-white">
                  {cartLength}
                </span>
              )}
            </div>
            <span className="sr-only">items in cart, view bag</span>
          </button>

          {open && (
            <div
              ref={cartMenuRef}
              id="cart-menu"
              className="min-w-2xs z-40 absolute right-0 mt-2 w-auto origin-top-right bg-white focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="cart-menu-button"
              tabIndex={-1}
            >
              <div className="py-8 px-4" role="none">
                <p className="text-md font-bold">
                  My Bag,&nbsp;
                  <span className="text-md font-medium">
                    {cartLength === 0
                      ? "Your cart is empty"
                      : cartLength === 1
                      ? "1 Item"
                      : cartLength + " Items"}
                  </span>
                </p>

                {cartLength !== 0 && (
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6">
                        {selectedCartItems.map(
                          item =>
                            item.quantity > 0 && (
                              <Item key={uuid()} cartItem={item} />
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="flex justify-between my-5">
                  <h3 className="text-md font-bold">Total</h3>
                  <p className="text-md font-bold">$200.00</p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer hover:scale-105 transition uppercase mt-6 flex w-full items-center justify-center border border-transparent bg-primary px-8 py-3 text-base font-medium text-white focus:outline-hidden"
                  onClick={handlePlaceOrder}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
