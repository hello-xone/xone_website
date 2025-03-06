import { ColorMode, extendTheme, localStorageManager } from '@chakra-ui/react';

export const Theme = extendTheme({
  fonts: {
    body: `"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    heading: `"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
  },
  colors: {
    steelGray: '#718096',
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
      '50': '#fff0f0',
      '100': '#ffdddd',
      '200': '#ffc0c0',
      '300': '#ff9494',
      '400': '#ff5757',
      // '500': '#ff2323',
      500: '#FF2F2F',
      '600': '#ed0000',
      '700': '#d70000',
      '800': '#b10303',
      '900': '#920a0a',
      '950': '#500000'
    }
  },
  components: {
    Button: {
      sizes: {
        '2xl': {
          h: '64px', // 设置按钮高度
          fontSize: '16px', // 文字大小
          px: '30px' // 内边距
        }
      }
    },
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
