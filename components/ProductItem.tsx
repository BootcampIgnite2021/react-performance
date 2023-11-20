import { ProductsItens } from "@/pages";
import { memo } from "react";

interface ProductItemProps {
  product: ProductsItens & { priceFormatted: string };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const { id, priceFormatted, title } = product;

  return (
    <div>
      {title} - <strong>{priceFormatted}</strong>
      <button onClick={() => onAddToWishList(id)}>Add to wishlist</button>
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
