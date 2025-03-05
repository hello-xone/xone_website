import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  ListItem,
  OrderedList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  ChainType,
  ConnectStatus,
  useWalletKit,
  WalletKitProvider,
} from '@web3jskit/walletkit';
import BigNumber from "bignumber.js";

import WalletIcon from '@/assets/imgs/release/wallet.svg?react';
import ERC20Abi from '@/config/abi/ERC20.json'
import XOCMigrateAbi from '@/config/abi/XOCMigrate.json';
import XOCReleaseAbi from '@/config/abi/XOCRelease.json';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

type PaddingReleaseInfo = {
  lockTotal: bigint;
  releaseTotal: bigint;
  peddingReleaseTotal: bigint;
};

type ParsePaddingReleaseInfo = {
  lockTotal: string;
  releaseTotal: string;
};

import { ChangeEvent, useEffect, useState } from 'react';
import { FaRegLightbulb } from 'react-icons/fa6';
import { LuInfo } from 'react-icons/lu';
import { formatUnits, parseUnits } from 'viem';

import { Toast } from '@/components/Toast';
import { readContract } from '@/utils/contract';
import { formatReleaseNumber } from '@/utils/format/number';

import InstructionModal from '../components/InstructionModal';
import { useReleaseContext } from '../context/hooks';

export const MAX_AMOUNT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'



