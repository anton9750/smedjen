
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Logo = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
`;

const NavigationLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavigationLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  font: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

function Nav() {
  const { user, logout } = useAuth();

  return (
    <Navigation>
      <Logo>Smedjeshoppen</Logo>

      <NavigationLinks>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/shop">Shop</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/cart">Cart</NavigationLink>

        {user ? (
          <>
            <NavigationLink to="/account">My Account</NavigationLink>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavigationLink to="/login">Login</NavigationLink>
            <NavigationLink to="/register">Register</NavigationLink>
          </>
        )}
      </NavigationLinks>
    </Navigation>
  );
}

export default Nav;
