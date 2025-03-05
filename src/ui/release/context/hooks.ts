import { useContext } from 'react';

import { ReleaseContext } from './context';

export const useReleaseContext = () => useContext(ReleaseContext);
