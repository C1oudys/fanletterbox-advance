import React, { useState } from "react";
import LetterList from "../components/LetterList";
import Header from "../components/Header";
import Form from "../components/Form";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addFanLetterAsync } from '../redux/modules/fanLettersSlice';
import { useNavigate } from "react-router-dom";


export default function Home() {
  const fanLetters = useSelector((state) => state.fanLetters.fanLetters);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const hasLettersForArtist = (artist) => {
    return fanLetters.some((letter) => letter.writedTo === artist);
  };

  const handleFanLetterSubmit = (newFanLetter) => {
    dispatch(addFanLetterAsync(newFanLetter));
  };

  const artists = ["all", "유진", "가을", "레이", "원영", "리즈", "이서"];

  const handleLetterClick = (letterId) => {
    navigate(`/detail/${letterId}`);
  };

  return (
    <StContainer>
      <Header setActiveTab={setActiveTab} activeTab={activeTab} artists={artists} />
      <Form onFanLetterSubmit={handleFanLetterSubmit} artists={artists} />
      {activeTab !== "all" && !hasLettersForArtist(activeTab) && (
        <StNoLettersMessage>{`${activeTab}에게 남겨진 팬레터가 없습니다. 첫 팬레터의 주인공이 되주세요!`}</StNoLettersMessage>
      )}
      <LetterList activeTab={activeTab} fanLetters={fanLetters} onLetterClick={handleLetterClick} />
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  background-color: black;
  flex-direction: column;
  align-items: center;
`;

const StNoLettersMessage = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  text-shadow: 0 0 7px #ff66b2, 0 0 10px #ff66b2, 0 0 21px #ff66b2, 0 0 42px #ff66b2,
    0 0 82px #ff66b2, 0 0 92px #ff66b2, 0 0 102px #ff66b2, 0 0 151px #ff66b2;
  color: #fff;
  font-size: 20px;
`;
