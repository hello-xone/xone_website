import { createRef, useState } from 'react';
import { TMobileNavContainerRef } from './components/mobile/MobileNavContainer';

export const mobileNavWrapRef = createRef<TMobileNavContainerRef>();

export const useMobileNavModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    open: () => {
      mobileNavWrapRef.current?.open();
      setIsOpen(true);
    },
    close: () => {
      mobileNavWrapRef.current?.close();
      setIsOpen(false);
    },
    toggle: () => {
      setIsOpen(!mobileNavWrapRef.current?.isOpen);
      mobileNavWrapRef.current?.toggle();
    },
    isOpen
  };
};
