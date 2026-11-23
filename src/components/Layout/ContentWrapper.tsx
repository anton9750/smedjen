
import type { ReactNode } from "react";
import styled from "styled-components";

type ContentWrapperProps = {
  children: ReactNode;
  backgroundColor?: string;
  padding?: number;
  maxWidth?: number;
};

const Wrapper = styled.div<{
  $backgroundColor?: string;
  $padding: number;
  $maxWidth: number;
}>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  margin: 0 auto;
  padding: ${({ $padding }) => $padding}px;
  background-color: ${({ $backgroundColor }) => $backgroundColor || "transparent"};
`;

function ContentWrapper({
  children,
  backgroundColor,
  padding = 16,
  maxWidth = 1200,
}: ContentWrapperProps) {
  return (
    <Wrapper
      $backgroundColor={backgroundColor}
      $padding={padding}
      $maxWidth={maxWidth}
    >
      {children}
    </Wrapper>
  );
}

export default ContentWrapper;
