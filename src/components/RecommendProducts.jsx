import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function RecommendProducts({ products, type }) {
  const navigate = useNavigate();

  return products.map((item) => (
    <RecommendProduct
      key={item.id}
      onClick={() => navigate(`/${type}/${item.id}`)}
    >
      <RecommendItem src={item.src} />
      <ContextBox>
        <div>{item.title}</div>
        <div style={{ fontWeight: "bold" }}>
          {item.price.toLocaleString()}원
        </div>
      </ContextBox>
    </RecommendProduct>
  ));
}

export const RecommendProduct = styled.div`
  width: 24%;
  min-height: 360px;
  margin: 0px 0px 0px 0px;
  cursor: pointer;
  @media (max-width: 770px) {
    width: 48%;
    min-height: 250px;
  }
`;

export const enlargeAnimation = keyframes`
  0% {
    background-size: 100%;
  }
  100% {
    background-size: 105%;
  }
`;

export const RecommendItem = styled.div`
  height: 85%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;

  &:hover {
    animation: ${enlargeAnimation} 0.3s ease;
    background-size: 105%;
  }
`;

export const ContextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 17px;
`;

export default RecommendProducts;
