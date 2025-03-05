import { useState } from 'react';

import { ReleaseContext } from './context';

export const ReleaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [releaseState, setReleaseState] = useState<any>({});
  const [recordsRefreshCount, setRecordsRefreshCount] = useState(0);

  const addRecordsRefreshCount = () => {
    setRecordsRefreshCount(prev => prev + 1);
  };

  return (
    <ReleaseContext.Provider value={{ releaseState, setReleaseState }}>
    <ReleaseContext.Provider value={{ releaseState, setReleaseState, recordsRefreshCount, addRecordsRefreshCount }}>
      {children}
    </ReleaseContext.Provider>
  );
}; 
