export interface ApiResponse<T> {
  code: number;
  message: string;
  msg: string;
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
  data: Counter[];
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

export interface StatsModel {

  average_txn_fee24h
  :
  number
  block_time
  :
  number
  current_epoch
  :
  number
  total_addresses
  :
  number
  total_nfts
  :
  number
  total_tokens
  :
  number

}
export interface Stats {
  mainnet: StatsModel
  testnet: StatsModel
}

export interface ChartModel {
  date: number
  avg_price: number
  tx_count: number
}

export interface ChartRes {
  prices: Array<ChartModel>
  total_accounts: number
  transaction_amounts_today: number
  transactions_today: number
  current_price: number
  market_cap: number
}