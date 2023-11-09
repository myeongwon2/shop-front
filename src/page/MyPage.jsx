import React from "react";
import { Box, Container, Text } from "../components/Styled";
import { useSelector } from "react-redux";

import Qna from "../components/Qna";

function MyPage() {
  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <Container>
      <Box $pd="20px 0" $mg="30px 0 0 0">
        <Text $s="32px" $fw="700">
          마이 페이지
        </Text>
      </Box>
      <Qna url="/myqna" value={user.email} />
    </Container>
  );
}

export default MyPage;
