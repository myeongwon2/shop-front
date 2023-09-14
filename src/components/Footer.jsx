import React from "react";
import { styled } from "styled-components";

function Footer() {
  return (
    <Container>
      <Box>
        <div>프론트엔드 신입 취준생의 포트폴리오 입니다.</div>
        <div>부족하지만 방문해주셔서 감사합니다.</div>
      </Box>
      <Box>
        <div>
          <span style={{ fontWeight: "bold" }}>이메일</span> : dnfroge@naver.com
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>전화번호</span> : 010-9204-3326
        </div>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: rgba(242, 244, 247, 0.6);
`;

const Box = styled.div`
  width: auto;
  height: 100px;
  margin: auto;
  border-bottom: 1px solid #ebeef2;
  border-top: 1px solid #ebeef2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Footer;
