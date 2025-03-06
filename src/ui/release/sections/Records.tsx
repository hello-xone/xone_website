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
import { Toast } from '@/components/Toast';
import { formatAddress } from '@/utils/format/address';
import { debounce } from '@/utils/helper';

import ReleaseTable from '../components/ReleaseTable';
import { useReleaseContext } from '../context/hooks';

type Props = {};

dayjs.extend(utc);
dayjs.extend(timezone);

// 限制时区选项
const ALLOWED_TIMEZONES = [
  { label: 'UTC-8', value: 'Etc/GMT+8' },       // 固定偏移
  { label: 'UTC+0', value: 'UTC' },        // 固定偏移
  { label: 'UTC+1', value: 'Etc/GMT-1' },      // 固定偏移
  { label: 'UTC+7', value: 'Asia/Bangkok' },   // 地理时区（无夏令时）
  { label: 'UTC+8', value: 'Asia/Singapore' },  // 地理时区（无夏令时）
  { label: 'UTC+9', value: 'Asia/Tokyo' },      // 地理时区（无夏令时）
];

type SearchData = {
  pageNum: number;
  startDate: any;
  endDate: any;
  timezone: string;
  searchValue: string;
};

const Records = (props: Props) => {
  const [searchData, setSearchData] = useState<SearchData>({
    pageNum: 1,
    startDate: dayjs().subtract(7, 'day'),
    endDate: dayjs(),
    timezone: 'Asia/Singapore',
    searchValue: '',
  });

  const { recordsRefreshCount } = useReleaseContext();

  const [inputValue, setInputValue] = useState('');
  const [records, setRecords] = useState<ReleaseRecord[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  // 使用 useMemo 包装防抖函数
  const handleDebounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateSearchData({
          searchValue: value
        });
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // updateSearchData 是稳定的引用,不需要加入依赖
  );


  useEffect(() => {
    handleDebounceSearch(inputValue);
  }, [inputValue, handleDebounceSearch]);

  const updateSearchData = (updates: Partial<typeof searchData>) => {
    setSearchData(prev => ({
      ...prev,
      ...updates,
      pageNum: updates.pageNum ?? 1
    }));
  };


  const fetchData = async () => {
    const { startDate, endDate, pageNum, timezone, searchValue } = searchData;

    try {
      setLoading(true);
      const params = {
        startTime: startDate ? convertToUTC(startDate, timezone) : undefined,
        endTime: endDate ? convertToUTC(endDate, timezone) : undefined,
        pageNum,
        pageSize: 10,
        address: searchValue,
      };
      console.log('---params---', params);
      const res: any = await Api_Release.releaseRecords(params);

      const newRecords = res.result.records;
      if (pageNum > 1) {
        setRecords(prev => [...prev, ...newRecords]);
      } else {
        setRecords(newRecords);
      }
      setHasMore(res.result.current < res.result.pages);
    } catch (error) {
      console.log('error=========', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log('recordsRefreshCount', recordsRefreshCount);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData, recordsRefreshCount]);



  const handleLoadMore = () => {
    updateSearchData({
      pageNum: searchData.pageNum + 1
    });
  };

  const handleSearch = (value: string | React.FormEvent<HTMLDivElement>) => {
    const searchValue = typeof value === 'string' ? value : '';
    setInputValue(searchValue);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchData({ timezone: e.target.value });
  };

  const onChange = (dates: any) => {
    const [startDate, endDate] = dates || [];
    if (!validateDateRange(startDate, endDate)) {
      return;
    }
    console.log('---onChange2---', startDate, endDate);
    updateSearchData({
      startDate,
      endDate,
    });
  };


  // 验证时间范围
  const validateDateRange = (start: any, end: any) => {
    if (!start && !end) return true;
    if (!start || !end) return false;
    const diff = end.diff(start, 'hour');
    if (diff < 1) {
      Toast.error('The time range cannot be less than 1 hour');
      return false;
    } else if (diff > 2160) {
      Toast.error('The time range cannot be greater than 90 days');
      return false;
    }
    return diff >= 1 && diff <= 2160; // 1小时到90天
  };

  const convertToUTC = (date: any, timezone?: string) => {
    if (!date) return undefined;
    const zonedDate = date.tz(timezone, false);
    return new Date(zonedDate.format('YYYY-MM-DD HH:ss:ss')).getTime()
  };


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

        <Flex alignItems='center' mt='5' gap={{ base: '10px', md: '16px' }}>
          <RangePicker
            value={[searchData.startDate, searchData.endDate]}
            locale={enUS}
            generateConfig={generateConfig}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            suffixIcon={<LuCalendarDays />}
            onChange={onChange}
          />

          <Select
            value={searchData.timezone}
            onChange={handleTimezoneChange}
            rounded='full'
            w={{ base: '100%', md: '164px' }}
            focusBorderColor='red.pri'
            defaultValue="Asia/Singapore"
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
            value={inputValue}
            onChange={handleSearch}
            className='search-input'
          />
        </Flex>

        <Box mt='5'>
          {records.length > 0 ? (
            <ReleaseTable records={records} timezone={searchData.timezone} />
          ) : (
            <Text textAlign="center" py={8}>
              No matching data found!
            </Text>
          )}
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
