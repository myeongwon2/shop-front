import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changePay } from "../store/payment";

const PayRadio = () => {
  const payment = useSelector((state) => {
    return state.payment;
  });

  const dispatch = useDispatch();

  const RadioInput = ({ label, value, checked, onChange }) => (
    <RadioLabel>
      <HiddenRadio value={value} checked={checked} onChange={onChange} />
      <StyledRadio checked={checked} />
      <RadioText>{label}</RadioText>
    </RadioLabel>
  );

  return (
    <RadioContainer>
      <RadioInput
        label="빠른 페이"
        value="kcp"
        checked={payment === "kcp"}
        onChange={() => dispatch(changePay("kcp"))}
      />
      <RadioInput
        label="토스 페이"
        value="tosspay"
        checked={payment === "tosspay"}
        onChange={() => dispatch(changePay("tosspay"))}
      />
    </RadioContainer>
  );
};

const RadioContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 100px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;

  border-bottom: 1px solid #ebeef2;
  cursor: pointer;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
`;

const StyledRadio = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 20px 0;
  background-color: ${(props) => (props.checked ? "#4f80ff" : "#e4e4e4")};
  position: relative;
`;

const RadioText = styled.span`
  margin-left: 10px;
  line-height: 2;
`;

export default PayRadio;
