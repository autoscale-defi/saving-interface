export const formatAddress = (address: string, number: number = 6) => {
  return `${address.substring(0, number)}...${address.substring(
    address.length - number
  )}`;
};
