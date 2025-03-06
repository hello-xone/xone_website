export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 10)}...${address.slice(-7)}`;
};

