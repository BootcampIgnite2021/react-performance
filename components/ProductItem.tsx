interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

export function ProductItem({ product }: ProductItemProps) {
  const { id, price, title } = product;

  return (
    <div>
      {title} - <strong>{price}</strong>
    </div>
  );
}
