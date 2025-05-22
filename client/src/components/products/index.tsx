import { useProductFilters } from "../../context/productFilters";
import Layout from "../../pages/layout";
import { Product } from "../../helpers/types";
import Card from "./card";
import { useQuery, gql } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const PRODUCTS_QUERY = gql`
  query GetProducts($id: String) {
    products(id: $id) {
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

const Products = () => {
  const { id } = useParams();

  const { filter } = useProductFilters();

  const { data, loading } = useQuery(PRODUCTS_QUERY, {
    variables: { id },
  });

  const filterProperty = filter === "all" ? null : filter;

  const products = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter(
      (product: Product) =>
        !filterProperty || product.category === filterProperty
    );
  }, [data, filter]);

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
