
import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Button = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export default Button;
