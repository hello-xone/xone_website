import 'rc-picker/assets/index.css';
import '@/assets/style/picker.less';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { RangePicker } from 'rc-picker';
import generateConfig from 'rc-picker/lib/generate/dayjs';
import enUS from 'rc-picker/lib/locale/en_US';
import { useEffect, useMemo, useState } from 'react';
import { LuCalendarDays } from 'react-icons/lu';
import { RiArrowDownSLine } from 'react-icons/ri';

import { Api_Release, ReleaseRecord } from '@/api/release';
import ExternalLink from '@/components/comm/ExternalLink';
import SearchInput from '@/components/comm/input/SearchInput';
import { formatAddress } from '@/utils/format/address';
import { debounce } from '@/utils/helper';

import ReleaseTable from '../components/ReleaseTable';

type Props = {};

dayjs.extend(utc);
dayjs.extend(timezone);

// 限制时区选项
const ALLOWED_TIMEZONES = [
  { label: 'UTC+0', value: 'UTC' },
  { label: 'UTC+1', value: 'Europe/Paris' },
  { label: 'UTC+7', value: 'Asia/Bangkok' },
  { label: 'UTC+8', value: 'Asia/Singapore' },
  { label: 'UTC+9', value: 'Asia/Tokyo' },
  { label: 'UTC-8', value: 'America/Los_Angeles' }
];

const Records = (props: Props) => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [searchValue, setSearchValue] = useState('');
  const [records, setRecords] = useState<ReleaseRecord[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Asia/Singapore');

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(1, value);
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // 设置默认时间范围为最近7天
  useEffect(() => {
    const end = dayjs();
    const start = end.subtract(7, 'day');
    setStartDate(start);
    setEndDate(end);
    onSearch(1, searchValue, start, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 验证时间范围
  const validateDateRange = (start: any, end: any) => {
    if (!start || !end) return true;
    const diff = end.diff(start, 'hour');
    return diff >= 1 && diff <= 2160; // 1小时到90天
  };

  const onChange = (dates: any) => {
    const [start, end] = dates || [];
    if (!validateDateRange(start, end)) {
      // 显示错误提示
      return;
    }
    setStartDate(start);
    setEndDate(end);
    onSearch(1, searchValue, start, end);
  };

  // 处理回车搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(1, searchValue);
    }
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(e.target.value);
  };

  const convertToUTC = (date: any) => {
    return date.unix() * 1000;
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const onSearch = async (
    page?: number,
    searchText?: string,
    start?: any,
    end?: any
  ) => {
    try {
      setLoading(true);
      const res: any = await Api_Release.releaseRecords({
        startTime: start ? convertToUTC(start) : undefined,
        endTime: end ? convertToUTC(end) : undefined,
        pageNum: page || 1,
        pageSize: 10,
        address: searchText || undefined,
      });

      const newRecords = res.result.records;
      if (page && page > 1) {
        setRecords((prev) => [...prev, ...newRecords]);
        setPageNum(page);
      } else {
        setRecords(newRecords);
        setPageNum(1);
      }

      // 检查是否还有更多数据
      setHasMore(res.result.current < res.result.pages);
    } catch (error) {
      console.log('error=========', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = pageNum + 1;
    onSearch(nextPage, searchValue, startDate, endDate);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Box mt='24px'>
      <Container
        position='relative'
        bgColor='white'
        p={{ base: '20px 20px', lg: '30px 50px' }}
        rounded='xl'
      >
        <Heading size='md'>Important Information</Heading>
        <Flex alignItems='center' mt='5'>
          <Text fontSize='sm' fontWeight='bold'>
            Release contract:
          </Text>
          <ExternalLink
            ml='2'
            color='red.pri'
            to={`${import.meta.env.VITE_APP_MAIN_BLOCK_EXPLORER_URL}/address/${import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS}`}
          >
            <Text color='red.pri' display={{ base: 'none', md: 'block' }}>
              {import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS}
            </Text>
            <Text color='red.pri' display={{ base: 'block', md: 'none' }}>
              {formatAddress(import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS)}
            </Text>
          </ExternalLink>
        </Flex>

        <Flex alignItems='center' mt='5'>
          <RangePicker
            value={[startDate, endDate]}
            locale={enUS}
            generateConfig={generateConfig}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            suffixIcon={<LuCalendarDays />}
            onChange={onChange}
          />

          <Select
            value={selectedTimezone}
            onChange={handleTimezoneChange}
            rounded='full'
            w={{ base: '100%', md: '164px' }}
            focusBorderColor='red.pri'
            ml='16px'
            defaultValue="Asia/Singapore" // UTC+8
          >
            {ALLOWED_TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </Select>

          <SearchInput
            placeholder='Search Address'
            w={{ base: '100%', md: '320px' }}
            ml='auto'
            value={searchValue}
            onChange={(value: any) => handleSearch(value)}
            onKeyPress={handleKeyPress}
          />
        </Flex>

        <Box mt='5'>
          {records.length > 0 ? (
            <ReleaseTable
              records={records}
            />
          ) : (
            <Text textAlign="center" py={8}>
              No matching data found!
            </Text>
          )}
          {/* load more */}
          <Flex justifyContent='center'>
            {hasMore && (
              <Button
                variant='plain'
                onClick={handleLoadMore}
                isDisabled={loading}
              >
                {loading ? <Spinner size='sm' mr='2' /> : null}
                Load More <RiArrowDownSLine />
              </Button>
            )}
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Records;