const UserReleaseForm = (props: Props) => {
  const {
    connect,
    connectStatus,
    walletAddress,
    disconnect,
    currentNetwork,
    switchNetwork,
    writeContract,
    waitForTransactionReceipt
  } = useWalletKit();
  const { releaseState = {} } = useReleaseContext();


  const [paddingReleaseInfo, setPaddingReleaseInfo] = useState(
    {} as ParsePaddingReleaseInfo
  );
  const {
    lockTotal = '0.00',
    releaseTotal = '0.00',
  } = paddingReleaseInfo;


  const paddingRelease = async () => {
    const res: PaddingReleaseInfo = await readContract({
      address: import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS,
      abi: XOCReleaseAbi,
      functionName: 'paddingRelease',
      rpcUrl: import.meta.env.VITE_APP_MAIN_RPC_URL,
      args: [walletAddress],
    });
    console.log('paddingRelease:res', res);
    // res = {
    //   lockTotal: BigInt(1000000000000000000000n),
    //   releaseTotal: BigInt(50000000000000000000n),
    //   peddingReleaseTotal: BigInt(0n),
    // } // TEST
    setPaddingReleaseInfo({
      lockTotal: formatReleaseNumber(formatUnits(res.lockTotal - res.releaseTotal, 18)),
      releaseTotal: formatReleaseNumber(formatUnits(res.peddingReleaseTotal, 18)),
    });
  };

  const [balance, setBalance] = useState<number>(0);
  const getBalance = async () => {
    const res = await readContract({
      address: import.meta.env.VITE_APP_WXOC_ADDRESS,
      abi: ERC20Abi,
      functionName: 'balanceOf',
      args: [walletAddress],
      rpcUrl: import.meta.env.VITE_APP_TEST_RPC_URL,
    });
    console.log('getBalance:res', res);
    setBalance(Number(formatUnits(res, 18)));
  };


  useEffect(() => {
    console.log('walletAddress', walletAddress);
    if (walletAddress) {
      paddingRelease();
      getBalance();
    } else {
      setBalance(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  const handleConnect = async () => {
    console.log(
      'currentNetworkIds',
      import.meta.env.VITE_APP_TEST_CHAIN_ID,
      currentNetwork
    );
    const res = await connect();
    console.log('connect:res', res);
  };

  const handleDisconnect = async () => {
    const res = await disconnect();
    console.log('disconnect:res', res);
  };


  const [amount, setAmount] = useState('');
  const [displayAmount, setDisplayAmount] = useState('');

  const formatDisplayValue = (val: string) => {
    if (!val) return '';

    const parts = val.split('.');

    const formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (parts[1] !== undefined) {
      return `${formattedInt}.${parts[1].slice(0, 2)}`;
    }

    return formattedInt;
  };


  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^\d.]/g, '');

    const dots = input.match(/\./g)?.length || 0;
    if (dots > 1) return;

    if (input.includes('.')) {
      const [, decimal] = input.split('.');
      if (decimal?.length > 2) return;
    }

    setAmount(input);
    setDisplayAmount(formatDisplayValue(input));
  };

  const handleMaxClick = () => {
    if (connectStatus !== ConnectStatus.Connected) {
      Toast.error('Please connect wallet!');
      return;
    }
    if (balance) {
      const roundedDisplay = Number(balance).toFixed(2);
      setAmount(roundedDisplay);
      setDisplayAmount(formatDisplayValue(roundedDisplay));
    }
  };

  const handleSendWXOC = async () => {
    if (connectStatus !== ConnectStatus.Connected) {
      Toast.error('Please connect wallet!');
      return;
    }
    await switchNetwork(Number(import.meta.env.VITE_APP_TEST_CHAIN_ID));
    const data = await readContract({
      address: import.meta.env.VITE_APP_WXOC_ADDRESS,
      abi: ERC20Abi,
      functionName: 'allowance',
      args: [walletAddress, import.meta.env.VITE_APP_XOC_MIGRATE_ADDRESS],
      rpcUrl: import.meta.env.VITE_APP_TEST_RPC_URL,
    });
    console.log('allowance', data);
    if (BigNumber(data.toString()).lt(BigNumber(amount).shiftedBy(18))) {
      const hash = await writeContract({
        abi: ERC20Abi,
        address: import.meta.env.VITE_APP_WXOC_ADDRESS,
        functionName: "approve",
        args: [import.meta.env.VITE_APP_XOC_MIGRATE_ADDRESS, MAX_AMOUNT],
      });
      await waitForTransactionReceipt(hash);
    }
    console.log('amount', amount, parseUnits(amount, 18));
    const res = await writeContract({
      address: import.meta.env.VITE_APP_XOC_MIGRATE_ADDRESS,
      abi: XOCMigrateAbi,
      functionName: 'migrate',
      args: [parseUnits(amount, 18)],
    });
    console.log(res);
    await waitForTransactionReceipt(res);
    Toast.success('Send WXOC success!');
    paddingRelease();
    getBalance();
    setAmount('');
    setDisplayAmount('');
    console.log('sendWXOC:res', res);
  };

  const handleReleaseXOC = async () => {
    if (connectStatus !== ConnectStatus.Connected) {
      Toast.error('Please connect wallet!');
      return;
    }
    await switchNetwork(Number(import.meta.env.VITE_APP_MAIN_CHAIN_ID));
    const res = await writeContract({
      address: import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS,
      abi: XOCReleaseAbi,
      functionName: 'release',
      args: [],
    });
    Toast.success('Release XOC success!');
    paddingRelease();
    getBalance();
    console.log('releaseXOC:res', res);
  };

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <WalletKitProvider
      defaultChainType={ChainType.EVM}
      defaultChainId={Number(import.meta.env.VITE_APP_TEST_CHAIN_ID)}
      isTokenUp
      customEvmNetworks={[
        {
          chainId: import.meta.env.VITE_APP_MAIN_CHAIN_ID,
          chainName: 'Xone Mainnet',
          rpcUrls: [import.meta.env.VITE_APP_MAIN_RPC_URL],
          iconUrls: [],
          nativeCurrency: {
            name: 'XOne Coin',
            symbol: 'XOC',
            decimals: 18,
          },
          blockExplorerUrls: [import.meta.env.VITE_APP_MAIN_BLOCK_EXPLORER_URL],
        },
      ]}
    >
      <Box mt={{ base: '24px', md: '120px' }}>
        <Container
          position='relative'
          bgColor='white'
          p={{ base: '20px 20px', lg: '30px 50px' }}
          rounded='xl'
        >
          <Box>
            <Flex
              alignItems='center'
              justifyContent='space-between'
              display={{ base: 'flex', md: 'none' }}
            >
              <Text fontSize='16px' fontWeight='500'>
                Releasable(XOC):
              </Text>
              <Text fontSize='26px' fontWeight='600' ml='10px'>
                {formatReleaseNumber(releaseState.reRelease || 0)}
              </Text>
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
              <Heading size='md' display='flex' alignItems='center' gap='10px'>
                I Need to Release
                <Tooltip
                  hasArrow
                  label='Operation Guide'
                  bg='#FFF0F0'
                  color='black'
                  placement='top'
                >
                  <Box cursor='pointer' onClick={() => setIsOpen(true)}>
                    <Icon as={FaRegLightbulb} />
                  </Box>
                </Tooltip>
              </Heading>
              <Flex alignItems='center' display={{ base: 'none', md: 'flex' }}>
                <Text fontSize='24px' fontWeight='500'>
                  Releasable(XOC):
                </Text>
                <Text fontSize='26px' fontWeight='600' ml='10px'>
                  {formatReleaseNumber(releaseState.reRelease || 0)}
                </Text>
              </Flex>
              <Box display='flex' flexDir='column' w={{ base: 'auto', md: '190px' }}>
                {connectStatus === ConnectStatus.Connected ? (
                  <Button
                    _hover={{
                      textDecor: 'underline',
                    }}
                    variant='link'
                    color='red.pri'
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    onClick={handleDisconnect}
                  >
                    <Icon as={WalletIcon} mr='8px' />
                    {formatReleaseNumber(balance)}
                  </Button>
                ) : (
                  <Button
                    _hover={{
                      textDecor: 'underline',
                    }}
                    variant='link'
                    color='red.pri'
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    onClick={handleConnect}
                  >
                    <Icon as={WalletIcon} mr='8px' />
                    Connect Wallet
                  </Button>
                )}
              </Box>
            </Flex>

            <Box textAlign='center'>
              <Flex direction="row" align="flex-end" justifyContent="center" mt="30px" position="relative">
                <Input
                  maxW='500px'
                  fontSize={{ base: '26px', lg: '36px' }}
                  placeholder='0.00'
                  fontWeight='bold'
                  variant='unstyled'
                  textAlign='center'
                  borderBottom='1px solid #E8E8E8'
                  value={displayAmount}
                  mt={{ base: '30px', lg: '0' }}
                  onChange={handleAmountChange}
                />
                <Button rounded='lg' onClick={handleMaxClick} w='124px' ml="auto" position="absolute" right="0" bottom={{ base: '40px', lg: '0' }}>
                  ALL
                </Button>
              </ Flex>
              <Flex
                mt='10'
                bgColor='#FFF0F0'
                p={{ base: '10px', lg: '24px' }}
                rounded='lg'
                flexDir='column'
                fontSize='14px'
                fontWeight='500'
              >
                <Flex alignItems='center' justifyContent='space-between'>
                  <Flex alignItems='center'>
                    Lock Total (XOC)
                    <Popover placement='top' trigger='hover'>
                      <PopoverTrigger>
                        <Flex
                          cursor='pointer'
                          ml='8px'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Icon as={LuInfo} />
                        </Flex>
                      </PopoverTrigger>
                      <PopoverContent bg='#FFF0F0'>
                        <PopoverArrow bg='#FFF0F0' />
                        <PopoverBody>
                          <Text>
                            When you send XoneTestnet WXOC tokens to our contract
                            address, they will be locked and await the next
                            release for the corresponding amount to be unlocked.
                            <Text
                              as='a'
                              target='_blank'
                              color='red.pri'
                              ml='8px'
                              _hover={{ textDecor: 'underline' }}
                              href={EXTERNAL_LINKS.docs + 'study/release#about-the-release-mechanism'}
                            >
                              Please go here &gt;&gt;
                            </Text>
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                  <Text fontSize='14px' fontWeight='500'>
                    {lockTotal}
                  </Text>
                </Flex>
                <Flex alignItems='center' justifyContent='space-between'>
                  <Flex alignItems='center'>
                    Release Total (XOC)
                    <Popover placement='top' trigger='hover'>
                      <PopoverTrigger>
                        <Flex
                          cursor='pointer'
                          ml='8px'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Icon as={LuInfo} />
                        </Flex>
                      </PopoverTrigger>
                      <PopoverContent bg='#FFF0F0'>
                        <PopoverArrow bg='#FFF0F0' />
                        <PopoverBody>
                          <Text>
                            When releasing XoneMainnet XOC, the amount you can
                            release is calculated based on the locked amount in
                            your address. If you haven't made any releases before,
                            Xone will send all previously releasable amounts to
                            your XoneMainnet address when you confirm the release.
                            <Text
                              as='a'
                              target='_blank'
                              color='red.pri'
                              ml='8px'
                              _hover={{ textDecor: 'underline' }}
                              href={EXTERNAL_LINKS.docs + 'study/release#how-do-i-calculate-the-tokens-i-can-release'}
                            >
                              Learn more &gt;&gt;
                            </Text>
                          </Text>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                  <Text>{releaseTotal}</Text>
                </Flex>
              </Flex>
              <Box>
                <Button
                  mt='10'
                  colorScheme='priRed'
                  rounded='full'
                  w='35%'
                  maxW='500px'
                  variant='outline'
                  onClick={handleSendWXOC}
                >
                  Send WXOC
                </Button>
                <Button
                  mt='10'
                  ml='24px'
                  colorScheme='priRed'
                  rounded='full'
                  w='35%'
                  maxW='500px'
                  onClick={handleReleaseXOC}
                >
                  Release XOC
                </Button>
              </Box>
            </Box>

            <Flex
              mt='10'
              bgColor='#FFF0F0'
              p={{ base: '5', lg: '10' }}
              rounded='lg'
            >
              <Box mt='1'>
                <Icon as={LuInfo} />
              </Box>
              <Box ml='5'>
                <Text>Tips:</Text>
                <OrderedList>
                  <ListItem>
                    Please ensure your connected wallet account has sufficient
                    Xone Testnet gas fees. Out of gas?{' '}
                    <Text
                      as='a'
                      target="_blank"
                      color='red.pri'
                      _hover={{ textDecor: 'underline' }}
                      href={EXTERNAL_LINKS.faucet}
                    >
                      Get some here&gt;&gt;
                    </Text>
                  </ListItem>
                  <ListItem>
                    There is a limit on the number of XOCs released each time. Please make a corresponding release plan in advance. The locked WXOC cannot be retrieved. The number will determine the XOCs you can release each time.
                  </ListItem>
                  <ListItem>
                    It's recommended to familiarize yourself with the release
                    rules and process in advance. Learn how to operate and
                    understand the rules{' '}
                    <Text
                      as='a'
                      target="_blank"
                      color='red.pri'
                      _hover={{ textDecor: 'underline' }}
                      href={EXTERNAL_LINKS.docs + 'study/release'}
                    >
                      here
                    </Text>
                    .
                  </ListItem>
                </OrderedList>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
      <InstructionModal isOpen={isOpen} onClose={onClose} />
    </WalletKitProvider>
  );
};

export default UserReleaseForm;
