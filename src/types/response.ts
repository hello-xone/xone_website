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

export interface NewStatsData {
  total_addresses: number;
  total_nfts: number;
  total_tokens: number;
  average_txn_fee24h: number;
  block_number: number;
  gas_fee: number;
  current_epoch: number;
  block_time: number;
}
