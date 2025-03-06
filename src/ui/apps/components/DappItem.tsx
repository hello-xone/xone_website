import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Img, Text, Badge, Tooltip } from '@chakra-ui/react';
import ExternalLink from '@/components/comm/ExternalLink';

type DappProps = {
  logo: string;
  name: string;
  description: string;
  url: string;
  state: boolean;
};

const DappItem: React.FC<DappProps> = ({ logo, name, description, url, state }) => {
  const formatName = (name: string) => name.toLowerCase().replace(/\s+/g, '');
  const isExternalLogo = logo && (logo.startsWith('http://') || logo.startsWith('https://'));
  const [logoSrc, setLogoSrc] = useState('');

  useEffect(() => {
    setLogoSrc(isExternalLogo ? logo : `/dapp_logos/${formatName(name)}.svg`);
  }, [logo, name]);

  const handleError = () => {
    if (!isExternalLogo) {
      setLogoSrc(`/dapp_logos/${formatName(name)}.png`);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Box bgColor='white' rounded='16px' p='5' position='relative'>
      <Flex alignItems='center'>
        <Img src={logoSrc} rounded="10px" boxSize='40px' onError={handleError} />
        <Text ml='2' fontSize='lg' fontWeight="bold">
          {name}
        </Text>
        {!state && (
          <Badge colorScheme='red' position='absolute' top='10px' right='10px' color="#ed0000">
            Testing
          </Badge>
        )}
      </Flex>
      <Tooltip label={description} placement="top" aria-label="Full description">
        <Text mt='2'>{truncateText(description, 80)}</Text>
      </Tooltip>
      <Button mt='5' variant='outline' colorScheme='gray' rounded='full' as='a' href={url} target='_blank'>
        <ExternalLink>Visit Website</ExternalLink>
      </Button>
    </Box>
  );
};

export default DappItem;