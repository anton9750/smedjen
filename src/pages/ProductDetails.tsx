
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useProduct from "../hooks/useProduct";
import useCart from "../hooks/useCart";
import { getImageUrl } from "../services/apiConfig";

import Button from "../../src/ui/Button";
import Section from "../components/Layout/Section";
import ContentWrapper from "../components/Layout/ContentWrapper";

// Main product layout
const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Image gallery
const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MainImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ThumbnailList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const Thumbnail = styled.img<{ $active: boolean }>`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;

  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};

  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

// Product information
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProductName = styled.h1`
  font-size: 2rem;
`;

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ProductPrice = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

function ProductDetails() {
  const { id } = useParams();

  const { data: product, loading, error } = useProduct(id);

  const { addToCart } = useCart();

  const [gallery, setGallery] = useState({
    productId: id,
    selectedImage: 0,
  });

  const selectedImage =
    gallery.productId === id ? gallery.selectedImage : 0;

  function selectImage(index: number) {
    setGallery({
      productId: id,
      selectedImage: index,
    });
  }

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const images = product.images ?? [];
  const currentImage = images[selectedImage];

  return (
    <Section>
      <ContentWrapper>
        <ProductContainer>
          <ImageGallery>
            {currentImage ? (
              <MainImage
                src={getImageUrl(currentImage.path)}
                alt={currentImage.alt || product.name}
              />
            ) : (
              <NoImage>No image available</NoImage>
            )}

            <ThumbnailList>
              {images.map((image, index) => (
                <Thumbnail
                  key={image.id}
                  src={getImageUrl(image.path)}
                  alt={image.alt || product.name}
                  $active={selectedImage === index}
                  onClick={() => selectImage(index)}
                />
              ))}
            </ThumbnailList>
          </ImageGallery>

          <ProductInfo>
            <ProductName>{product.name}</ProductName>

            <ProductDescription>
              {product.description}
            </ProductDescription>

            <ProductPrice>
              {Number(product.price).toFixed(2)} DKK
            </ProductPrice>

            <Button onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </ProductInfo>
        </ProductContainer>
      </ContentWrapper>
    </Section>
  );
}

export default ProductDetails;

