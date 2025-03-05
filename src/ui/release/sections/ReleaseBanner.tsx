import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';

import IMG_Banner from '@/assets/imgs/release/banner.png';
import XOCReleaseAbi from '@/config/abi/XOCRelease.json';
import { readContract } from '@/utils/contract';
import { formatReleaseNumber } from '@/utils/format/number';

import EpochTimeLine from '../components/EpochTimeLine';

type Props = {};

const ReleaseBanner = (props: Props) => {
  const [releaseInfo, setReleaseInfo] = useState({} as Record<string, string>);

  const getReleaseInfo = async () => {
    const res = await readContract({
      address: import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS,
      abi: XOCReleaseAbi,
      functionName: 'getReleaseInfo',
      rpcUrl: import.meta.env.VITE_APP_MAIN_RPC_URL,
    });
    const formatRes = {} as Record<string, string>;
    Object.keys(res).forEach((key: any) => {
      formatRes[key] = formatUnits(res[key], 18);
    });
    setReleaseInfo(formatRes);
  };

  useEffect(() => {
    getReleaseInfo();

    const interval = setInterval(() => {
      getReleaseInfo();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      bg={`url(${IMG_Banner}) 0 0 / 100% 100% no-repeat`}
      pt={{ base: '120px', md: '100px' }}
      textAlign='center'
      pb='20px'
    >
      <Container>
        <Heading size='xl'>Welcome to Xone Mainnet!</Heading>
        <Text maxW='650px' mx='auto' mt='2  '>
          From this moment, unleash your mainnet tokens and step into a new era!
          Experience the high performance and expansive ecosystem of Xone
          Mainnet, and embrace the future of decentralization.
        </Text>
        <Box
          pt='34px'
          pb='44px'
          bg='white'
          borderRadius='20px'
          h='380px'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
        >
          <Heading size='lg' textAlign='left' px='50px'>
            Release Progress
          </Heading>
          <EpochTimeLine />
        </Box>
        <Flex
          mt={{ base: '20px', md: '120px' }}
          alignItems='center'
          gap={{ base: '16px', md: '10' }}
          flexDir={{ base: 'column', md: 'row' }}
          textAlign='center'
          css={css`
            > div {
              padding-block: 30px;
              background-color: white;
              border-radius: 12px;
              flex: 1 0 0;
              box-shadow: 0px 4px 10px 0px #d4d4d440;
              border: 1px solid #e7e7e7;
              > p {
                margin-top: 4px;
                font-size: 14px;
                color: #718096;
              }
            }
          `}
        >
          <Box w={{ base: '100%', md: 'auto' }}>
            <Heading size='lg'>
              {formatReleaseNumber(releaseInfo.alRelease)}
            </Heading>
            <Text>Released (XOC)</Text>
          </Box>

          <Box w={{ base: '100%', md: 'auto' }}>
            <Heading size='lg'>
              {formatReleaseNumber(releaseInfo.nextEpochRelease)}
            </Heading>
            <Text>Next Released (XOC)</Text>
          </Box>

          <Box w={{ base: '100%', md: 'auto' }}>
            <Heading size='lg'>
              {formatReleaseNumber(
                Number(releaseInfo.maxRelease) - Number(releaseInfo.alRelease)
              )}
            </Heading>
            <Text>Total Remaining (XOC)</Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ReleaseBanner;
