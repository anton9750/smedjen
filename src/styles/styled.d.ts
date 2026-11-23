
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      surfaceLight: string;
      primary: string;
      primaryHover: string;
      secondary: string;
      text: string;
      textMuted: string;
      border: string;
      danger: string;
    };

    fonts: {
      primary: string;
      heading: string;
    };

    layout: {
      contentWidth: string;
    };

    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };

    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };

    transitions: {
      default: string;
    };
  }
}
