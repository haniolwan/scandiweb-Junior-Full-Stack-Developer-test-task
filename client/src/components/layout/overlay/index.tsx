import classNames from "classnames";
import { useTotalCartItems } from "../../../context/cartItems";

const Overlay = () => {
  const { openCart } = useTotalCartItems();
  return (
    <div
      className={classNames(
        "fixed inset-0 z-30 bg-black/25 hidden",
        openCart ? "inline-block" : "hidden"
      )}
      data-testid="cart-overlay"
    />
  );
};

export default Overlay;
