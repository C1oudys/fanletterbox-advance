import React, { useState } from "react";
import styled from "styled-components";
import defaultAvatar from "../assets/defaultavatar.png";
import { useDispatch } from "react-redux";
import { addFanLetter } from "../redux/modules/fanLetters";
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const AddForm = styled.form`
  display: flex;
  width: 500px;
  height: 350px;
  flex-direction: column;
  align-items: center;
  background-color:#dc143c;
  border-radius: 3%;
`;

const Input = styled.input`
  background-color: #f08080;
  margin: 10px;
  width: 200px;
  height: 40px;
  color: #fffaf0;;
  font-weight: bold;
  &::placeholder {
    color: #fffaf0;
    font-size: 14px;
    font-weight: bold; 
  }
`;

const TextArea = styled.textarea`
  background-color: #f08080;
  margin: 10px;
  width: 450px;
  height: 300px;
  color: #fffaf0;;
  font-weight: bold;
  &::placeholder {
    color: #fffaf0;;
    font-size: 15px;
    font-weight: bold; 
  }
`;

const Select = styled.select`
  background-color: #f08080;
  margin: 10px;
  padding: 5px;
  width: 150px;
  height: 40px;
  color: #fffaf0;;
  font-weight: bold;
`;

const Option = styled.option``;

const SubmitButton = styled.button`
  background-color: #f08080;
  border: none;
  width: 80px;
  height: 40px;
  margin: 10px;
  color: #fffaf0;;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:#800000; /* 호버 시 배경색 변경 */
  } 
`;

const RemainingCharacters = styled.span`
  color: #fffaf0;;
`;


// 아티스트 목록
const artists = ["all", "유진", "가을", "레이", "원영", "리즈", "이서"];

const Form = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // 입력 유효성 검사
    if (!nickname || !content || selectedArtist === "") {
      alert("닉네임, 내용, 멤버를 선택하세요.");
      return;
    }

    // 입력 내용 제한
    const trimmedNickname = nickname.slice(0, 20); // 20자 제한
    const trimmedContent = content.slice(0, 200); // 200자 제한

    // 새로운 팬 레터 객체 생성
    const newFanLetter = {
      id: uuidv4(), 
      avatar: defaultAvatar, // 기본 아바타 이미지 사용
      nickname: trimmedNickname,
      content: trimmedContent,
      createdAt: new Date().toLocaleString("ko"), // 현재 날짜 및 시간
      writedTo: selectedArtist,
    };

    dispatch(addFanLetter(newFanLetter));

    // 입력값 초기화
    setNickname("");
    setContent("");
    setSelectedArtist("");

    // 팬레터 등록 완료 알림
    alert("등록 완료되었습니다.");
  };

  // 남은 글자 수 계산 함수
  const calculateRemainingCharacters = (currentLength, maxLength) => {
    return maxLength - currentLength
  };

  return (
    <FormContainer>
      <AddForm onSubmit={handleFormSubmit}>
        <Input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
        />
         <RemainingCharacters>
          남은 글자 수: {calculateRemainingCharacters(nickname.length, 20)}
        </RemainingCharacters>
        <TextArea
          placeholder="팬레터 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={200}
        />
         <RemainingCharacters>
          남은 글자 수: {calculateRemainingCharacters(content.length, 200)}
        </RemainingCharacters>
        <Select
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
        >
          <Option value="">멤버를 선택해주세요</Option>
          {artists.map((artist) => (
            <Option key={artist} value={artist}>
              {artist}
            </Option>
          ))}
        </Select>
        <SubmitButton type="submit">등록하기</SubmitButton>
      </AddForm>
    </FormContainer>
  );
};

export default Form;
