import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { ProductsItens } from "@/pages";
import { List, ListRowRenderer } from "react-virtualized";

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

  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results.data[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{results.totalPrice}</h2>
      {/* {results.data.map((item) => {
        return (
          <ProductItem
            key={item.id}
            product={item}
            onAddToWishList={onAddToWishList}
          />
        );
      })} */}

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.data.length}
        rowRenderer={rowRender}
      />
    </div>
  );
}
