import React, { useEffect, useState } from "react";
import { Box, Button, Container, Text } from "./Styled";
import styled from "styled-components";
import { falseLoading, trueLoading } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Qna({ url, value }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [totalPages, setTotalPages] = useState(0);

  const [toggle, setToggle] = useState(false);

  const toggleOpen = () => setToggle(!toggle);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("상품문의");
  const options = ["상품문의", "배송문의", "교환/반품", "취소/변경", "기타"];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const [context, setContext] = useState("");

  const textHandler = (e) => {
    setContext(e.target.value);
  };

  const [secret, setSecret] = useState(false);

  const toggleSecret = () => setSecret(!secret);

  const getItemsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL + url}`,
        {
          params: { value: value },
        }
      );
      setData(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      dispatch(falseLoading());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 페이지 범위를 나타내는 상태 변수
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });

  useEffect(() => {
    setPageRange((prevRange) => ({
      ...prevRange,
      end: totalPages > 5 ? 5 : totalPages,
    }));
  }, [totalPages]);

  // 다음 페이지 범위로 이동하는 함수
  const goToNextPageRange = () => {
    const newStart = Math.max(pageRange.end + 1, totalPages);
    const newEnd = Math.min(newStart + 4, totalPages);
    if (newStart <= totalPages) {
      setPageRange({ start: newStart, end: newEnd });
    }
  };

  // 이전 페이지 범위로 이동하는 함수
  const goToPreviousPageRange = () => {
    const newEnd = pageRange.start - 1;
    const newStart = Math.max(newEnd - 4, 1);
    if (newEnd >= 1) {
      setPageRange({ start: newStart, end: newEnd });
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();

    // getMonth()는 0부터 시작하기 때문에 1을 더해줍니다
    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const replaceName = (str) => {
    // 앞의 3글자를 유지합니다
    let result = str.substring(0, 3);

    // 나머지 글자들을 '*'로 바꿉니다
    for (let i = 3; i < str.length; i++) {
      result += "*";
    }

    return result;
  };

  const qnaData = {
    type: selectedOption,
    context: context,
    date: getFormattedDate(),
    email: user.email,
    state: "답변대기",
    secret: secret,
    id: value,
    username: replaceName(user.email.split("@")[0]),
  };

  const postQna = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/qna/add`, qnaData);
      getData();
    } catch (error) {
      console.error("Error posting QnA:", error);
    }
  };

  useEffect(() => {
    dispatch(trueLoading());
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Container $pd="0">
      <Box $pd="10px 0" $fd="row">
        <Text $s="24px" $fw="700">
          내 Q&A
        </Text>
        {url === "/qna" && (
          <Box $w="auto" $c="pointer" onClick={toggleOpen}>
            <Text $s="18px">문의하기</Text>
          </Box>
        )}
      </Box>
      <Toggle $toggle={toggle}>
        <Box
          $fd="column"
          $bc="#f7f7f7"
          $pd="15px 0"
          $bt="1px solid black"
          $bb="1px solid black"
        >
          <Box $w="97%" $bb="1px solid #e6e6e6" $js="start" $pd="20px 0">
            <Text $w="12%" $s="18px" $ta="left">
              문의유형
            </Text>
            <DropdownContainer>
              <DropdownHeader onClick={toggleDropdown}>
                {selectedOption || "문의유형을 선택해주세요"}
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
          <Box $w="97%" $bb="1px solid #e6e6e6" $js="start" $pd="20px 0">
            <Text $w="12%" $s="18px" $ta="left">
              내용
            </Text>
            <ContextContainer
              placeholder="내용을 입력해주세요"
              value={context}
              onChange={(e) => textHandler(e)}
            />
          </Box>
          <Box $w="97%" $bb="1px solid #e6e6e6" $js="start" $pd="20px 0">
            <Text $w="12%" $s="18px" $ta="left">
              공개여부
            </Text>
            <Box $w="6.5%" onClick={toggleSecret}>
              <CheckboxContainer>
                <HiddenCheckbox $checked={secret} />
                <StyledCheckbox $checked={secret}>
                  <Icon viewBox="0 0 24 24" $checked={secret}>
                    <polyline points="20 6 9 17 4 12" />
                  </Icon>
                </StyledCheckbox>
              </CheckboxContainer>
              <Text>비공개</Text>
            </Box>
          </Box>
          <Box $w="23%" $pd="50px 0">
            <Button
              $w="130px"
              $pd="20px 10px"
              $b="black"
              $s="18px"
              onClick={toggleOpen}
            >
              취소하기
            </Button>
            <Button
              $w="130px"
              $pd="20px 10px"
              $s="18px"
              $c="#fff"
              $bc="black"
              $b="black"
              onClick={() => {
                postQna();
                setSelectedOption("상품문의");
                setContext("");
                setSecret(false);
                alert("문의 등록에 성공했습니다");
                toggleOpen();
              }}
            >
              등록하기
            </Button>
          </Box>
        </Box>
      </Toggle>
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
                  <Td scope="col">{item.username}</Td>
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
  border-top: 1px solid black;
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

const Toggle = styled.div`
  display: ${(props) => (props.$toggle ? "flex" : "none")};
  margin-bottom: 100px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 88%;
  line-height: 2;
  font-size: 13.4px;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  background-color: #fff;
  color: #8d8d8d;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
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
  border: 1px solid #e6e6e6;
  border-bottom: none;
  color: #f5f5f5;
  width: 100%;
  margin-top: -5px;
  z-index: 1;
`;

const DropdownListItem = styled.div`
  padding: 10px 0;
  background-color: #fff;
  color: black;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
    color: #8d8d8d;
  }
`;

const ContextContainer = styled.textarea`
  display: flex;
  padding: 15px;
  width: 88%;
  height: 150px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  outline: none;
  resize: none;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-top: 3px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${(props) => (props.$checked ? "blue" : "lightgray")};
  stroke-width: 3px;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  width: 20px;
  height: 20px;
  background: transparent;
  border: 2px solid ${(props) => (props.$checked ? "blue" : "lightgray")};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export default Qna;
