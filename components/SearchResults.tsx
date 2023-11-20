import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { ProductsItens } from "@/pages";

interface SearchResultsProps {
  results: {
    data: Array<
      ProductsItens & {
        priceFormatted: string;
      }
    >;
    totalPrice: number;
  };
  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  results,
  onAddToWishList,
}: SearchResultsProps) {
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0);
  // }, [results]);
  // const totalPrice = results.reduce((total, product) => {
  //   return total + product.price;
  // }, 0);

  return (
    <div>
      <h2>{results.totalPrice}</h2>
      {results.data.map((item) => {
        return (
          <ProductItem
            key={item.id}
            product={item}
            onAddToWishList={onAddToWishList}
          />
        );
      })}
    </div>
  );
}
