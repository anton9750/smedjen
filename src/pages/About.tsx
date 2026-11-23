import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const AboutContainer = styled.section`
  width: min(100% - 32px, 850px);
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.15rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Copy = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ShopLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

function About() {
  return (
    <AboutContainer>
      <Heading>About Smedjeshoppen</Heading>
      <Intro>
        Welcome to Smedjeshoppen, your place to explore medieval-inspired
        weapons, armor, and equipment.
      </Intro>
      <Copy>
        Whether you are looking for a sword, an axe, or another piece of
        adventure-ready gear, our shop brings the collection together in one
        place. Browse the products, compare details, and find the item that
        catches your eye.
      </Copy>
      <Copy>
        Take a look around, and if you have questions about an item, please get
        in touch with us.
      </Copy>
      <ShopLink to="/shop" aria-label="Browse the Smedjeshoppen shop">
        <Button type="button">Browse the Shop</Button>
      </ShopLink>
    </AboutContainer>
  );
}

export default About;
