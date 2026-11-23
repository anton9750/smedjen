
import { useState } from "react";
import styled from "styled-components";

import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";

import ProductCard from "../components/products/ProductCard";
import Section from "../components/Layout/Section";
import ContentWrapper from "../components/Layout/ContentWrapper";

const CategoryList = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px 0;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};

  color: ${({ theme }) => theme.colors.text};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
`;

function Shop() {
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  if (productsLoading || categoriesLoading) {
    return <p>Loading shop...</p>;
  }

  if (productsError || categoriesError) {
    return <p>Error: {productsError || categoriesError}</p>;
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  return (
    <Section>
      <ContentWrapper>
        <h1>Our Shop</h1>

        <CategoryList>
          <CategoryButton
            $active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </CategoryButton>

          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              $active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoryList>

        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              images={product.images}
            />
          ))}
        </ProductGrid>
      </ContentWrapper>
    </Section>
  );
}

export default Shop;
