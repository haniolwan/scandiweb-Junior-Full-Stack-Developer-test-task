import classNames from "classnames";
import { useTotalCartItems } from "../../../context/cartItems";

const Overlay = () => {
  const { openCart } = useTotalCartItems();
  return (
    <div
      className={classNames(
        "fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 ease-in-out",
        { "opacity-100": openCart, "opacity-0 pointer-events-none": !openCart }
      )}
      aria-hidden="true"
      data-testid="cart-overlay"
    />
  );
};

export default Overlay;
