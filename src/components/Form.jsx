import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultAvatar from "../assets/defaultavatar.png";
import { useDispatch } from "react-redux";
import { addFanLetterAsync } from '../redux/modules/fanLettersSlice';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";

const artists = ["all", "유진", "가을", "레이", "원영", "리즈", "이서"];

const Form = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  
  // localStorage에서 닉네임 가져오기
  const [nickname, setNickname] = useState(localStorage.getItem('nickname') || "");

  useEffect(() => {
    const handleStorageChange = () => {
      const storedNickname = localStorage.getItem('nickname');
      if (storedNickname) {
        setNickname(storedNickname);
      }
    };
  
    // localStorage 변경사항을 감지하기 위한 이벤트 리스너 추가
    window.addEventListener('storage', handleStorageChange);
  
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!content || selectedArtist === "") {
      alert("내용, 멤버를 선택하세요.");
      return;
    }

    const trimmedContent = content.slice(0, 200); // 200자 제한
    const newFanLetter = {
      id: uuidv4(),
      avatar: defaultAvatar,
      nickname,
      content: trimmedContent,
      createdAt: new Date().toLocaleString("ko"),
      writedTo: selectedArtist,
      userId: userId,
    };

    dispatch(addFanLetterAsync(newFanLetter));
    setContent("");
    setSelectedArtist("");
    alert("등록 완료되었습니다.");
  };

  const calculateRemainingCharacters = (currentLength, maxLength) => {
    return maxLength - currentLength;
  };

  return (
    <StFormContainer>
      <StAddForm onSubmit={handleFormSubmit}>
        <StLoggedInUser>닉네임: {nickname}</StLoggedInUser>
        <StTextArea
          placeholder="팬레터 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={200}
        />
        <StRemainingCharacters>
          남은 글자 수: {calculateRemainingCharacters(content.length, 200)}
        </StRemainingCharacters>
        <StSelect
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
        >
          <StOption value="">멤버를 선택해주세요</StOption>
          {artists.map((artist) => (
            <StOption key={artist} value={artist}>{artist}</StOption>
          ))}
        </StSelect>
        <StSubmitButton type="submit">등록하기</StSubmitButton>
      </StAddForm>
    </StFormContainer>
  );
};

const StFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const StAddForm = styled.form`
  display: flex;
  width: 500px;
  height: auto; 
  flex-direction: column;
  align-items: center;
  background-color: #dc143c;
  border-radius: 3%;
  padding: 20px; 
`;

const StTextArea = styled.textarea`
  background-color: #f08080;
  margin: 10px;
  width: 450px;
  height: 150px;
  color: #fffaf0;
  font-weight: bold;
  &::placeholder {
    color: #fffaf0;
    font-size: 15px;
    font-weight: bold; 
  }
`;

const StSelect = styled.select`
  background-color: #f08080;
  margin: 10px;
  padding: 5px;
  width: 220px; 
  height: 30px;
  color: #fffaf0;
  font-weight: bold;
`;

const StOption = styled.option``;

const StSubmitButton = styled.button`
  background-color: #f08080;
  border: none;
  width: 80px; 
  height: 30px;
  margin: 10px;
  border-radius: 5px;
  color: #fffaf0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #800000; // Adjusted for a subtle hover effect
  } 
`;

const StRemainingCharacters = styled.span`
  color: #fffaf0;
`;

const StLoggedInUser = styled.div`
  color: #fffaf0;
  margin-bottom: 10px; // Added margin for spacing
`;

export default Form;
