
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Smedjeshoppen. All rights reserved.</p>
    </FooterContainer>
  );
}

export default Footer;
