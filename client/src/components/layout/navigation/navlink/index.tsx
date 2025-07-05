import classNames from "classnames";
import { useProductFilters } from "../../../../context/productFilters";
import { useParams } from "react-router-dom";

export const NavLink = ({ category }: { category: string }) => {
  const { filter, updatedFilters } = useProductFilters();

  const isActive = filter === category;
  const { id } = useParams();

  const isPDP = id;
  return (
    <div
      className={classNames("hover:border-b border-primary relative flex", {
        "border-b border-primary": isActive,
        "pointer-events-none": isPDP,
      })}
    >
      <a
        href={`/${category}`}
        type="button"
        className={classNames(
          "cursor-pointer capitalize relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-primary",
          { "text-primary ": isActive }
        )}
        aria-expanded="false"
        onClick={e => {
          e.preventDefault();
          updatedFilters(category);
        }}
        data-testid={isActive ? "active-category-link" : "category-link"}
      >
        {category}
      </a>
    </div>
  );
};

export default NavLink;
