import classNames from "classnames";
import { useProductFilters } from "../../../../context/productFilters/useProductFilters";
import { Link } from "react-router-dom";

const CategoryNav = ({ category }: { category: string }) => {
  const { filter, updatedFilters } = useProductFilters();
  const isActive = filter === category;

  return (
    <div
      className={classNames("hover:border-b border-primary relative flex", {
        "border-b border-primary": isActive,
      })}
    >
      <Link
        to={`/category/${category}`}
        type="button"
        className={classNames(
          "cursor-pointer capitalize relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-primary",
          { "text-primary ": isActive }
        )}
        aria-expanded="false"
        onClick={() => updatedFilters(category)}
        data-testid={isActive ? "active-category-link" : "category-link"}
      >
        {category}
      </Link>
    </div>
  );
};

export default CategoryNav;
