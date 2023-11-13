import React, { useEffect } from "react";
import styled from "styled-components";
import cartImg from "../img/shopping_cart_icon.png";
import favorImg from "../img/favorite_heart_like_likes_love_icon.png";
import favorTrue from "../img/favorite_true.png";
import { useDispatch, useSelector } from "react-redux";
import { addItem, buyNow } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { changePay } from "../store/payment";
import { favorAdd, favorCheck } from "../store/favorSlice";

function DetailContext({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => {
    return state.cart;
  });
  const user = useSelector((state) => {
    return state.user;
  });
  const favor = useSelector((state) => {
    return state.favor;
  });

  useEffect(() => {
    dispatch(favorCheck(user.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favor.origin]);

  const newfavor = favor.user_init.filter((item) => item.id === data[0].id);

  const handleAddToCart = () => {
    const itemIndex = cart.user_init.findIndex((i) => i.id === data[0].id);

    if (itemIndex === -1) {
      const userConfirmed = window.confirm(
        "장바구니 페이지로 이동하시겠습니까?"
      );
      if (userConfirmed) {
        dispatch(addItem({ data: data[0], user: user }));
        navigate("/cart");
      } else {
        dispatch(addItem({ data: data[0], user: user }));
      }
    } else {
      alert("중복");
    }
  };

  return (
    <Container>
      <TopBox>
        <Context $size={"26px"} $margin={"0 0 10px 0"}>
          {data[0].title}
        </Context>
        <Style $margin={"0 0 20px 0"}>
          <Context $size={"20px"}>
            <Price>{data[0].price.toLocaleString()}</Price>원
          </Context>
          <CouponBtn
            onClick={() => {
              alert("사용 가능한 쿠폰이 없습니다.");
            }}
          >
            쿠폰받기
          </CouponBtn>
        </Style>
        <TotalContainer>
          <Style $pd={"15px 20px"}>
            <TotalContext>최종 예상 구매가</TotalContext>
            <Context $size={"20px"} $color={"#ff204b"}>
              <Price>{data[0].price.toLocaleString()}</Price>원
            </Context>
          </Style>
        </TotalContainer>
        <LinePlace />
        <Context>
          <DriveContext>
            <div>배송정보</div>
            <div style={{ color: "#007bff" }}>내일 도착 예정</div>
          </DriveContext>
        </Context>
        <LinePlace />
      </TopBox>
      <BottomBox>
        <Style $margin={"0 0 5px 0"}>
          <Context $size={"18px"}>상품 금액</Context>
          <Context $size={"20px"} $color={"#ff204b"}>
            <Price>{data[0].price.toLocaleString()}</Price>원
          </Context>
        </Style>
        <PayBox>
          <BuyBtn
            href="#"
            $backColor={"#1e1e1e"}
            onClick={() => {
              dispatch(changePay("kcp"));
              dispatch(buyNow({ data: data[0], user: user }));
              navigate("/payment");
            }}
          >
            바로 구매
          </BuyBtn>
          <BuyBtn
            href="#"
            $backColor={"#007bff"}
            onClick={() => {
              dispatch(changePay("tosspay"));
              dispatch(buyNow({ data: data[0], user: user }));
              navigate("/payment");
            }}
          >
            토스 구매
          </BuyBtn>
          <IconBtn
            href="#"
            $image={cartImg}
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
          />
          <IconBtn
            href="#"
            $image={newfavor.length === 1 ? favorTrue : favorImg}
            onClick={(e) => {
              e.preventDefault();
              dispatch(favorAdd({ data: data[0], user: user }));
            }}
          />
        </PayBox>
      </BottomBox>
    </Container>
  );
}

const Container = styled.div`
  width: 48%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopBox = styled.div`
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Context = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  align-items: end;
  font-size: ${(props) => props.$size};
  color: ${(props) => props.$color};
  font-weight: ${(props) => (props.weight ? "bold" : 400)};
  margin: ${(props) => props.$margin};
`;

const Price = styled.div`
  line-height: 1.2;
  font-size: 30px;
  font-weight: 700;
  padding-top: ${(props) => props.pt};
`;

const TotalContainer = styled.div`
  border: 2px solid #f2f4f7;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Style = styled.div`
  padding: ${(props) => props.$pd};
  margin: ${(props) => props.$margin};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const CouponBtn = styled.button`
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #202429;
  background-color: #202429;
  font-weight: 700;
  color: #fff;
`;

const TotalContext = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-top: 2px;
`;

const LinePlace = styled.div`
  width: 100%;
  height: 1px;
  font-weight: 700;
  background-color: #e9edf3;
`;

const DriveContext = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const BottomBox = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PayBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BuyBtn = styled.a`
  width: calc((100% - 157px) / 2);
  background-color: ${(props) => props.$backColor};
  color: #fff;
  border-radius: 6px;
  padding: 18px 4px;
  text-decoration: none;
  font-size: 17px;
`;

const IconBtn = styled.a`
  width: 62px;
  height: 62px;
  background-image: url(${(props) => props.$image});
  background-size: 60% 60%;
  border: 1px solid #e3e5e8;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-position: 50%;
`;

export default DetailContext;
