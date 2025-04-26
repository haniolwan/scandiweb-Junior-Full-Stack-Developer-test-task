import { Dispatch, SetStateAction } from "react";
import { MinusIcon, PlusIcon } from "../../../icons";
import classNames from "classnames";

const ToggleAddRemove = ({
  type,
  count,
  setCount,
}: {
  type: "add" | "remove";
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) => {
  // To do make sure to not exceed inventory
  return (
    <button
      type="button"
      className="hover:bg-gray-300 ring-1 w-6 h-6 flex items-center justify-center cursor-pointer"
      aria-label={type === "add" ? "Add item" : "Remove item"}
      onClick={() =>
        type === "add" ? setCount(count + 1) : count > 1 && setCount(count - 1)
      }
    >
      {type === "add" ? (
        <PlusIcon width="16" height="16" />
      ) : (
        <MinusIcon width="16" height="16" />
      )}
    </button>
  );
};

const ToggleSize = ({
  className,
  attrId,
  size,
  selectedSize,
  setSelectedSize,
}: {
  attrId: string;
  className?: string;
  size: string;
  selectedSize: string;
  setSelectedSize: (Id: string, value: string) => void;
}) => {
  const isSelected = size === selectedSize;

  return (
    <button
      type="button"
      className={classNames(
        className,
        "ring-1 w-6 h-6 flex items-center justify-center cursor-pointer",
        { "bg-dark text-white": isSelected, "hover:bg-gray-200": !isSelected }
      )}
      onClick={() => setSelectedSize(attrId, size)}
      aria-label={classNames("Select size ", { size })}
    >
      <span
        className={classNames("text-xs font-medium", {
          "font-bold": isSelected,
        })}
      >
        {size}
      </span>
    </button>
  );
};

const ToggleColor = ({
  className,
  attrId,
  color,
  selectedColor,
  setSelectedColor,
}: {
  className?: string;
  attrId: string;
  color: string;
  selectedColor?: string;
  setSelectedColor: (Id: string, value: string) => void;
}) => {
  const isSelected = color === selectedColor;
  return (
    <button
      type="button"
      className={classNames(
        className,
        "w-5 h-5 cursor-pointer",
        { "ring-1 ring-primary": isSelected },
        { "hover:ring-1": !isSelected }
      )}
      onClick={() => setSelectedColor(attrId, color)}
      aria-label={classNames("Select color ", { color })}
      style={{ backgroundColor: color }}
    ></button>
  );
};

export { ToggleAddRemove, ToggleSize, ToggleColor };
