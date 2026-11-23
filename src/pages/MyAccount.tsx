
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL } from "../services/apiConfig";

type Order = {
  id: number;
  status: string;
  total: string;
  createdAt: string;
  items: {
    productName: string;
    unitPrice: string;
    quantity: number;
  }[];
};

const Container = styled.div`
  max-width: 1100px;
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

const OrderCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.textMuted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
`;

const OrderTotal = styled.h3`
  text-align: right;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  color: #d9534f;
`;

function MyAccount() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        setOrders(data.orders);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load orders"
        );
      }
    }

    if (token) fetchOrders();
  }, [token]);

  return (
    <Container>
      <Heading>My Account</Heading>

      <Section>
        <SectionTitle>Account Details</SectionTitle>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </Section>

      <Section>
        <SectionTitle>My Orders</SectionTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {orders.length === 0 && !error && (
          <p>You haven't placed any orders yet.</p>
        )}

        {orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <div>
                <h3>Order #{order.id}</h3>
                <p>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p><strong>Status:</strong> {order.status}</p>
            </OrderHeader>

            {order.items.map((item, index) => (
              <OrderItem key={index}>
                <span>
                  {item.productName} Ã— {item.quantity}
                </span>
                <span>
                  {(Number(item.unitPrice) * item.quantity).toFixed(2)} DKK
                </span>
              </OrderItem>
            ))}

            <OrderTotal>
              Total: {Number(order.total).toFixed(2)} DKK
            </OrderTotal>
          </OrderCard>
        ))}
      </Section>
    </Container>
  );
}

export default MyAccount;

