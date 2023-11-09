import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import img from "../img/Logo.png";
import searchIcon from "../img/search_icon.png";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { falseLoading, trueLoading } from "../store/loadingSlice";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import basket from "../img/shopping_cart_icon.png";
import favorite from "../img/favorite_heart_like_likes_love_icon.png";
import profile from "../img/profile.png";
import { getData, logout, setUserData } from "../store/userSlice";
import { cartTrue } from "../store/cartSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const user = useSelector((state) => {
    return state.user;
  });
  const cart = useSelector((state) => {
    return state.cart;
  });
  const loading = useSelector((state) => {
    return state.loading;
  });

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        //필요한 데이터만 사용
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        dispatch(setUserData(userData));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleLogout = () => {
    const userConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (userConfirmed) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  const [scroll, setScroll] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}search`, { params: { value: search } })
      .then((res) => {
        dispatch(getData(res.data));
        setSearch("");
        dispatch(falseLoading());
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getSearch();
      navigate("/searchpage");
    }
  };

  const cartCount = cart.user_init.filter((item) => item.email === user.email);
  useEffect(() => {
    dispatch(cartTrue(user.email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.origin, loading]);

  // 내린 스크롤 값을 계산해서 1이상이면 setIsScrolled를 true로 변경
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
      <Container $scroll={scroll}>
        <NavbarContainer $scroll={scroll}>
          <Logo
            onClick={() => {
              navigate("/");
              dispatch(trueLoading());
              setTimeout(() => {
                dispatch(falseLoading());
              }, 500);
            }}
          />
          <SearchBox>
            <Search
              ref={inputRef}
              value={search}
              onChange={(e) => handleSearch(e)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <Box>
              <SearchIcon
                onClick={() => {
                  getSearch();
                  navigate("/searchpage");
                }}
              />
            </Box>
          </SearchBox>
          <IconContainer>
            <IconBox $img={basket} onClick={() => navigate("cart")} />
            <Count onClick={() => navigate("cart")}>{cartCount.length}</Count>
            <IconBox $img={favorite} onClick={() => navigate("favorite")} />
            {user.photoURL ? (
              <IconBox
                $br="20px"
                $img={user.photoURL}
                onClick={handleGoogleLogout}
              />
            ) : (
              <IconBox $img={profile} onClick={handleGoogleLogin} $op="0.4" />
            )}
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

const Count = styled.div`
  color: white;
  width: 20px;
  height: 15px;
  font-size: 10px;
  border-radius: 20px;
  background-color: red;
  margin: 0 0 0 -40px;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  background-color: white;
  position: ${(props) => (props.$scroll === true ? "fixed" : "relative")};
  top: 0;
  z-index: 999;
`;

const NavbarContainer = styled.div`
  max-width: 1220px;
  padding: ${(props) =>
    props.$scroll === true ? "25px 10px;" : "30px 10px 25px 10px;"};
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
  border-radius: ${(props) => props.$br};
  background-size: cover;
  cursor: pointer;
  @media (max-width: 690px) {
    width: 28px;
    height: 28px;
  }
`;

export default Navbar;
