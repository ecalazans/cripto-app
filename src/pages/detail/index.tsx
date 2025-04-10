import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { CoinGeckoProps } from "../home"
import styles from "./detail.module.css"

interface ErrorData {
  error: string
}

type DataProps = CoinGeckoProps | ErrorData

export function Detail() {
  const { cripto } = useParams()
  const navigate = useNavigate()

  const [coin, setCoin] = useState<CoinGeckoProps>()
  const [loading, setLoading] = useState(true)
  console.log(loading)

  async function adaptCoinDetails(data: any): Promise<CoinGeckoProps> {
    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      market_cap_rank: data.market_cap_rank,
      total_volume: data.market_data.total_volume.usd,
      circulating_supply: data.market_data.circulating_supply,
      max_supply: data.market_data.max_supply,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      image: data.image.large,
    }
  }

  useEffect(() => {
    async function getCoin() {
      try {
        fetch(`https://api.coingecko.com/api/v3/coins/${cripto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
          .then(response => response.json())
          .then(async (data: DataProps) => {
            // console.log(Object.keys(data).length)
            if ("error" in data) {
              navigate('/')
              return
            }

            const formatedData = await adaptCoinDetails(data)

            const price = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            });

            const priceCompact = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact"
            });

            const resultData = {
              ...formatedData,
              formatedPrice: price.format(Number(formatedData.current_price)),
              formatedMarket: priceCompact.format(Number(formatedData.market_cap)),
              formatedVolume: priceCompact.format(Number(formatedData.total_volume))
            }

            setCoin(resultData)
            setLoading(false)
          })

      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }

    getCoin()
  }, [cripto])

  if (loading || !coin) {
    return (
      <div className={styles.container}>
        <h4 className={styles.container}>Carregando detalhes...</h4>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin?.name}</h1>
      <h1 className={styles.center}>{coin?.symbol}</h1>

      <section className={styles.content}>
        <img
          className={styles.logo}
          src={coin.image}
          alt="Logo da moeda"
        />

        <h1>{coin?.name} | {coin?.symbol}</h1>

        <p><strong>Preço: </strong>{coin?.formatedPrice}</p>

        <a>
          <strong>Mercado: </strong>{coin?.formatedMarket}
        </a>

        <a>
          <strong>Volume: </strong>{coin?.formatedVolume}
        </a>

        <a>
          <strong>Mudança 24h: </strong>
          <span
            className={Number(coin?.price_change_percentage_24h) > 0 ? styles.profit : styles.loss}>
            {Number(coin?.price_change_percentage_24h).toFixed(3)}
          </span>
        </a>
      </section>
    </div>
  )
}
