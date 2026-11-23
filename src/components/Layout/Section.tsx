
import type { ReactNode } from "react";
import styled from "styled-components";

type SectionProps = {
  children: ReactNode;
};

const StyledSection = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

function Section({ children }: SectionProps) {
  return <StyledSection>{children}</StyledSection>;
}

export default Section;
