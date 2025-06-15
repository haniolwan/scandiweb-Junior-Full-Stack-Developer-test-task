import { useState } from "react";
import { ToggleColor, ToggleSize } from "../../layout/cart/buttons";
import { Attribute, Product } from "../../../helpers/types";
import classNames from "classnames";
import { useTotalCartItems } from "../../../context/cartItems";
import parse from "html-react-parser";

type Props = {
  product: Product;
};
const Info = ({ product }: Props) => {
  const [selectedAttributes, setSelectedAttributes] = useState(() => {
    return product.attributes.reduce((acc, attr) => {
      acc[attr.id] = "";
      return acc;
    }, {} as Record<string, string>);
  });

  const sizes =
    product.attributes.find(attr => attr.id === "Size" && attr.items)?.items ||
    [];
  const colors =
    product.attributes.find(attr => attr.id === "Color" && attr.items)?.items ||
    [];

  const handleItemSelect = (Id: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [Id]: value,
    }));
  };

  const {
    displayCartItems,
    updateDisplayCartItems,
    selectedCartItems,
    updateSelectedCartItems,
  } = useTotalCartItems();

  const handleAddItemToCart = () => {
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

  const isOutOfStock =
    new URLSearchParams(location.search).get("status") === "out-of-stock";

  const isDisabled = !Object.values(selectedAttributes).every(Boolean);

  const toKebabCase = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase();

  const { setOpenCart } = useTotalCartItems();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {product.name}
        </h1>
        <div className="mt-2">
          <div>
            {product.attributes.map(attr => {
              if (attr.id === "Size") {
                return (
                  <div key={attr.id} data-testid="product-attribute-size">
                    <h3 className="text-md pb-2 pt-4 font-bold uppercase">
                      {attr.id}:
                    </h3>
                    <ul className="flex gap-2">
                      {sizes &&
                        sizes.map((size: Attribute) => (
                          <ToggleSize
                            className="w-16 h-11"
                            attrId={attr.id}
                            key={size.id}
                            size={size.value}
                            selectedSize={selectedAttributes[attr.id]}
                            setSelectedSize={handleItemSelect}
                            dataSet={`product-attribute-${toKebabCase(
                              attr.id
                            )}-${size.value}`}
                          />
                        ))}
                    </ul>
                  </div>
                );
              }
              if (attr.id === "Color") {
                return (
                  <div key={attr.id} data-testid="product-attribute-color">
                    <h3 className="text-md pb-2 pt-4 font-bold uppercase">
                      {attr.id}:
                    </h3>
                    <ul className="flex gap-2">
                      {colors &&
                        colors.map((color: Attribute) => (
                          <ToggleColor
                            className="w-9 h-9"
                            attrId={attr.id}
                            key={color.id}
                            color={color.value}
                            selectedColor={selectedAttributes[attr.id]}
                            setSelectedColor={handleItemSelect}
                            dataSet={`product-attribute-${toKebabCase(
                              attr.id
                            )}-${color.value}`}
                          />
                        ))}
                    </ul>
                  </div>
                );
              } else {
                return (
                  <div
                    key={attr.id}
                    data-testid={`product-attribute-${toKebabCase(attr.id)}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-md pb-2 pt-4 font-bold uppercase">
                        {attr.id}:
                      </h3>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-2">
                      <div className="flex gap-2">
                        {attr.items.map(item => {
                          return (
                            <label
                              key={item.id}
                              className={classNames(
                                {
                                  "!bg-gray-900 !text-white":
                                    selectedAttributes[attr.id] === item.value,
                                },
                                "max-w-16 h-14 hover:text-gray-900 group relative flex cursor-pointer items-center justify-center border bg-white text-sm font-medium text-gray-900 uppercase shadow-xs hover:bg-gray-300 focus:outline-hidden sm:flex-1"
                              )}
                              onClick={() =>
                                handleItemSelect(attr.id, item.value)
                              }
                              data-testid={`product-attribute-${toKebabCase(
                                attr.id
                              )}-${item.value}`}
                            >
                              <input
                                type="radio"
                                name={attr.name}
                                value={item.value}
                                className="sr-only"
                              />
                              <span>{item.value}</span>
                              <span
                                className="pointer-events-none absolute -inset-px rounded-md"
                                aria-hidden="true"
                              ></span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                );
              }
            })}
          </div>
          <div>
            <h3 className="text-md pb-2 pt-4 font-bold uppercase">Price:</h3>

            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 font-extrabold">
              {product.prices[0].currency.symbol + product.prices[0].amount}
            </p>
          </div>
          {!isOutOfStock && product.inStock && (
            <button
              disabled={isDisabled}
              type="button"
              className="disabled:opacity-40 disabled:pointer-events-none cursor-pointer hover:scale-105 transition uppercase mt-10 flex w-full items-center justify-center border border-transparent bg-primary px-8 py-3 text-base font-medium text-white focus:outline-hidden"
              onClick={() => {
                handleAddItemToCart();
                setOpenCart(true);
              }}
              data-testid="add-to-cart"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6">
          <span
            className="text-base text-gray-900"
            data-testid="product-description"
          >
            {parse(product.description)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Info;
