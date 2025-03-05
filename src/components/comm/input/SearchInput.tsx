import { Box, Flex, FlexProps, Icon, Input } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { CiSearch } from 'react-icons/ci';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?(val: string): void;
} & FlexProps;

const SearchInput = (props: Props) => {
  const { value, placeholder, onChange, ...rest } = props;
  return (
    <Flex
      alignItems='center'
      border='1px solid #D4D6D9'
      px='5'
      py='2'
      h='40px'
      rounded='full'
      {...rest}
      css={css`
        :has(input:focus) {
          border-color: #ed0000;
        }
      `}
    >
      <Icon as={CiSearch} mr='2' />
      <Box flex='1 0 0'>
        <Input
          variant='unstyled'
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </Box>
    </Flex>
  );
};

export default SearchInput;
