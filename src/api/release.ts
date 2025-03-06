import axios from '@/utils/fetch';

// 释放记录的类型定义
export interface ReleaseRecord {
  id: number;
  releaseId: number;
  chainId: number;
  amount: number;
  lockAmount: number;
  address: string;
  randStr: string;
  status: number; // 0：待成功，1：已成功
  releaseType: number; // 1：锁仓释放，2：用户领取释放，3：团队释放
  epoch: number;
  txHash: string;
  eventIndex: number;
  blockNum: number;
  createdTime: string;
  successTime: string;
  amountStr: string;
  lockAmountStr: string;
  successTimestamp: number;
}

// 分页数据的类型定义
export interface PageData<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

// 每日统计数据的类型定义
export interface DailyCount {
  id: number;
  statDate: string;
  releaseType: number;
  successCount: number;
  addressCount: number;
  createdTime: string;
  updatedTime: string;
  countStr: string;
}

// API响应的类型定义
export interface ApiResponse<T> {
  code: number;
  result: T;
  errMsg: string | null;
  success: boolean;
}

export const Api_Release = {
  // 获取释放记录列表
  releaseRecords(params: {
    startTime?: number;
    endTime?: number;
    pageNum?: number;
    pageSize?: number;
    address?: string;
  }) {
    return axios.get('/count/pageRelease', {
      params,
    });
  },

  // 获取每日统计数据
  dailyStats(params: { start: number; end: number; type: number }) {
    return axios.get<ApiResponse<DailyCount[]>>('/count/daily', {
      params,
    });
  },
};
