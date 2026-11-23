import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL } from "../services/apiConfig";

type OrderItem = {
  id?: number;
  productName: string;
  unitPrice: number | string;
  quantity: number;
};

type Order = {
  id: number;
  status: string;
  total: number | string;
  createdAt: string;
  items: OrderItem[];
};

type OrdersResponse = {
  orders: Order[];
  message?: string;
};

const Container = styled.div`
  width: min(100% - 32px, 900px);
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
`;

const OrderCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 1.15rem;
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  }
`;

const Status = styled.span`
  display: inline-block;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  padding: 6px 12px;
  text-transform: capitalize;
  font-size: 0.9rem;
`;

const Items = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} 0;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const Total = styled.p`
  text-align: right;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
`;

const Message = styled.p`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ErrorMessage = styled(Message)`
  color: #f28b82;
`;

const ActionLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primaryHover};
`;

function formatPrice(value: number | string) {
  const amount = Number(value);
  return `${Number.isFinite(amount) ? amount.toFixed(2) : "0.00"} DKK`;
}

function OrderHistory() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadOrders() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await response.json()) as OrdersResponse;

        if (!response.ok) {
          throw new Error(data.message || "We couldn't load your orders.");
        }

        if (isCurrent) setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (err) {
        if (isCurrent) {
          setError(err instanceof Error ? err.message : "We couldn't load your orders.");
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    void loadOrders();
    return () => {
      isCurrent = false;
    };
  }, [token]);

  return (
    <Container>
      <Heading>Order History</Heading>
      <Intro>View the details and status of your previous orders.</Intro>

      {!token ? (
        <Message>
          Please <ActionLink to="/login">log in</ActionLink> to see your orders.
        </Message>
      ) : isLoading ? (
        <Message>Loading your orders…</Message>
      ) : error ? (
        <ErrorMessage role="alert">{error}</ErrorMessage>
      ) : orders.length === 0 ? (
        <Message>
          You haven’t placed an order yet. <ActionLink to="/shop">Browse the shop</ActionLink>.
        </Message>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <div>
                <h2>Order #{order.id}</h2>
                <p>
                  Placed {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Status>{order.status}</Status>
            </OrderHeader>

            <Items>
              {order.items.map((item, index) => (
                <Item key={item.id ?? `${item.productName}-${index}`}>
                  <span>{item.productName} × {item.quantity}</span>
                  <span>{formatPrice(Number(item.unitPrice) * item.quantity)}</span>
                </Item>
              ))}
            </Items>

            <Total>Total: {formatPrice(order.total)}</Total>
          </OrderCard>
        ))
      )}
    </Container>
  );
}

export default OrderHistory;

