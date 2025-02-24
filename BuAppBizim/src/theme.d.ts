import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      // Add other theme colors
    };
  }
} 