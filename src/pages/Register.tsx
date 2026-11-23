
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

const RegisterForm = styled.form`
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

const RegisterButton = styled.button`
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

const LoginText = styled.p`
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function Register() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await register(name, email, password);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed"
      );
    }
  }

  return (
    <Container>
      <RegisterForm onSubmit={handleSubmit}>
        <Heading>Create Account</Heading>

        <Input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <RegisterButton type="submit">Register</RegisterButton>

        <LoginText>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginText>
      </RegisterForm>
    </Container>
  );
}

export default Register;
