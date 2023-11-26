import { ProductsItens } from "@/pages";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishListProps } from "./AddProductToWishList";
import lodash from "lodash";
// import { AddProductToWishList } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    return import("./AddProductToWishList").then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    loading: () => <span>carregando ....</span>,
  }
);

interface ProductItemProps {
  product: ProductsItens & { priceFormatted: string };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const { id, priceFormatted, title } = product;
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {title} - <strong>{priceFormatted}</strong>
      {/* <button onClick={() => onAddToWishList(id)}>Add to wishlist</button> */}
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // return Object.is(prevProps.product, nextProps.product);
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
