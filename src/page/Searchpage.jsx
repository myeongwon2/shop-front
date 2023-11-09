import React, { useEffect } from "react";
import { Container, Box, Text } from "../components/Styled";
import {
  ContextBox,
  RecommendItem,
  RecommendProduct,
} from "../components/RecommendProducts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trueLoading } from "../store/loadingSlice";
import { RecommendContainer } from "./Home";

function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useSelector((state) => {
    return state.search;
  });

  useEffect(() => {
    dispatch(trueLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box $pd="30px 0" $mg="20px 0 0px 0">
        <Text $s="26px" $fw="700">
          검색결과({search.length}개)
        </Text>
      </Box>
      <RecommendContainer>
        {search.length >= 1 ? (
          search.map((item) => (
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
          ))
        ) : (
          <Box $pd="160px 0" $mg="0 0 15px 0">
            <Text $w="100%" $s="16px">
              검색된 상품이 없습니다
            </Text>
          </Box>
        )}
      </RecommendContainer>
    </Container>
  );
}

export default SearchPage;
