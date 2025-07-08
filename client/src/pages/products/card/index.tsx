import classNames from "classnames";
import { Product } from "../../../helpers/types";
import { CartIcon } from "../../../components/icons";
import { Link } from "react-router";
import { memo } from "react";
import { useTotalCartItems } from "../../../context/cartItems/useTotalCartItems";

type Props = {
  product: Product;
};

const Card = memo(({ product }: Props) => {
  const usdPrice = product.prices.map(
    price => price.currency.label === "USD" && "$" + price.amount.toFixed(2)
  )[0];

  const {
    displayCartItems,
    selectedCartItems,
    updateDisplayCartItems,
    updateSelectedCartItems,
  } = useTotalCartItems();

  const { setOpenCart } = useTotalCartItems();

  const handleAddItemToCart = () => {
    const selectedAttributes = product.attributes.reduce((acc, attr) => {
      acc[attr.id] = attr.items[0]?.value || "";
      return acc;
    }, {} as Record<string, string>);

    const isInDisplayCart = displayCartItems.some(
      item => item.id === product.id
    );

    if (!isInDisplayCart) {
      updateDisplayCartItems([...displayCartItems, product]);
    }

    const updatedItems = selectedCartItems.map(item => {
      const isSameProduct = item.productId === product.id;
      const isSameAttributes =
        JSON.stringify(item.selectedAttributes) ===
        JSON.stringify(selectedAttributes);

      if (isSameProduct && isSameAttributes) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    const itemExists = updatedItems.some(
      item =>
        item.productId === product.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(selectedAttributes)
    );

    if (!itemExists) {
      updatedItems.push({
        productId: product.id,
        selectedAttributes,
        quantity: 1,
        price: product.prices[0].amount,
        currencyLabel: product.prices[0].currency.symbol,
      });
    }

    updateSelectedCartItems(updatedItems);
  };

  const toKebabCase = (str: string) =>
    str.trim().replace(/\s+/g, "-").toLowerCase();

  return (
    <div
      className={classNames(
        "w-80 md:w-full relative group cursor-pointer p-2 transition-transform duration-300 hover:scale-105 hover:shadow-[var(--shadow-product)]",
        { "opacity-60": !product.inStock }
      )}
      data-testid={`product-${toKebabCase(product.name)}`}
    >
      {product.inStock && (
        <button
          onClick={() => {
            handleAddItemToCart();
            setOpenCart(true);
          }}
          className="cursor-pointer hover:scale-105 opacity-0 group-hover:opacity-100 absolute bottom-14 right-6 bg-green-500 text-white p-2 rounded-full shadow-md z-10 transition-opacity duration-300"
        >
          <CartIcon className="text-white" width="20" height="20" />
        </button>
      )}
      <Link
        className="z-20"
        to={!product.inStock ? `${product.id}?status=out-of-stock` : product.id}
      >
        {!product.inStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="text-2xl text-gray-700">Out of stock</span>
          </div>
        )}
        <img
          src={product.gallery[0]}
          alt="product cover"
          className="aspect-square w-full object-contain xl:aspect-7/8"
        />

        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{usdPrice}</p>
      </Link>
    </div>
  );
});

export default Card;
