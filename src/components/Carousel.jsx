import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import pauseImg from "../img/pause.png";
import playImg from "../img/player3.png";
import { useDispatch } from "react-redux";
import { falseLoading } from "../store/loadingSlice";

const Carousel = ({ image }) => {
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  //증가
  const increase = useCallback(() => {
    setIndex((prevIndex) => (prevIndex < image.length - 1 ? prevIndex + 1 : 0));
  }, [image.length]);

  //감소
  const decrease = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 4));
  };

  //일시정지
  const toggleSlide = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  //자동 증가
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => increase(), 5000);
    }
    return () => clearInterval(interval);
  }, [increase, isRunning]);

  const [loadedCount, setLoadedCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    image.forEach(({ src }) => {
      const newImage = new Image();
      newImage.onload = () => {
        setLoadedCount((prev) => prev + 1);
      };
      newImage.src = src;
    });
  }, [image]);

  useEffect(() => {
    if (image.length > 4 && loadedCount === image.length) {
      dispatch(falseLoading());
    }
  }, [dispatch, loadedCount, image.length]);

  return (
    <Container>
      {image.length > 4 && loadedCount === image.length && (
        <CarouselBox>
          <Side src={image[(index + 3) % image.length].src}></Side>
          <Side src={image[(index + 4) % image.length].src}></Side>
          <LBtn onClick={() => decrease()}>{"<"}</LBtn>
          <Center src={image[index].src}></Center>
          <RBtn onClick={() => increase()}>{">"}</RBtn>
          <IndexBox>
            <Pause onClick={() => toggleSlide()} $isrunning={isRunning} />
            <IndexCount>
              {index + 1} / {image.length}
            </IndexCount>
          </IndexBox>
          <Side src={image[(index + 1) % image.length].src}></Side>
          <Side src={image[(index + 2) % image.length].src}></Side>
        </CarouselBox>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 100vw;
  height: 500px;
  margin-bottom: 60px;
  overflow: hidden;
  display: flex;
  @media (max-width: 1000px) {
    height: 48vw;
  }
`;

const CarouselBox = styled.div`
  display: flex;
  margin: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BasicBtn = styled.div`
  min-width: 45px;
  height: 45px;
  font-size: 28px;
  background-color: white;
  border: 1px solid white;
  z-index: 20;
  border-radius: 70%;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  @media (max-width: 1070px) {
    display: none;
  }
`;

const LBtn = styled(BasicBtn)`
  box-shadow: 2px 0px 5px 0px gray;
  padding-right: 3px;
  margin: 0px -22.5px 0px -22.5px;
`;
const RBtn = styled(BasicBtn)`
  box-shadow: -2px 0px 5px 0px gray;
  padding-left: 3px;
  margin: 0px -22.5px 0px -22.5px;
`;

const IndexBox = styled.div`
  min-width: 130px;
  height: 38px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 20;
  margin: 425px 10px 0px -140px;
  @media (max-width: 1070px) {
    min-width: 110px;
    margin: 43vw 5px 0px -115px;
  }
`;

const Pause = styled.div`
  width: 38px;
  height: 38px;
  background-image: url(${(props) => (props.$isrunning ? pauseImg : playImg)});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 38px;
  border-radius: 70%;
  cursor: pointer;
  -webkit-text-size-adjust: none;
  @media (max-width: 1070px) {
    width: 26px;
    height: 26px;
  }
`;

const IndexCount = styled.div`
  min-width: auto;
  padding: 7px 22px 10px;
  border-radius: 30px;
  font-size: 15px;
  color: #202429;
  background-color: rgba(32, 36, 41, 0.8);
  color: #fff;
  -webkit-text-size-adjust: none;
  text-align: center;
  word-break: keep-all;
  @media (max-width: 1070px) {
    height: 26px;
    padding: 2px 18px;
    font-size: 13px;
  }
`;

const Center = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Side = styled.img`
  max-width: 100%;
  max-height: 100%;
  filter: brightness(50%);
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export default Carousel;
