import { MouseEvent, useMemo, useRef, useState } from "react";
import { CartIcon } from "../../../icons";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import { useTotalCartItems } from "../../../../context/cartItems";
import { gql, useMutation } from "@apollo/client";
import CartMenuContent from "../content";
import { OrderProductInput } from "../../../../helpers/types";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($products: [OrderProductInput!]!) {
    createOrder(products: $products) {
      id
    }
  }
`;

const CartPopup = () => {
  const cartMenuRef = useRef<HTMLDivElement | null>(null);

  const {
    openCart,
    setOpenCart,
    selectedCartItems,
    updateSelectedCartItems,
    updateDisplayCartItems,
  } = useTotalCartItems();

  useOutsideClick(cartMenuRef, () => setOpenCart(false));

  const cartLength = useMemo(
    () => selectedCartItems.reduce((total, item) => total + item.quantity, 0),
    [selectedCartItems]
  );

  const cartTotal = useMemo(
    () =>
      selectedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [selectedCartItems]
  );

  const [, setLoading] = useState(true);

  const [createOrder] = useMutation<
    { createOrder: { id: string } },
    { products: OrderProductInput[] }
  >(CREATE_ORDER_MUTATION);

  const handlePlaceOrder = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      if (cartTotal > 0) {
        event.currentTarget.disabled = true;
        setLoading(true);

        const { data } = await createOrder({
          variables: {
            products: selectedCartItems.map(item => ({
              product_id: item.productId,
              currency_label: item.currencyLabel,
              price: item.price,
              quantity: item.quantity,
              attribute_item_ids: !item.selectedAttributes
                ? ""
                : Object.values(item.selectedAttributes).join(","),
            })),
          },
        });
        console.log("Order created successfully: ", data);

        updateSelectedCartItems([]);
        updateDisplayCartItems([]);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-auto flex items-center">
      <div className="ml-4 flow-root lg:ml-6">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="group -m-2 flex items-center p-2 cursor-pointer"
            aria-haspopup="true"
            aria-expanded={openCart}
            aria-controls="cart-menu"
            aria-label="Shopping cart. 0 items. View bag"
            id="cart-menu-button"
            data-testid="cart-btn"
            onClick={() => setOpenCart(!openCart)}
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

          {openCart && (
            <CartMenuContent
              ref={cartMenuRef}
              cartLength={cartLength}
              cartTotal={cartTotal}
              handlePlaceOrder={handlePlaceOrder}
              selectedCartItems={selectedCartItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
