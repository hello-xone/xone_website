import React, { useState, useEffect } from 'react';
import { Box, Container, Flex, Icon, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { CiSearch } from 'react-icons/ci';
import AppsTab from '../components/AppsTab';
import DappItem from '../components/DappItem';
import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';

type Dapp = {
  logo: string;
  type: string[];
  name: string;
  url: string;
  description: string;
  state: boolean;
};

const AppsContainer: React.FC = () => {
  const [tabs] = useState(['All', 'DeFi', 'Games', 'NFT', 'AI', 'Payment', 'Data-Pr', 'Infra-and-Tools', 'Other']);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dapps, setDapps] = useState<Dapp[]>([]);

  useEffect(() => {
    const importDapps = async () => {
      const modules = import.meta.glob('@/assets/data/dapps/*.json');
      const dappsArray: Dapp[] = [];

      for (const path in modules) {
        const { default: dapp } = (await modules[path]()) as { default: Dapp }; // 动态加载 JSON
        dappsArray.push(dapp); // 读取 JSON 内容
      }

      setDapps(dappsArray);
    };

    importDapps();
  }, []);

  const filteredDapps = dapps.filter((dapp) =>
    (activeTab === 'All' || dapp.type.includes(activeTab)) &&
    dapp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box mt="80px">
      <Container>
        {/* Tab 选择 */}
        <Flex alignItems="center" overflow="auto hidden" gap="5">
          {tabs.map((tab) => (
            <AppsTab onClick={() => setActiveTab(tab)} key={tab} isActive={tab === activeTab}>
              {tab}
            </AppsTab>
          ))}
        </Flex>

        {/* 搜索框 */}
        <Flex
          alignItems="center"
          bgColor="white"
          mt="10"
          rounded="full"
          h="50px"
          px={{ base: "2", lg: "5" }}
          border="2px solid white"
          css={css`
            &:has(input:focus) {
              border: 2px solid #ed0000;
              caret-color: #ed0000;
            }
          `}
        >
          <Icon as={CiSearch} />
          <Box flex="1 0 0">
            <Input
              ml="2"
              variant="unstyled"
              placeholder="Search"
              w="full"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) {
                  setSearchTerm((e.target as HTMLInputElement).value);
                }
              }}
            />
          </Box>
        </Flex>

        {/* Dapp 列表 */}
        {filteredDapps.length > 0 ? (
          <SimpleGrid columns={{ base: 2, md: 3, xl: 4 }} gap="2" mt="10">
            {filteredDapps.map((dapp, i) => (
              <DappItem key={i} {...dapp} />
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500" mt="20" textAlign="center">
            No relevant data has been collected yet!
            <Text
              as="a"
              color="red.pri"
              fontWeight="bold"
              textDecoration="none"
              _hover={{ textDecoration: "underline" }}
              ml="1"
            >
              <ExternalLink mt="2" to={EXTERNAL_LINKS.Suggest_Dapp}>Go to submit your first application</ExternalLink>
            </Text>
          </Text>
        )}
      </Container>
    </Box>
  );
};

export default AppsContainer;