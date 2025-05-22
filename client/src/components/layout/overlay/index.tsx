import { useTotalCartItems } from "../../../context/cartItems";

const Overlay = () => {
  const { openCart } = useTotalCartItems();
  return (
    openCart && (
      <div
        className="fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 ease-in-out"
        aria-hidden="true"
        data-testid="cart-overlay"
      />
    )
  );
};

export default Overlay;
