import { useProductFilters } from "../../context/productFilters";
import Layout from "../../pages/layout";
import { Product } from "../../helpers/types";
import Card from "./card";
import { useQuery, gql } from "@apollo/client";

const Products = () => {
  const { filter } = useProductFilters();
  const PRODUCTS_QUERY = gql`
    {
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
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

  const { data } = useQuery(PRODUCTS_QUERY);

  const products = data?.products?.filter((product: Product) =>
    filter === "" || filter === "all" ? product : product.category === filter
  ); // filter products by category stored in context

  return (
    <Layout>
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-items-center">
        {products &&
          products?.map?.((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
      </div>
    </Layout>
  );
};

export default Products;
