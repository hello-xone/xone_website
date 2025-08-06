export enum XoneChainId {
  MAIN_NET = 3721,
  TEST_NET = 33772211,
}

export const XoneMainNet = {
  chainId: XoneChainId.MAIN_NET,
  chainName: "Xone Mainnet",
  iconUrls: [
    "https://xo-image-af92h8.s3.ap-southeast-1.amazonaws.com/png/20250213/db42d68c-aa47-401f-960f-1e12e9aa3d81.png",
  ],
  nativeCurrency: {
    decimals: 18,
    name: "Xone",
    symbol: "XOC",
  },
  rpcUrls: ["https://rpc.xone.org"],
  blockExplorerUrls: ["https://xscscan.com"],
};

export const XoneTestNet = {
  chainId: XoneChainId.TEST_NET,
  chainName: "Xone Testnet",
  iconUrls: [
    "https://xo-image-af92h8.s3.ap-southeast-1.amazonaws.com/png/20250213/db42d68c-aa47-401f-960f-1e12e9aa3d81.png",
  ],
  nativeCurrency: {
    decimals: 18,
    name: "Xone",
    symbol: "XOC",
  },
  rpcUrls: ["https://rpc-testnet.xone.org"],
  blockExplorerUrls: ["https://testnet.xscscan.com"],
};
