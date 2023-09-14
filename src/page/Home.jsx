import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { styled } from "styled-components";
import axios from "axios";
import RecommendProducts from "../components/RecommendProducts";

function Home() {
  const [image, setImage] = useState([]);
  const [best, setBest] = useState([]);
  const [newItem, setNewItem] = useState([]);

  const fetchData = async (url, setStateFunction, limit) => {
    try {
      const response = await axios.get(url);
      const items = limit ? response.data.slice(0, 8) : response.data;
      setStateFunction(items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("/carousel/item", setImage, false);
    fetchData("/best/item", setBest, true);
    fetchData("/new/item", setNewItem, true);
  }, []);

  return (
    <div>
      <Carousel image={image} />
      <Container>
        <Title>베스트 추천 상품</Title>
        <RecommendContainer>
          {best && <RecommendProducts products={best} type={"best"} />}
        </RecommendContainer>
        <Title>신상 추천 상품</Title>
        <RecommendContainer>
          {newItem && <RecommendProducts products={newItem} type={"new"} />}
        </RecommendContainer>
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #202429;
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  letter-spacing: -4px;
  margin-bottom: 30px;
  word-break: break-word;
`;

const RecommendContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Home;
