import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PayRadio from "../components/PayRadio";
import { onClickPayment } from "../components/Payment";
import { useNavigate } from "react-router-dom";

function PayMentPage() {
  const navigate = useNavigate();

  const guideline = [
    { id: 0, title: "상품명", w: "50%" },
    { id: 1, title: "쿠폰적용", w: "28.5%" },
    { id: 2, title: "상품금액", w: "21.5%" },
  ];

  const cart = useSelector((state) => {
    return state.cart;
  });

  const payment = useSelector((state) => {
    return state.payment;
  });

  const total = cart.user_init.reduce((accumulator, item) => {
    if (item.check) {
      return accumulator + item.price * item.count;
    }
    return accumulator;
  }, 0);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    "배송시 요청사항을 선택해주세요",
    "문 앞에 놓아 주세요",
    "택배함에 넣어 주세요",
    "직접 수령 하겠습니다",
    "경비실에 맡겨 주세요",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const Title = ({ text }) => {
    return (
      <Box $bb="1px solid black">
        <Text $s="28px" $lh="2">
          {text}
        </Text>
      </Box>
    );
  };

  useEffect(() => {
    if (cart.user_init.length === 0) {
      navigate("/");
    }
  }, [cart.user_init, navigate]);

  return (
    <Container>
      {/* 주문상품 정보 */}
      <Box $fd="column">
        <Box $js="center" $mg="70px 0">
          <Text $s="30px">주문하기</Text>
        </Box>
        <Title text="주문상품 정보" />
        <Box
          $mg="30px 0 0 0"
          $pd="25px 0"
          $bb="1px solid #ebeef2"
          $bt="1px solid #ebeef2"
        >
          {guideline.map((item) => (
            <Text key={item.title} $w={item.w}>
              {item.title}
            </Text>
          ))}
        </Box>
        <Box $fd="column" $mg="0 0 30px 0">
          {cart.user_init.map(
            (item) =>
              item.check === true && (
                <Box $pd="14px 0" key={item.id} $bb="1px solid #ebeef2">
                  <ItemImg src={item.src} />
                  <Text $w="41.8%" $ta="left" $pd="0 20px">
                    {item.title}
                  </Text>
                  <Text $w="28.5%">적용 가능한 쿠폰이 없습니다</Text>
                  <Text $w="21.5%" $fw="700">
                    {(item.price * item.count).toLocaleString()}원
                  </Text>
                </Box>
              )
          )}
        </Box>
        <Box $bt="1px solid black" $pd="20px 0" $mg="0 0 50px 0">
          <Text />
          <Box $w="99%" $js="end">
            <Text $s="26px" $fw="700" $pd="0 5px">
              총 주문금액
            </Text>
            <Text $s="26px" $fw="700" $c="red">
              {total.toLocaleString()}원
            </Text>
          </Box>
        </Box>
      </Box>
      {/* 상품 정보 */}
      <Box $fd="column">
        <Title text="주문자 정보" />
        <Box $bb="1px solid #ebeef2" $pd="15px 10px">
          <Text $fw="700">이름</Text>
          <InputBox $w="80%" defaultValue="test" />
        </Box>
        <Box $bb="1px solid #ebeef2" $pd="15px 10px">
          <Text $fw="700">휴대폰</Text>
          <Box $w="80%" $js="start">
            <InputBox $w="8%" $mg="0 5px 0 0" $ta="center" defaultValue="010" />
            -
            <InputBox
              $w="8%"
              $mg="0 5px 0 5px"
              $ta="center"
              defaultValue="1234"
            />
            -
            <InputBox
              $w="8%"
              $mg="0 0 0 5px"
              $ta="center"
              defaultValue="5678"
            />
          </Box>
        </Box>
        <Box $bb="1px solid black" $pd="15px 10px" $mg="0 0 100px 0">
          <Text $fw="700">이메일</Text>
          <InputBox $w="80%" defaultValue="test@test.com" />
        </Box>
      </Box>
      {/* 배송지 정보 */}
      <Box $fd="column">
        <Title text="배송지 정보" />
        <Box $bb="1px solid #ebeef2" $pd="15px 10px">
          <Text $fw="700">수령인</Text>
          <InputBox $w="80%" defaultValue="test" />
        </Box>
        <Box $bb="1px solid #ebeef2" $pd="15px 10px">
          <Text $fw="700">휴대폰</Text>
          <Box $w="80%" $js="start">
            <InputBox $w="8%" $mg="0 5px 0 0" $ta="center" defaultValue="010" />
            -
            <InputBox
              $w="8%"
              $mg="0 5px 0 5px"
              $ta="center"
              defaultValue="1234"
            />
            -
            <InputBox
              $w="8%"
              $mg="0 0 0 5px"
              $ta="center"
              defaultValue="5678"
            />
          </Box>
        </Box>
        <Box $bb="1px solid #ebeef2" $pd="15px 10px">
          <Text $fw="700">배송지 정보</Text>
          <Box $w="80%" $fd="column" $ai="flex-start">
            <InputBox $w="49.4%" $mg="0 0 5px 0" defaultValue="test" />
            <Box>
              <InputBox $w="49.4%" $mg="0 0 5px 0" defaultValue="test" />
              <InputBox $w="49.4%" $mg="0 0 5px 0" defaultValue="test" />
            </Box>
          </Box>
        </Box>
        <Box $bb="1px solid black" $pd="15px 10px" $mg="0 0 100px 0">
          <Text $fw="700">배송메모</Text>
          <Box $w="80%" $fd="column" $ai="flex-start">
            <DropdownContainer>
              <DropdownHeader onClick={toggleDropdown}>
                {selectedOption || "배송시 요청사항을 선택해주세요"}
                <Arrow $isOpen={isOpen}>&#9660;</Arrow>
              </DropdownHeader>
              {isOpen && (
                <DropdownList>
                  {options.map((option) => (
                    <DropdownListItem
                      onClick={onOptionClicked(option)}
                      key={option}
                    >
                      {option}
                    </DropdownListItem>
                  ))}
                </DropdownList>
              )}
            </DropdownContainer>
          </Box>
        </Box>
      </Box>
      {/* 최종 결제 금액 */}
      <Box $fd="column">
        <Title text="최종 결제 금액" />
        <Box $fd="column" $bb="1px solid black" $pd="20px 0" $mg="0 0 70px 0">
          <Box $pd="15px 10px">
            <Text>총 상품금액</Text>
            <Text>{total.toLocaleString()}원</Text>
          </Box>
          <Box $pd="15px 10px">
            <Text>총 배송비</Text>
            <Text>0원</Text>
          </Box>
          <Box $pd="15px 10px">
            <Text>총 할인금액</Text>
            <Text>0원</Text>
          </Box>
          <Box $pd="15px 10px">
            <Text $s="25px" $fw="700">
              결제 금액
            </Text>
            <Text $c="red" $s="25px" $fw="700">
              {total.toLocaleString()}원
            </Text>
          </Box>
        </Box>
      </Box>
      {/* 결제 수단 */}
      <Box $fd="column">
        <Title text="결제 수단" />
        <PayRadio />
      </Box>
      <Box $js="center" $mg="0 0 100px 0">
        <Button
          onClick={() => {
            onClickPayment(payment);
          }}
        >
          결제하기
        </Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1220px;
  height: auto;
  margin: 0 auto;
  padding: 0 10px;
  /* border: 1px solid black; */
`;

const Box = styled.div`
  display: flex;
  align-items: ${(props) => props.$ai || "center"};
  width: ${(props) => props.$w || "100%"};
  flex-direction: ${(props) => props.$fd || "row"};
  justify-content: ${(props) => props.$js || "space-between"};
  padding: ${(props) => props.$pd};
  margin: ${(props) => props.$mg};
  border-bottom: ${(props) => props.$bb};
  border-top: ${(props) => props.$bt};
  cursor: ${(props) => props.$c};
  /* border: 1px solid black; */
`;

const InputBox = styled.input`
  width: ${(props) => props.$w};
  padding: 0 9px;
  margin: ${(props) => props.$mg};
  height: 40px;
  background-color: #f5f5f5;
  color: #8d8d8d;
  outline: none;
  text-align: ${(props) => props.$ta};
  border: 1px solid #f5f5f5;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 30%;
  font-size: 13.4px;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  color: #8d8d8d;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.span`
  margin-left: 10px;
  ${(props) => props.$isOpen && `transform: rotate(180deg);`}
`;

const DropdownList = styled.div`
  position: absolute;
  background-color: #8d8d8d;
  border: 1px solid #f5f5f5;
  color: #f5f5f5;
  width: 100%;
  z-index: 1;
`;

const DropdownListItem = styled.div`
  padding: 10px 0;
  background-color: #fff;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    color: #8d8d8d;
  }
`;

const Text = styled.div`
  font-weight: ${(props) => props.$fw};
  color: ${(props) => props.$c};
  line-height: ${(props) => props.$lh};
  width: ${(props) => props.$w};
  padding: ${(props) => props.$pd};
  font-size: ${(props) => props.$s || "15px"};
  text-align: ${(props) => (props.$ta ? "left" : "center")};
  /* border: 1px solid blue; */
`;

const ItemImg = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.src});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Button = styled.button`
  background-color: #ff204b;
  color: #fff;
  width: 320px;
  font-size: 25px;
  padding: 21px 0;
  cursor: pointer;
  line-height: 1;
  border: 1px solid #ebeef2;
  border-radius: 8px;
`;

export default PayMentPage;
