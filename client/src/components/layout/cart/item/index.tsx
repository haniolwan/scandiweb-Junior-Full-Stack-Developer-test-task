import { ToggleAddRemove, ToggleColor, ToggleSize } from "../buttons";
import classNames from "classnames";
import { CartItem } from "../../../../helpers/types";
import { useTotalCartItems } from "../../../../context/cartItems/useTotalCartItems";

type Props = {
  cartItem: CartItem;
};

const Item = ({ cartItem }: Props) => {
  const { displayCartItems, selectedCartItems, updateSelectedCartItems } =
    useTotalCartItems();

  const matchingProduct = displayCartItems.find(
    product => product.id === cartItem.productId
  );

  const sizes =
    matchingProduct?.attributes.find(attr => attr.id === "Size" && attr.items)
      ?.items || [];
  const colors =
    matchingProduct?.attributes.find(attr => attr.id === "Color" && attr.items)
      ?.items || [];

  const handleAddCartItem = () => {
    const updatedCartItems = selectedCartItems.map(item => {
      const itemFound =
        item.productId === cartItem.productId &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(cartItem.selectedAttributes);
      if (itemFound) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    updateSelectedCartItems(updatedCartItems.filter(item => item.quantity > 0));
  };

  const handleRemoveCartItem = () => {
    const updatedCartItems = selectedCartItems.map(item => {
      const itemFound =
        item.productId === cartItem.productId &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(cartItem.selectedAttributes);
      if (itemFound) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    updateSelectedCartItems(updatedCartItems);
  };

  const handleAttributeChange = (Id: string, value: string) => {
    const updatedCartItems = selectedCartItems.flatMap(item => {
      const isSameItem =
        item.productId === cartItem.productId &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(cartItem.selectedAttributes);

      if (isSameItem) {
        const newAttributes = { ...item.selectedAttributes, [Id]: value };

        const exists = selectedCartItems.some(
          other =>
            other.productId === item.productId &&
            JSON.stringify(other.selectedAttributes) ===
              JSON.stringify(newAttributes)
        );

        if (exists) {
          return item;
        }

        return {
          ...item,
          selectedAttributes: newAttributes,
        };
      }

      return item;
    });

    updateSelectedCartItems(updatedCartItems);
  };

  const toKebabCase = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase();

  return (
    matchingProduct && (
      <li className="flex space-x-4 py-6">
        <div>
          <h3 className="text-md flex-grow">{matchingProduct.name}</h3>
          <p className="font-semibold">
            {matchingProduct.prices[0].currency.symbol +
              matchingProduct.prices[0].amount}
          </p>
          <div className="pointer-events-none min-w-28">
            {matchingProduct.attributes.map(attr => {
              if (attr.id === "Size") {
                return (
                  <div key={attr.id} data-testid="cart-item-attribute-size">
                    <p className="py-2">{attr.id}:</p>
                    <ul className="flex gap-2">
                      {sizes.map(size => (
                        <ToggleSize
                          attrId={attr.id}
                          key={size.id}
                          size={size.value}
                          selectedSize={cartItem.selectedAttributes[attr.id]}
                          setSelectedSize={handleAttributeChange}
                          dataSet={`cart-item-attribute-${toKebabCase(
                            attr.id
                          )}-${toKebabCase(size.value)}${
                            size.value === cartItem.selectedAttributes[attr.id]
                              ? "-selected"
                              : ""
                          }`}
                        />
                      ))}
                    </ul>
                  </div>
                );
              } else if (attr.id === "Color") {
                return (
                  <div key={attr.id} data-testid="cart-item-attribute-color">
                    <p className="py-2">{attr.id}:</p>
                    <ul className="flex gap-2">
                      {colors.map(color => (
                        <ToggleColor
                          attrId={attr.id}
                          key={color.id}
                          color={color.value}
                          selectedColor={cartItem.selectedAttributes[attr.id]}
                          setSelectedColor={handleAttributeChange}
                          dataSet={`cart-item-attribute-${toKebabCase(
                            attr.id
                          )}-${color}${
                            color.value === cartItem.selectedAttributes[attr.id]
                              ? "-selected"
                              : ""
                          }`}
                        />
                      ))}
                    </ul>
                  </div>
                );
              } else if (attr.id === "Capacity") {
                return (
                  <div
                    key={attr.id}
                    data-testid={`cart-item-attribute-${attr.id
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-md pb-2 pt-4 font-bold uppercase">
                        {attr.id}:
                      </h3>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-2">
                      <div className="flex gap-2">
                        {attr.items.map(item => (
                          <label
                            key={item.id}
                            className={classNames(
                              {
                                "!bg-gray-900 !text-white":
                                  cartItem.selectedAttributes?.[attr.id] ===
                                  item.value,
                              },
                              "w-16 h-14 hover:text-gray-900 group relative flex cursor-pointer items-center justify-center rounded-md border bg-white text-sm font-medium text-gray-900 uppercase shadow-xs hover:bg-gray-300 focus:outline-hidden sm:flex-1"
                            )}
                            onClick={() =>
                              handleAttributeChange(attr.id, item.value)
                            }
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
                        ))}
                      </div>
                    </fieldset>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col justify-between items-center">
            <ToggleAddRemove
              productId={cartItem.productId}
              type="add"
              handleAddCartItem={handleAddCartItem}
              handleRemoveCartItem={handleRemoveCartItem}
            />
            <p data-testid="cart-item-amount">{cartItem.quantity}</p>
            <ToggleAddRemove
              productId={cartItem.productId}
              type="remove"
              handleAddCartItem={handleAddCartItem}
              handleRemoveCartItem={handleRemoveCartItem}
            />
          </div>
          <div className="w-[121px] h-[167px] shrink-0 overflow-hidden">
            <img
              src={matchingProduct?.gallery[0]}
              alt="cart item"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </li>
    )
  );
};

export default Item;
