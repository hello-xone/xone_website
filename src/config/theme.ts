import { ColorMode, extendTheme, localStorageManager } from '@chakra-ui/react';

export const Theme = extendTheme({
  fonts: {
    body: `"Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    heading: `"Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
  },
  colors: {
    priBlack: {
      100: '#e0e0e0',
      200: '#bdbdbd',
      300: '#9e9e9e',
      400: '#616161',
      500: '#000000', // 纯黑
      600: '#2a2a2a', // 明显的灰色，hover 时更亮
      700: '#4d4d4d',
      800: '#6d6d6d',
      900: '#8d8d8d'
    },
    red: {
      pri: '#ED0000'
    },
    priRed: {
      100: '#FEDCCB',
      200: '#FDB297',
      300: '#F97D63',
      400: '#F44C3D',
      500: '#ED0000',
      600: '#CB0011',
      700: '#AA001D',
      800: '#890023',
      900: '#710027'
    }
  },
  components: {
    Container: {
      baseStyle: {
        width: '100%',
        mx: 'auto',
        maxW: {
          base: '100%', // 在最小断点下（base）宽度为100%
          sm: '640px', // 在sm断点及以上宽度为640px
          md: '768px', // 在md断点及以上宽度为768px
          lg: '1024px', // 在lg断点及以上宽度为1024px
          xl: '1280px', // 在xl断点及以上宽度为1280px
          '2xl': '1536px' // 在2xl断点及以上宽度为1536px
        }
      }
    }
  }
});
console.log(Theme);

export const customColorModeManager = {
  ...localStorageManager,
  get: (): ColorMode => 'light'
};
