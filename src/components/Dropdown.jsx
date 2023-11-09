import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const CategotyArray = [
  { id: 0, type: "홈", url: "" },
  { id: 1, type: "베스트", url: "bestpage" },
  { id: 2, type: "신상", url: "newpage" },
  { id: 3, type: "마이페이지", url: "mypage" },
];

function Dropdown() {
  const navigate = useNavigate();
  const location = useLocation();

  const [borderId, setBorderId] = useState(0);
  useEffect(() => {
    if (location.pathname === "/bestpage") {
      setBorderId(1);
    } else if (location.pathname === "/newpage") {
      setBorderId(2);
    } else if (location.pathname.length === 1) {
      setBorderId(0);
    } else {
      setBorderId(4);
    }
  }, [location]);

  return (
    <Container>
      <DropDownBar>
        {CategotyArray.map((item, i) => (
          <div key={i}>
            <NavigateBtn
              key={item.id}
              id={item.id}
              $borderId={borderId}
              onClick={() => {
                navigate(`/${item.url}`);
                setBorderId(item.id);
              }}
            >
              {item.type}
            </NavigateBtn>
          </div>
        ))}
      </DropDownBar>
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid #ebeef2;
  width: 100%;
`;

const DropDownBar = styled.div`
  max-width: 1200px;
  height: 43px;
  padding: 5px 10px;
  font-weight: 1000;
  font-size: 18px;
  justify-content: space-between;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

const NavigateBtn = styled.div`
  height: 37px;
  min-width: 25px;
  cursor: ${(props) => (props.id !== 1 ? "pointer" : null)};
  border-bottom: ${(props) =>
    props.id === props.$borderId ? "3px solid black" : null};
`;

export default Dropdown;
