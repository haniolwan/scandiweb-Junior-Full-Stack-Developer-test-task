import { useQuery, gql } from "@apollo/client";
import { Category } from "../../../helpers/types";
import CategoryNav from "./categoryNav";
import { useEffect } from "react";
import { useProductFilters } from "../../../context/productFilters/useProductFilters";
import { useLocation } from "react-router-dom";

const CATEGORIES_QUERY = gql`
  {
    categories {
      id
      name
    }
  }
`;

export const Navigation = () => {
  const { data } = useQuery(CATEGORIES_QUERY);
  const { updateCategories, updatedFilters } = useProductFilters();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!data?.categories?.length) return;
    updateCategories(data.categories);
  }, [data, updateCategories]);

  useEffect(() => {
    if (!data?.categories?.length) return;

    const isCategoryPath = pathname.startsWith("/category/");
    if (!isCategoryPath) return;

    const categoryFromUrl = pathname.split("/category/")[1] || "all";

    const categoryExists = data.categories.some(
      (cat: Category) =>
        cat.name.toLowerCase() === categoryFromUrl.toLowerCase()
    );

    if (!categoryExists) {
      updatedFilters("all");
      return;
    }

    updatedFilters(categoryFromUrl);
  }, [data, pathname, updatedFilters]);

  return (
    <nav className="lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {data?.categories.map(({ id, name }: Category) => (
          <CategoryNav key={id} category={name} />
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
