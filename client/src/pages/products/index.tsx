import Layout from "../layout";
import { Product } from "../../helpers/types";
import Card from "./card";
import { useQuery, gql } from "@apollo/client";
import { useProductFilters } from "../../context/productFilters/useProductFilters";
import { useParams } from "react-router-dom";
import PageNotFound from "../error/not-found";

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      name
      inStock
      gallery
      description
      category
      __typename

      attributes {
        id
        name
        type
        __typename
        items {
          id
          displayValue
          value
          __typename
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

const Products = () => {
  const { filter } = useProductFilters();

  const { data, loading } = useQuery(PRODUCTS_QUERY, {
    fetchPolicy: "no-cache",
  });

  const filterProperty = filter === "all" ? null : filter;

  const products = !data?.products
    ? []
    : data.products.filter(
        (product: Product) =>
          !filterProperty || product.category === filterProperty
      );

  const { categoryName } = useParams();
  const { categories } = useProductFilters();

  const categoryExists = categories.some(
    ct => ct.name === categoryName?.toLowerCase()
  );

  if (!categoryExists) {
    return <PageNotFound />;
  }

  return (
    !loading && (
      <Layout>
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-items-center">
          {products &&
            products?.map?.((product: Product) => (
              <Card key={product.id} product={product} />
            ))}
        </div>
      </Layout>
    )
  );
};

export default Products;
