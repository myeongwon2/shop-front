import React, { useEffect, useState } from "react";
import { Box, Container, Text } from "./Styled";
import styled from "styled-components";
import { falseLoading, trueLoading } from "../store/loadingSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function Qna({ url, value }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [totalPages, setTotalPages] = useState(0);

  const getItemsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API + url}`, { params: { value: value } })
      .then((res) => {
        setData(res.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        dispatch(falseLoading());
      });
  };

  // 페이지 범위를 나타내는 상태 변수
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });

  useEffect(() => {
    dispatch(trueLoading());
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPageRange((prevRange) => ({
      ...prevRange,
      end: totalPages > 5 ? 5 : totalPages,
    }));
  }, [totalPages]);

  // 다음 페이지 범위로 이동하는 함수
  const goToNextPageRange = () => {
    const newStart = Math.max(pageRange.end + 1, totalPages); // 현재 범위 다음의 첫 페이지
    const newEnd = Math.min(newStart + 4, totalPages); // 새 범위의 마지막 페이지는 totalPages를 넘지 않음
    if (newStart <= totalPages) {
      setPageRange({ start: newStart, end: newEnd });
    }
  };

  const goToPreviousPageRange = () => {
    const newEnd = pageRange.start - 1; // 현재 범위 이전의 마지막 페이지
    const newStart = Math.max(newEnd - 4, 1); // 새 범위의 시작 페이지는 1보다 작아질 수 없음
    if (newEnd >= 1) {
      setPageRange({ start: newStart, end: newEnd });
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = pageRange.start; i <= pageRange.end; i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination>
        <PageButton onClick={goToPreviousPageRange}>{"<"}</PageButton>
        {pageNumbers.map((pageNumber) => (
          <PageNumber
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            $active={currentPage === pageNumber}
          >
            {pageNumber}
          </PageNumber>
        ))}
        <PageButton onClick={goToNextPageRange}>{">"}</PageButton>
      </Pagination>
    );
  };
  return (
    <Container>
      <Box $pd="15px 0" $bb="1px solid black" $fd="row">
        <Text $s="24px" $fw="700">
          내 Q&A
        </Text>
        {url === "/qna" && (
          <Box $w="auto" $c="pointer">
            <Text $s="18px">문의하기</Text>
          </Box>
        )}
      </Box>
      <Box>안녕</Box>
      <Box>
        <QnaHead>
          <ColGroup>
            <Col style={{ width: "164px" }} />
            <Col style={{ width: "162px" }} />
            <Col />
            <Col style={{ width: "162px" }} />
            <Col style={{ width: "200px" }} />
          </ColGroup>
          <div style={{ display: "table-header-group" }}>
            <div style={{ display: "table-row" }}>
              <Td scope="col">분류</Td>
              <Td scope="col">처리상태</Td>
              <Td scope="col">내용</Td>
              <Td scope="col">작성자</Td>
              <Td scope="col">작성일</Td>
            </div>
          </div>
          {data.length >= 1 ? (
            getItemsForPage().map((item) => (
              <div key={item._id} style={{ display: "table-header-group" }}>
                <div style={{ display: "table-row" }}>
                  <Td scope="col">{item.type}</Td>
                  <Td scope="col">{item.state}</Td>
                  <Td scope="col">
                    {item.secret ? "비밀글 입니다" : item.context}
                  </Td>
                  <Td scope="col">{item.auth}</Td>
                  <Td scope="col">{item.date}</Td>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                maxWidth: "1200px",
                width: "94vw",
              }}
            >
              <div
                style={{
                  padding: "80px 0 80px 0",
                  fontSize: "22px",
                  color: "#c5c5c5",
                }}
              >
                등록된 상품문의가 없습니다.
              </div>
            </div>
          )}
        </QnaHead>
      </Box>
      <Box>{totalPages > 0 && renderPagination()}</Box>
    </Container>
  );
}

const QnaHead = styled.div`
  display: table;
  max-width: 1220px;
  width: 100%;
  table-layout: fixed;
  margin: 0 auto;
  border-bottom: 1px solid #e1e1e1;
`;
const ColGroup = styled.div`
  display: table-column-group;
`;

const Col = styled.div`
  display: table-column;
`;

const Td = styled.div`
  display: table-cell;
  padding: 20px 36px;
  font-size: 16px;
  border-bottom: 1px solid #e1e1e1;
`;

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  /* border: 1px solid black; */
`;

const PageNumber = styled.div`
  cursor: pointer;
  margin: 0 5px;
  border: 1px solid #ebeef2;
  padding: 10px 17px;
  color: ${(props) => (props.$active ? "black" : "#b8c5c5")};
`;

const PageButton = styled.div`
  cursor: pointer;
  margin: 10px 5px;
  color: black;
`;

export default Qna;
