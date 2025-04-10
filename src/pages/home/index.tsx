import { useState, FormEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import styles from "./home.module.css"
import { BsSearch } from "react-icons/bs"

// interface CoinProps {
//   id: string;
//   name: string;
//   symbol: string;
//   priceUsd: string;
//   vwap24Hr: string;
//   changePercent24Hr: string;
//   rank: string;
//   supply: string;
//   maxSupply: string;
//   marketCapUsd: string;
//   volumeUsd24Hr: string;
//   explorer: string;
//   formatedPrice?: string;
//   formatedMarket?: string;
//   formatedVolume?: string;
// }

export interface CoinGeckoProps {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number;
  price_change_percentage_24h: number;
  image: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
  // CoinGecko não fornece `explorer` direto nesse endpoint
}

// interface DataProps {
//   data: CoinGeckoProps[]
// }

type DataArray = CoinGeckoProps[]

export function Home() {
  const [input, setInput] = useState("")
  const [coins, setCoins] = useState<CoinGeckoProps[]>([])
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [page])

  async function getData() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }

      const data: DataArray = await response.json();

      const price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });

      const priceCompact = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact"
      });

      const formatedResult = data.map((item) => {
        return {
          ...item,
          formatedPrice: price.format(Number(item.current_price)),
          formatedMarket: priceCompact.format(Number(item.market_cap)),
          formatedVolume: priceCompact.format(Number(item.total_volume))
        };
      });

      setCoins([...coins, ...formatedResult]);

    } catch (error) {
      // console.error("Erro ao carregar dados:", error);
      alert("Não foi possível carregar mais moedas. Você atingiu o limite de páginas da API. Aguarde 1 minuto e recarregue a página");
      setPage(1);
      setCoins([]);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (input === '') {
      return
    }

    navigate(`/detail/${input}`)
  }

  function handleGetMore() {
    if (page === 1) {
      setPage(11)
      return
    }

    console.log(page)
    setPage(page + 10)
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda... Ex: Bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            {/* th -> cabeçalho */}
            <th scope="col">Moeda</th>
            <th scope="col">Valor Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.length > 0 && coins.map((item) => (
            <tr className={styles.tr} key={item.id}>
              <td className={styles.tdLabel} data-label="Modeda">
                <div className={styles.name}>
                  <img
                    className={styles.logo}
                    src={item.image}
                    alt="Logo cripto"
                  />
                  <Link to={`/detail/${item.id}`}>
                    <span>{item.name}</span> | {item.symbol}
                  </Link>
                </div>
              </td>

              <td className={styles.tdLabel} data-label="Valor Mercado">
                {item.formatedMarket}
              </td>

              <td className={styles.tdLabel} data-label="Preço">
                {item.formatedPrice}
              </td>

              <td className={styles.tdLabel} data-label="Volume">
                {item.formatedVolume}
              </td>

              <td className={Number(item.price_change_percentage_24h) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                <span>{Number(item.price_change_percentage_24h).toFixed(3)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>Carregar mais...</button>

    </main >
  )
}
