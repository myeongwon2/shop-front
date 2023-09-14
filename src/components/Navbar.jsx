import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import img from "../img/Logo.png";
import searchIcon from "../img/search_icon.png";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { IconArray } from "../data";
import axios from "axios";

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = async () => {
    await axios
      .get("/search", { params: { value: search } })
      .then((res) => console.log(res.data));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getSearch();
    }
  };

  const handleIconClick = useCallback(
    (url) => {
      navigate(`/${url}`);
    },
    [navigate]
  );

  //내린 스크롤 값을 계산해서 10이상이면 setIsScrolled를 true로 변경
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 1;
      if (isScrolled !== scroll) {
        setScroll(isScrolled);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scroll]);

  return (
    <div>
      {scroll && <Dummy />}
      <Container $scroll={scroll.toString()}>
        <NavbarContainer $scroll={scroll.toString()}>
          <Logo onClick={() => navigate("/")} />
          <SearchBox>
            <Search
              onChange={(e) => handleSearch(e)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <Box>
              <SearchIcon onClick={() => getSearch()} />
            </Box>
          </SearchBox>
          <IconContainer>
            {IconArray.map((item) => (
              <IconBox
                key={item.id}
                $img={item.icon}
                onClick={() => handleIconClick(item.url)}
              />
            ))}
          </IconContainer>
        </NavbarContainer>
        {!scroll && <Dropdown />}
      </Container>
    </div>
  );
}

const Dummy = styled.div`
  height: 135px;
  visibility: hidden;
`;

const Container = styled.div`
  width: 100%;
  background-color: white;
  position: ${(props) => (props.$scroll === "true" ? "fixed" : "relative")};
  box-shadow: ${(props) =>
    props.$scroll === "true" ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : null};
  top: 0;
  z-index: 999;
`;

const NavbarContainer = styled.div`
  max-width: 1220px;
  padding: ${(props) =>
    props.$scroll === "true" ? "15px 5px;" : "30px 5px 20px 5px;"};
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const Logo = styled.img.attrs({
  src: `${img}`,
})`
  min-width: 150px;
  height: 25px;
  margin-top: 7px;
  cursor: pointer;
  // 드래그 막는 방법
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  @media (max-width: 690px) {
    min-width: 120px;
    height: 20px;
    margin-left: 10px;
  }
`;

const SearchBox = styled.div`
  width: 710px;
  display: flex;
  padding-right: 20px;
  justify-content: end;
  flex-direction: row;
`;

const Search = styled.input`
  min-width: 250px;
  height: 40px;
  /* min-width: 304px; */
  font-size: 18px;
  outline: none;
  border: none;
  border-bottom: 2px solid black;
  @media (max-width: 690px) {
    display: none;
  }
`;

const Box = styled.div`
  width: 40px;
  height: 40px;
  border-bottom: 2px solid black;
  @media (max-width: 690px) {
    border: none;
  }
`;

const SearchIcon = styled.img.attrs({
  src: `${searchIcon}`,
})`
  width: 32px;
  height: 32px;
  cursor: pointer;
  -webkit-user-drag: none;
  @media (max-width: 690px) {
    width: 30px;
    height: 30px;
  }
`;

const IconContainer = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 690px) {
    min-width: 120px;
  }
`;

const IconBox = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${props.$img})`,
  },
}))`
  width: 35px;
  height: 35px;
  background-size: cover;
  cursor: pointer;
  @media (max-width: 690px) {
    width: 28px;
    height: 28px;
  }
`;

export default Navbar;
