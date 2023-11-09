import React, { useEffect, useState } from "react";
import { Container, Box, Text } from "../components/Styled";
import axios from "axios";
import {
  ContextBox,
  RecommendItem,
  RecommendProduct,
} from "../components/RecommendProducts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { falseLoading, trueLoading } from "../store/loadingSlice";
import { RecommendContainer } from "./Home";

function BestPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);

  const getItem = async () => {
    axios
      .get(`best/item`)
      .then((res) => {
        setItem(res.data);
        dispatch(falseLoading());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(trueLoading());
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box $pd="30px 0" $mg="20px 0 0 0">
        <Text $s="32px" $fw="700">
          베스트 상품
        </Text>
      </Box>
      <RecommendContainer>
        {item &&
          item.map((item) => (
            <RecommendProduct
              key={item.id}
              onClick={() => navigate(`/${item.type}/${item.id}`)}
            >
              <RecommendItem src={item.src} />
              <ContextBox>
                <div>{item.title}</div>
                <div style={{ fontWeight: "bold" }}>
                  {item.price.toLocaleString()}원
                </div>
              </ContextBox>
            </RecommendProduct>
          ))}
      </RecommendContainer>
    </Container>
  );
}

export default BestPage;
