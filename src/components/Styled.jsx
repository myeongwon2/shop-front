import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 600px;
  flex-direction: column;
  max-width: 1220px;
  height: auto;
  margin: 0 auto;
  padding: 0 10px;
  padding: ${(props) => props.$pd || "0 10px"};
  /* border: 1px solid black; */
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.$w || "100%"};
  flex-direction: ${(props) => props.$fd || "row"};
  justify-content: ${(props) => props.$js || "space-between"};
  padding: ${(props) => props.$pd};
  margin: ${(props) => props.$mg};
  border-bottom: ${(props) => props.$bb};
  border-top: ${(props) => props.$bt};
  background-color: ${(props) => props.$bc};
  cursor: ${(props) => props.$c};
  /* border: 1px solid black; */
`;

export const Text = styled.div`
  font-weight: ${(props) => props.$fw};
  color: ${(props) => props.$c};
  line-height: ${(props) => props.$lh};
  width: ${(props) => props.$w};
  padding: ${(props) => props.$pd};
  font-size: ${(props) => props.$s || "15px"};
  text-align: ${(props) => (props.$ta ? "left" : "center")};
  /* border: 1px solid blue; */
`;

export const Button = styled.button`
  width: ${(props) => props.$w};
  color: ${(props) => props.$c};
  padding: ${(props) => props.$pd};
  font-weight: ${(props) => props.$fw};
  background-color: ${(props) => props.$bc};
  line-height: ${(props) => props.$lh || 1};
  font-size: ${(props) => props.$s || "14px"};
  border: 1px solid ${(props) => props.$b || "#ebeef2"};
  border-radius: 8px;
  cursor: pointer;
`;
