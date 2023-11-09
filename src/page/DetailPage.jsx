import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import DetailContext from "../components/DetailContext";
import MenuBar from "../components/MenuBar";

function DetailPage() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/best/detail`,
        {
          params: { value: id },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <TopBox>
        {data[0] && (
          <>
            <TopImageBox src={data[0].src} />
            <DetailContext data={data} />
          </>
        )}
      </TopBox>
      {data[0] && <MenuBar src={data[0].src} id={data[0].id} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopBox = styled.div`
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
  padding: 70px 10px 0 10px;
  height: 700px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TopImageBox = styled.div`
  width: 48%;
  max-height: 100%;
  height: 48vw;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export default DetailPage;
