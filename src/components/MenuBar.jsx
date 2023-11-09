import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Box } from "./Styled";
import Qna from "./Qna";

function MenuBar({ src, id }) {
  const [value, setValue] = useState(0);
  const [scroll, setScroll] = useState(false);

  const itemRef = useRef();
  const reviewRef = useRef();
  const qnaRef = useRef();

  const item = [
    { id: 0, title: "상품정보", ref: itemRef },
    { id: 1, title: "리뷰", ref: reviewRef },
    { id: 2, title: "Q&A", ref: qnaRef },
  ];

  const changeValue = (item) => {
    setValue(item.id);
  };
  const scrollToItem = (ref) => {
    ref.current.scrollIntoView();
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 2800) {
        setValue(0);
      } else if (scrollY < 3100) {
        setValue(1);
      } else {
        setValue(2);
      }

      const isScrolled = scrollY > 835;
      if (isScrolled !== scroll) {
        setScroll(isScrolled);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scroll]);

  return (
    <Container>
      {scroll && <Dummy $w={"70px"} />}
      <TableStyle $scroll={scroll}>
        <Table>
          {item.map((item) => (
            <Menu
              key={item.id}
              onClick={() => {
                changeValue(item);
                scrollToItem(item.ref);
              }}
              $value={value}
              $id={item.id}
              href="#"
            >
              {item.title}
            </Menu>
          ))}
        </Table>
      </TableStyle>
      <ContextBox $scroll={scroll} ref={itemRef}>
        <ImageBox src={src} />
      </ContextBox>
      <Dummy $w={"160px"} ref={reviewRef} />
      <ContextBox>
        <Box $bb="1px solid black">
          <Title>리뷰</Title>
        </Box>
        <TextInput>
          <Context>리뷰를 작성해 주세요</Context>
        </TextInput>
        <div style={{ maxWidth: "1220px", borderBottom: "1px solid #e5e5e5" }}>
          <div
            style={{
              padding: "80px 0 80px 0",
              fontSize: "22px",
              color: "#c5c5c5",
            }}
          >
            등록된 리뷰가 없습니다.
          </div>
        </div>
      </ContextBox>
      <Dummy $w={"150px"} />
      <ContextBox ref={qnaRef}>
        <Qna url="/qna" value={id} />
      </ContextBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Dummy = styled.div`
  height: ${(props) => props.$w};
  visibility: hidden;
`;

const TableStyle = styled.div`
  width: 100%;
  background-color: #fff;
  position: ${(props) => (props.$scroll ? "fixed" : "relative")};
  top: 90px;
  margin: 0 auto;
  z-index: 1000;
`;

const Table = styled.div`
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  display: table;
`;

const Menu = styled.div`
  display: table-cell;
  width: 33%;
  height: 68px;
  vertical-align: middle;
  font-size: 20px;
  text-decoration: none;
  font-weight: ${(props) => (props.$id === props.$value ? "bold" : 400)};
  border-bottom: ${(props) =>
    props.$id === props.$value ? "4px solid black" : "4px solid #f2f2f2;"};
`;

const ImageBox = styled.div`
  max-width: 1220px;
  width: 100%;
  height: 1800px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  margin-top: 160px;
`;

const ContextBox = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  padding: 0 10px;
  max-width: 1220px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 26px;
  padding: 0 0 10px;
  font-weight: 500;
`;

const TextInput = styled.div`
  max-width: 1220px;
  width: 100%;
  margin: 30px auto 0 auto;
  padding: 30px 40px;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
`;

const Context = styled.div`
  font-size: 26px;
  text-align: left;
  color: #9a9a9e;
`;

export default MenuBar;
