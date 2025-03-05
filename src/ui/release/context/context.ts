import { createContext } from 'react';

type ReleaseContextType = {
  releaseState: any;
  setReleaseState: (state: any) => void;
};

export const ReleaseContext = createContext<ReleaseContextType>({
  releaseState: null,
  setReleaseState: () => null,
});
