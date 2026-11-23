import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const HomeContainer = styled.section`
  display: flex;
  min-height: 55vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: clamp(2rem, 5vw, 3.5rem);
`;

const Description = styled.p`
  max-width: 560px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1.1rem;
`;

const ShopLink = styled(Link)`
  display: inline-block;
`;

function Home() {
  return (
    <HomeContainer>
      <Heading>Welcome to Smedjeshoppen</Heading>
      <Description>
        Discover medieval weapons, armor and equipment made for your next
        adventure.
      </Description>
      <ShopLink to="/shop" aria-label="Explore the shop">
        <Button type="button">Explore Shop</Button>
      </ShopLink>
    </HomeContainer>
  );
}

export default Home;
