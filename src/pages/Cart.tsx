
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { getImageUrl } from "../services/apiConfig";

const CartContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin: 20px 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const CartImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const CheckoutButton = styled.button`
  padding: 12px 24px;
  margin-top: 20px;
  cursor: pointer;
`;

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <CartContainer>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.product.id}>
              {item.product.images.length > 0 && (
                <CartImage
                  src={getImageUrl(item.product.images[0].path)}
                  alt={item.product.name}
                />
              )}

              <div>
                <h3>{item.product.name}</h3>
                <p>{Number(item.product.price).toFixed(2)} DKK</p>

                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span> {item.quantity} </span>

                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>

                <button onClick={() => removeFromCart(item.product.id)}>
                  Remove
                </button>
              </div>
            </CartItem>
          ))}

          <h2>Total: {total.toFixed(2)} DKK</h2>

          <CheckoutButton onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </CheckoutButton>
        </>
      )}
    </CartContainer>
  );
}

export default Cart;

