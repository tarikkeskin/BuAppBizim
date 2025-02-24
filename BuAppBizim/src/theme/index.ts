import { DefaultTheme } from 'styled-components';

const theme = {
  colors: {
    background: '#FFFFFF',
    primary: '#007AFF',
    secondary: '#5856D6',
    text: '#000000',
    error: '#FF3B30'
  }
} as const;

export type Theme = typeof theme;
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme; 