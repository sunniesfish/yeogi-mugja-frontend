import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      InnerColor: string;
      InnerTextColor: string;
      TitleTextColor: string;
      bgColor: string;
    };
  }
}
