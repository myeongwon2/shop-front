import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  itemCheck,
  decrease,
  increase,
  remove,
  allCheck,
  cartTrue,
} from "../store/cartSlice";
import { falseLoading } from "../store/loadingSlice";
import styled from "styled-components";
import cartImg from "../img/shopping_cart_icon.png";
import checkA from "../img/13.png";
import checkB from "../img/14.png";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Text } from "../components/Styled";

function Cart() {
  const cart = useSelector((state) => {
    return state.cart;
  });
  const user = useSelector((state) => {
    return state.user;
  });

  const trueCount = cart.user_init.filter((item) => item.check === true).length;
  const navigate = useNavigate();

  const item = [
    { id: 0, title: "상품정보", w: "50%" },
    { id: 1, title: "옵션", w: "28.5%" },
    { id: 2, title: "상품금액", w: "21.5%" },
  ];

  const dispatch = useDispatch();

  const cartCount = cart.user_init.filter((item) => item.email === user.email);

  useEffect(() => {
    dispatch(falseLoading());
    window.scrollTo(0, 0);
  }, [dispatch, cart]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart.user_init) {
      const total = cart.user_init.reduce((accumulator, item) => {
        if (item.check) {
          return accumulator + item.price * item.count;
        }
        return accumulator;
      }, 0);
      setTotalPrice(total);
    }
  }, [cart.user_init]);

  useEffect(() => {
    dispatch(cartTrue(user.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.origin]);

  const noItem = () => {
    return (
      <div>
        <Box $js="center" $pd="130px 0 20px">
          <CartImg $cart={cartImg} />
        </Box>
        <Box $pd="0 0 20px">
          <Text $w="100%" $s="17px">
            장바구니에 상품을 담아 주세요
          </Text>
        </Box>
        <Box
          $js="center"
          $pd="0 0 130px"
          $mg="0 0 150px"
          $bb="1px solid #ebeef2"
        >
          <Button
            $pd="5px 50px"
            $s="20px"
            $lh="2"
            $fw="700"
            onClick={() => navigate("/")}
          >
            쇼핑 하러 가기
          </Button>
        </Box>
      </div>
    );
  };

  const Item = ({ item, onClick }) => (
    <Box $bb="1px solid #ebeef2" key={item.id}>
      <CustomCheckbox
        $checked={item.check}
        onClick={onClick}
        $mg="auto 15px auto 0"
      />
      <Text $w="100px">
        <ItemImg src={item.src} />
      </Text>
      <Text $w="42%" $fw="700" $ta="left" $pd="0 0 0 15px">
        {item.title}
      </Text>
      <BorderText $w="28.5%" $pd="0">
        <CountContainer>
          <CountBtn
            $right={true}
            onClick={() => {
              dispatch(decrease(item.id));
            }}
          >
            -
          </CountBtn>
          <Text $w="33%">{item.count}</Text>
          <CountBtn
            $left={true}
            onClick={() => {
              dispatch(increase(item.id));
            }}
          >
            +
          </CountBtn>
        </CountContainer>
        {(item.count * item.price).toLocaleString()}원
      </BorderText>
      <Text $w="21.5%" $s="18px" $fw="700">
        {(item.count * item.price).toLocaleString()}원
        <Box $js="center" $mg="5px 0 0 0 ">
          <Button
            $pd="8px 20px"
            $c="#fff"
            $bc="#202429"
            onClick={() => {
              dispatch(itemCheck({ type: "주문", id: item.id }));
              navigate("/payment");
            }}
          >
            주문하기
          </Button>
        </Box>
      </Text>
    </Box>
  );

  const yesItem = () => {
    return (
      <Box $fd="column" $mg="0 0 100px">
        {cartCount.map((item) => (
          <Item
            key={item.id}
            item={item}
            onClick={() => {
              dispatch(itemCheck({ id: item.id }));
            }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Container>
      <Box $pd="54px 0 30px">
        <Text $s="32px" $fw="700">
          장바구니
        </Text>
      </Box>
      <Box $pd="20px 0" $bb="2px solid #ebeef2">
        <Box onClick={() => dispatch(allCheck())} $c="pointer" $w="11%">
          <CustomCheckbox
            $checked={trueCount >= 1 && trueCount === cart.user_init.length}
            $mg="0px 5px 0 0 "
          />
          <Text $s="15px" $fw="700" $lh="32px">
            전체선택({trueCount}/{cartCount.length})
          </Text>
        </Box>
        <Button
          $pd="9px 11px 7px;"
          $c="#202429"
          $bc="transparent"
          onClick={() => dispatch(remove())}
        >
          선택 삭제
        </Button>
      </Box>
      <Box $mg="40px 0 0" $bb="1px solid #ebeef2">
        <Box $mg="0 0 20px">
          <Text $s="22px" $fw="700">
            일반 배송
          </Text>
        </Box>
      </Box>
      <Box $pd="15px 0" $bb="1px solid #ebeef2">
        {item.map((item) => (
          <Text key={item.id} $w={item.w} $fw="700">
            {item.title}
          </Text>
        ))}
      </Box>
      {cart.user_init.length >= 1 ? yesItem() : noItem()}
      <Box
        $fd="column"
        $pd="20px"
        $bt="1px solid black"
        $bb="1px solid black"
        $mg="0 0 65px"
      >
        <Text $s="20px" $fw="700">
          총결제금액
        </Text>
        <Text $s="25px" $fw="700" $c="red">
          {totalPrice.toLocaleString()}원
        </Text>
      </Box>
      <Box $js="center" $mg="0 0 100px">
        <Button
          $bc="#ff204b"
          $c="#fff"
          $w="320px"
          $s="25px"
          $pd="21px 0"
          onClick={() => {
            trueCount >= 1
              ? navigate("/payment")
              : alert("한개 이상의 상품을 담아 주세요");
          }}
        >
          구매하기
        </Button>
      </Box>
    </Container>
  );
}

const BorderText = styled(Text)`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 700;
  border-left: 1px solid #ebeef2;
  border-right: 1px solid #ebeef2;
`;

const CustomCheckbox = styled.div`
  width: 25px;
  height: 25px;
  margin: ${(props) => props.$mg || 0};
  background-image: url(${(props) => (props.$checked ? checkB : checkA)});
  background-size: cover;
  background-repeat: no-repeat;
`;

const CartImg = styled.div`
  width: 60px;
  height: 60px;
  opacity: 0.2;
  background-image: url(${(props) => props.$cart});
  background-size: cover;
  background-repeat: no-repeat;
`;

const ItemImg = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.src});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const CountContainer = styled.div`
  width: 100px;
  height: 30px;
  font-weight: 400;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #ebeef2;
  border-radius: 5px;
`;
const CountBtn = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  width: 33%;
  padding: 0 15px;
  height: 30px;
  border-right: ${(props) => props.$right && "1px solid #ebeef2"};
  border-left: ${(props) => props.$left && "1px solid #ebeef2"};
`;

export default Cart;
