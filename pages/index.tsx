import { SearchResults } from "@/components/SearchResults";
import { FormEvent, useCallback, useState } from "react";
import style from "../styles/home.module.css";

export type ProductsItens = {
  id: number;
  price: number;
  title: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<{ data: []; totalPrice: number }>({
    data: [],
    totalPrice: 0,
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatterPrice = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    });

    const products = data.map(({ id, title, price }: ProductsItens) => {
      return {
        id: id,
        title: title,
        price: price,
        priceFormatted: formatterPrice.format(price),
      };
    });

    const totalPrice = data.reduce((total: any, product: { price: any }) => {
      return total + product.price;
    }, 0);

    setResults({ data: products, totalPrice });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log("id", id);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Buscador de produtos</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={({ target: { value } }) => {
              setSearch(value);
            }}
          />
          <button type="submit">Buscar</button>
          <button
            onClick={() => {
              setResults({
                data: [],
                totalPrice: 0,
              });
              setSearch("");
            }}
          >
            Limpar
          </button>
        </form>
      </div>

      <SearchResults results={results} onAddToWishList={addToWishList} />
    </div>
  );
}
