import { isSupportedChain } from '@/config/wallet/wagmiClient';
import { useUserState } from '@/store/user';
import { ButtonProps } from '@chakra-ui/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useMemo } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import LoadingButton from './LoadingButton';

export function Web3Button(
  props: ButtonProps & {
    supportedChainId?: number | string;
  }
) {
  const { supportedChainId, ...rest } = props;
  const { open } = useWeb3Modal();
  const { switchChainAsync } = useSwitchChain();
  const { chain, address, connector } = useAccount();
  const { isConnected } = useUserState();

  // 不支持的chain
  const unSupportedChain = useMemo(() => {
    if (supportedChainId) {
      return chain?.id !== Number(supportedChainId);
    }
    return false;
  }, [supportedChainId, chain]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isConnected) {
      return open?.();
    }

    if (unSupportedChain) {
      return switchChainAsync?.({ chainId: Number(supportedChainId) });
    }
    return props.onClick?.(event as any);
  };

  const buttonText = useMemo(() => {
    if (!isConnected) {
      return 'Connect';
    }

    if (!isSupportedChain(chain!.id)) {
      return 'Switch Network';
    }
    return props.children;
  }, [isConnected, chain, props.children]);

  const colorScheme = useMemo(() => {
    if (chain && !isSupportedChain(chain!.id)) {
      return 'yellow';
    }
    return props.colorScheme;
  }, [chain]);

  return (
    <LoadingButton {...props} onClick={onClick} colorScheme={colorScheme}>
      {buttonText}
    </LoadingButton>
  );
}

export default Web3Button;
