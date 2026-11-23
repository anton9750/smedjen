
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCart from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL } from "../services/apiConfig";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textMuted};
`;

const Total = styled.h3`
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.textMuted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  color: inherit;
  font: inherit;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 14px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font: inherit;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
`;

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingName,
          shippingAddress,
          postalCode,
          city,
          country,
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      clearCart();
      navigate("/order-confirmation", {
        state: { order: data.order ?? data },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <Container>
        <p>
          Please <Link to="/login">log in</Link> before checking out.
        </p>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container>
        <Heading>Checkout</Heading>
        <p>Your cart is empty.</p>
        <Link to="/shop">Return to shop</Link>
      </Container>
    );
  }

  return (
    <Container>
      <Heading>Checkout</Heading>

      <Section>
        <SectionTitle>Order Summary</SectionTitle>

        {cartItems.map((item) => (
          <OrderItem key={item.product.id}>
            <span>
              {item.product.name} Ã— {item.quantity}
            </span>
            <span>
              {(Number(item.product.price) * item.quantity).toFixed(2)} DKK
            </span>
          </OrderItem>
        ))}

        <Total>Total: {total.toFixed(2)} DKK</Total>
      </Section>

      <Section>
        <SectionTitle>Shipping Information</SectionTitle>

        <CheckoutForm onSubmit={handleSubmit}>
          <Input
            placeholder="Full name"
            value={shippingName}
            onChange={(e) => setShippingName(e.target.value)}
            required
          />

          <Input
            placeholder="Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />

          <Input
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />

          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <Input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </SubmitButton>
        </CheckoutForm>
      </Section>
    </Container>
  );
}

export default Checkout;

