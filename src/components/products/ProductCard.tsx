
import styled from "styled-components";
import { Link } from "react-router-dom";

import type { ProductImage } from "../../hooks/useProducts";
import { getImageUrl } from "../../services/apiConfig";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
};

const Card = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};

  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const ProductImageElement = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const ProductName = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ProductPrice = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

function ProductCard({ id, name, price, images }: ProductCardProps) {
  const imageUrl = images.length > 0
    ? getImageUrl(images[0].path)
    : null;

  return (
    <Card to={`/product/${id}`}>
      {imageUrl && (
        <ProductImageElement
          src={imageUrl}
          alt={images[0].alt || name}
        />
      )}

      <ProductName>{name}</ProductName>

      <ProductPrice>{price.toFixed(2)} DKK</ProductPrice>
    </Card>
  );
}

export default ProductCard;

