import { SearchResults } from "@/components/SearchResults";
import { FormEvent, useState } from "react";
import style from "../styles/home.module.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();
    setResults(data);
  }

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
              setResults([]);
              setSearch("");
            }}
          >
            Limpar
          </button>
        </form>
      </div>

      <SearchResults results={results} />
    </div>
  );
}
