import { useState } from 'react';

import { ReleaseContext } from './context';

export const ReleaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [releaseState, setReleaseState] = useState<any>({});

  return (
    <ReleaseContext.Provider value={{ releaseState, setReleaseState }}>
      {children}
    </ReleaseContext.Provider>
  );
}; 
