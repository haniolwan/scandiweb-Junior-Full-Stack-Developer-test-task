import { forwardRef } from "react";
import { CartItem } from "../../../../helpers/types";
import Item from "../item";

type Props = {
  cartLength: number;
  cartTotal: number;
  selectedCartItems: CartItem[];
  handlePlaceOrder: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const CartMenuContent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { cartLength, cartTotal, selectedCartItems, handlePlaceOrder } = props;
  return (
    <div
      ref={ref}
      id="cart-menu"
      className="min-w-2xs z-40 absolute right-0 mt-5 w-auto origin-top-right bg-white focus:outline-hidden"
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
                      <Item
                        key={
                          item.productId +
                          JSON.stringify(item.selectedAttributes)
                        }
                        cartItem={item}
                      />
                    )
                )}
              </ul>
            </div>
          </div>
        )}
        <div className="flex justify-between my-5" aria-label="Cart total">
          <h3 className="text-md font-bold">Total</h3>
          <p
            className="text-md font-bold"
            aria-live="polite"
            data-testid="cart-total"
          >
            ${cartTotal.toFixed(2)}
          </p>
        </div>
        <button
          type="button"
          disabled={cartLength === 0}
          className="disabled:opacity-40 disabled:pointer-events-none cursor-pointer hover:scale-105 transition uppercase mt-6 flex w-full items-center justify-center border border-transparent bg-primary px-8 py-3 text-base font-medium text-white focus:outline-hidden"
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
});

export default CartMenuContent;
