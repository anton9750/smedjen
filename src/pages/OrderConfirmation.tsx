
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

type Order = {
  id: number;
  total: string;
  items: {
    productName: string;
    unitPrice: string;
    quantity: number;
  }[];
};

const Container = styled.div`
  max-width: 750px;
  margin: 60px auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SuccessMessage = styled.p`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textMuted};
`;

const Total = styled.h2`
  text-align: right;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const ShopLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order as Order | undefined;

  if (!order) {
    return (
      <Container>
        <Card>
          <Heading>No order found</Heading>
          <ShopLink to="/shop">Return to shop</ShopLink>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Heading>Thank You for Your Order!</Heading>

        <SuccessMessage>
          Your order has been placed successfully.
        </SuccessMessage>

        <h2>Order #{order.id}</h2>

        <h3>Order Summary</h3>

        {order.items.map((item, index) => (
          <OrderItem key={index}>
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span>
              {(Number(item.unitPrice) * item.quantity).toFixed(2)} DKK
            </span>
          </OrderItem>
        ))}

        <Total>
          Total: {Number(order.total).toFixed(2)} DKK
        </Total>

        <ShopLink to="/shop">Continue Shopping</ShopLink>
      </Card>
    </Container>
  );
}

export default OrderConfirmation;
