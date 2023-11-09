import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { styled } from "styled-components";
import axios from "axios";
import RecommendProducts from "../components/RecommendProducts";
import { useDispatch } from "react-redux";
import { falseLoading, trueLoading } from "../store/loadingSlice";

function Home() {
  const [image, setImage] = useState([]);
  const [best, setBest] = useState([]);
  const [newItem, setNewItem] = useState([]);

  const dispatch = useDispatch();

  const fetchData = async (url, setStateFunction, limit) => {
    await axios
      .get(`${process.env.REACT_APP_API + url}`)
      .then((res) => {
        const items = limit ? res.data.slice(0, 8) : res.data;
        setStateFunction(items);
        dispatch(falseLoading());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(trueLoading());
    fetchData("carousel/item", setImage, false);
    fetchData("best/item", setBest, true);
    fetchData("new/item", setNewItem, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  letter-spacing: -1px;
  margin-bottom: 30px;
  word-break: break-word;
`;

export const RecommendContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 165px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Home;
