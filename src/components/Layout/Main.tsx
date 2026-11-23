
import type { ReactNode } from "react";
import styled from "styled-components";

type MainProps = {
  children: ReactNode;
};

const MainContainer = styled.main`
  flex: 1;
  width: 100%;
`;

function Main({ children }: MainProps) {
  return <MainContainer>{children}</MainContainer>;
}

export default Main;
