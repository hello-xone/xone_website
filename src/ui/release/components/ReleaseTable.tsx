import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { formatUnits } from 'viem';

import { ReleaseRecord } from '@/api/release';
import { formatAddress } from '@/utils/format/address';
import { formatReleaseNumber } from '@/utils/format/number';


type Props = {
  records?: ReleaseRecord[];
};

const ReleaseTable = (props: Props) => {
  const { records = [] } = props;

  // 使用useBreakpointValue判断是否为移动端
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <TableContainer
        css={css`
          thead {
            background-color: #f2f4f8;
            th {
              text-transform: initial;
            }
          }
          tbody {
            > tr {
              transition: 0.2s all;
              &:hover {
                background-color: #ed0000;
                color: white;
              }
            }
          }
        `}
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Address</Th>
              <Th>Date</Th>
              <Th>Amount (XOC)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.length ? records.map((record) => (
              <Tr key={record.id}>
                <Td>{isMobile ? formatAddress(record.address) : record.address}</Td>
                <Td>{record.createdTime}</Td>
                <Td>{formatReleaseNumber(formatUnits(BigInt(record.amountStr), 18))}</Td>
              </Tr>
            )) : (
              <Tr>
                <Td colSpan={3} textAlign="center" py="10">
                  No Data
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReleaseTable;
