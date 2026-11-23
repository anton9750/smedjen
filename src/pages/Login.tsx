
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

const Container = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const Heading = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.textMuted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  color: inherit;
  font: inherit;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const LoginButton = styled.button`
  padding: 14px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font: inherit;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  text-align: center;
`;

const RegisterText = styled.p`
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Heading>Welcome Back</Heading>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginButton type="submit">Login</LoginButton>

        <RegisterText>
          Don't have an account? <Link to="/register">Register here</Link>
        </RegisterText>
      </LoginForm>
    </Container>
  );
}

export default Login;
