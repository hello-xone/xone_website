import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  useToast
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { CountUp } from 'countup.js';
import { useCallback, useEffect, useRef } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Chain, createClient, formatGwei, http } from 'viem';
import { watchBlockNumber } from 'viem/actions';
import { useGasPrice } from 'wagmi';

import { API_Explorer } from '@/api/explorer/explorer';
import IconMetamask from '@/assets/svg/metamask.svg?react';
import useAddOrSwitchChain from '@/hooks/web3/useAddOrSwitchChain';

type Props = {
  chain: Chain;
  isTestnet?: boolean;
};

const AccessEndpointsCard = (props: Props) => {
  const { chain, isTestnet } = props;
  const onAddOrSwitchChain = useAddOrSwitchChain({ chain });
  const toast = useToast();

  const lastBlockNumberRef = useRef<HTMLParagraphElement>(null);

  const lastBlockNumberCountUpInstance = useRef<CountUp>();

  const { data: gasPrice } = useGasPrice({
    chainId: chain.id
  });

  const { data: stateResp } = useQuery({
    queryKey: [chain.blockExplorers?.default.apiUrl, 'state'],
    queryFn: () => API_Explorer.getState(chain.blockExplorers?.default.apiUrl || ''),
    enabled: Boolean(chain.blockExplorers?.default.apiUrl)
  });

  useEffect(() => {
    if (!lastBlockNumberRef.current) return;

    const client = createClient({
      chain: chain,
      transport: http()
    });
    const unwatch = watchBlockNumber(client, {
      onBlockNumber(blockNumber) {
        const _blockNumber = Number(blockNumber);
        if (lastBlockNumberCountUpInstance.current) {
          lastBlockNumberCountUpInstance.current.update(_blockNumber);
          lastBlockNumberCountUpInstance.current.start();
        } else {
          lastBlockNumberCountUpInstance.current = new CountUp(
            lastBlockNumberRef.current!,
            _blockNumber,
            {
              duration: 1.5, // 动画时长
              separator: ',' // 千分位分隔符
            }
          );
          lastBlockNumberCountUpInstance.current.start();
        }
      }
    });
    return unwatch;
  }, [chain]);

  const onAddChain = useCallback(async () => {
    try {
      await onAddOrSwitchChain();
      toast({
        position: 'top-right',
        title: 'Success',
        description: 'Successfully added network to your wallet',
        status: 'success',
        variant: 'subtle',
        isClosable: true
      });
    } catch (error) {
      toast({
        position: 'top-right',
        title: 'Error',
        description: (error as Error)?.message || 'Something went wrong',
        status: 'error',
        variant: 'subtle',
        isClosable: true
      });
    }
  }, [toast, onAddOrSwitchChain]);

  return (
    <Box mt='60px'>
      <Container bg='white' py='5' px={{ base: '4', lg: '10' }} rounded='14px'>
        <Flex alignItems='center'>
          <Heading size='lg'>{isTestnet ? 'Testnet' : 'Mainnet'} Endpoints</Heading>
          <Link
            as={ReactRouterLink}
            to={chain.blockExplorers?.default.url}
            isExternal
            ml='auto'
            color='red.pri'
            textDecor='underline'
            fontWeight='bold'
            fontSize='xl'
          >
            Explorer
          </Link>
        </Flex>
        <Flex
          mt='10'
          flexDir={{ base: 'column', lg: 'row' }}
          alignItems='center'
          gap='5'
          // alignContent='end'
          css={css`
            > div {
              flex: 1 0 0;
              background-color: black;
              color: white;
            }
          `}
        >
          <Box
            w='full'
            p='10'
            h={{ lg: '200px' }}
            rounded='24px'
            display='flex'
            flexDir={'column'}
            alignItems={{ base: 'center', lg: 'initial' }}
            justifyContent='end'
          >
            <Text fontWeight='bold' fontSize='28px' ref={lastBlockNumberRef}>
              0
            </Text>
            <Text mt='2'>Lastest block</Text>
          </Box>
          <Box
            w='full'
            p='10'
            h={{ lg: '200px' }}
            rounded='24px'
            display='flex'
            flexDir={'column'}
            alignItems={{ base: 'center', lg: 'initial' }}
            justifyContent='end'
          >
            <Text fontWeight='bold' fontSize='28px'>
              {formatGwei(gasPrice || 0n)} Gwei
            </Text>
            <Text mt='2'>Gas</Text>
          </Box>
          <Box
            w='full'
            p='10'
            h={{ lg: '200px' }}
            rounded='24px'
            display='flex'
            flexDir={'column'}
            alignItems={{ base: 'center', lg: 'initial' }}
            justifyContent='end'
          >
            <Text fontWeight='bold' fontSize='28px'>
              {stateResp?.data.average_block_time ? stateResp?.data.average_block_time / 1000 : 0} S
            </Text>
            <Text mt='2'>Average block time</Text>
          </Box>
        </Flex>

        <Box
          bgColor='#FFF8F8'
          mt='10'
          py='7'
          px='5'
          rounded='25px'
          css={css`
            > div {
              display: flex;
              align-items: center;
              padding-block: 4px;
              > p {
                font-size: 20px;

                &:first-of-type {
                  font-weight: 700;
                  width: 160px;
                }
                @media not all and (min-width: 62em) {
                  /* 这里写小于 62em 的样式 */
                  font-size: 16px;
                  &:first-of-type {
                    width: 130px;
                  }
                }
              }
            }
          `}
        >
          <Box>
            <Text>Network name:</Text>
            <Text>{chain.name}</Text>
          </Box>

          <Box>
            <Text>RPC URL:</Text>
            <Text>{chain.rpcUrls.default.http[0]}</Text>
          </Box>

          <Box>
            <Text>ChainID:</Text>
            <Text>{chain.id}</Text>
          </Box>

          <Box>
            <Text>Symbol:</Text>
            <Text>{chain.nativeCurrency.symbol}</Text>
          </Box>

          <Box>
            <Text>Explorer URL:</Text>
            <Text>{chain.blockExplorers?.default.url}</Text>
          </Box>
        </Box>

        <Center mt='5'>
          <Button variant='outline' colorScheme='priRed' rounded='full' onClick={onAddChain}>
            Add to Metamask
            <Icon as={IconMetamask} fontSize='24px' />
          </Button>
        </Center>
      </Container>
    </Box>
  );
};

export default AccessEndpointsCard;
