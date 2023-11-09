import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import favorImg from "../img/favorite_true.png";
import { favorAdd, favorCheck } from "../store/favorSlice";
import { falseLoading, trueLoading } from "../store/loadingSlice";
import { Box, Button, Text } from "../components/Styled";

function Favorite() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });
  const favor = useSelector((state) => {
    return state.favor;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(falseLoading());
    dispatch(favorCheck(user.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favor.origin]);

  return (
    <Container>
      <Box $bb="2px solid #ebeef2" $mg="-98px 0 0 ">
        <Title $ta="left">찜한 목록</Title>
      </Box>
      <RecommendContainer>
        {favor.user_init.length === 0 ? (
          <Box $fd="column" $pd="120px 0" $bb="2px solid ebeef2">
            <Text $lh="3" $s="28px" $ta="center">
              찜한 상품이 없습니다
            </Text>
            <Button
              onClick={() => {
                navigate("/");
                dispatch(trueLoading());
                setTimeout(() => {
                  dispatch(falseLoading());
                }, 500);
              }}
              $pd="5px 50px"
              $lh="2"
              $fw="700"
            >
              <Text $s="20px">쇼핑 하러 가기</Text>
            </Button>
          </Box>
        ) : (
          favor.user_init.map((item) => (
            <RecommendProduct
              key={item.id}
              onClick={() => navigate(`/${item.type}/${item.id}`)}
            >
              <RecommendItem $src={item.src} />
              <FavorImg
                $src={favorImg}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(favorAdd({ data: item, user: user }));
                }}
              />
              <ContextBox>
                <div>{item.title}</div>
                <div style={{ fontWeight: "bold" }}>
                  {item.price.toLocaleString()}원
                </div>
              </ContextBox>
            </RecommendProduct>
          ))
        )}
      </RecommendContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1220px;
  min-height: 64vh;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  font-size: 32px;
  font-weight: 700;
  line-height: 3;
  margin-top: 127px;
  text-align: ${(props) => props.$ta};
`;

const RecommendContainer = styled.div`
  width: 101.2%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid #ebeef2;
  margin-bottom: 100px;
  padding: 30px 0;
`;

const RecommendProduct = styled.div`
  width: 24%;
  height: 350px;
  /* border: 1px solid black; */
  margin: 15px 12px 0 0px;
  cursor: pointer;
  @media (max-width: 770px) {
    width: 48%;
  }
`;

const enlargeAnimation = keyframes`
  0% {
    background-size: 100%;
  }
  100% {
    background-size: 105%;
  }
`;

const RecommendItem = styled.div`
  height: 90%;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;

  &:hover {
    animation: ${enlargeAnimation} 0.3s ease;
    background-size: 105%;
  }
`;

const FavorImg = styled.div`
  height: 10%;
  width: 10%;
  z-index: 999;
  margin: -40px 0px 0px 250px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

const ContextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 17px;
`;

export default Favorite;
