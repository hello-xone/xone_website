import { createContext } from 'react';

type ReleaseContextType = {
  releaseState: any;
  setReleaseState: (state: any) => void;
  recordsRefreshCount: number;
  addRecordsRefreshCount: () => void;
};

export const ReleaseContext = createContext<ReleaseContextType>({
  releaseState: null,
  setReleaseState: () => null,
  recordsRefreshCount: 0,
  addRecordsRefreshCount: () => null,
});
