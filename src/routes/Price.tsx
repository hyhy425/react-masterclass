import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const PriceSpan = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-right: 10px;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <div>
      {tickersLoading ? (
        "Loading price..."
      ) : (
        <PriceDiv>
          <PriceSpan>
            <span>All Time High Date</span>
            <span>{tickersData?.quotes.USD.ath_date.slice(0, 10)}</span>
          </PriceSpan>
          <PriceSpan>
            <span>All Time High Price</span>
            <span>${tickersData?.quotes.USD.ath_price.toFixed(3)}</span>
          </PriceSpan>
          <PriceSpan>
            <span>percent from price ath</span>
            <span>{tickersData?.quotes.USD.percent_from_price_ath}%</span>
          </PriceSpan>
          <PriceSpan>
            <span>market cap</span>
            <span>${tickersData?.quotes.USD.market_cap.toLocaleString()}</span>
          </PriceSpan>
        </PriceDiv>
      )}
    </div>
  );
}

export default Price;
