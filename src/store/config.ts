import { proxy, useSnapshot } from 'valtio';

type TConfigState = {
  GameContractProxyAddress: string;
};

const initialState: TConfigState = {
  GameContractProxyAddress: '0xB588202c5Ca83f7d315Ed6d19540Df5D65Fa9472'
};

const _ = proxy(initialState);

export const ConfigState = {
  state: _
};

export const useConfigState = () => useSnapshot(_);
