import { useMediaQuery } from '@chakra-ui/react';

export const useBreakpoint = () => {
  const [xl2, xl, lg, md, sm] = useMediaQuery([
    '(min-width: 96em)',
    '(min-width: 80em)',
    '(min-width: 62em)',
    '(min-width: 48em)',
    '(min-width: 30em)'
  ]);
  return {
    xl2,
    xl,
    lg,
    md,
    sm
  };
};
