import { useEffect, useState } from 'react'

type ApiResponse = {
  market_data: {
    // market_data
    [key: string]: {
      // current_price
      [key: string]: {
        // usd
        [key: string]: number
      }
    }
  }
  update_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
// const api = 'https://api.pancakeswap.com/api/v1/price'
const api = 'https://api.coingecko.com/api/v3/coins/morpheus-token'

const useGetPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res: ApiResponse = await response.json()

        // res.market_data.current_price['usd'];

        setData(res)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceData
