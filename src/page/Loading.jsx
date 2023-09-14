import React from "react";
import { styled } from "styled-components";
import Spinner from "../img/Spinner.gif";
function LoadingPage() {
  <Background>
    <LoadingText>잠시만 기다려 주세요.</LoadingText>
    <img src={Spinner} alt="로딩중" width="15%" />
  </Background>;
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #c4bfbfb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
`;

const LoadingText = styled.div`
  text-align: center;
`;

export default LoadingPage;
