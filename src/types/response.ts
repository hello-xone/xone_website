export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface FetchNftTotalRes {
  total: string;
}

export interface Counter {
  description: string;
  id: string;
  title: string;
  units: null;
  value: string;
}

export interface FetchNetCountersRes {
  counters: Counter[];
}

export interface StatsPrice {
  base_fee: number;
  fiat_price: null;
  price: number;
  priority_fee: number;
  priority_fee_wei: string;
  time: number;
  wei: string;
}

export interface Stats {
  average_block_time: number;
  coin_image: null | string;
  coin_price: null | string;
  coin_price_change_percentage: null;
  gas_price_updated_at: string;
  gas_prices: {
    slow: StatsPrice;
    average: StatsPrice;
    fast: StatsPrice;
  };
  gas_prices_update_in: number;
  gas_used_today: string;
  market_cap: string;
  network_utilization_percentage: number;
  secondary_coin_image: null | string;
  secondary_coin_price: null | string;
  static_gas_price: null | string;
  total_addresses: string;
  total_blocks: string;
  total_gas_used: string;
  total_transactions: string;
  transactions_today: string;
  tvl: null;
}
