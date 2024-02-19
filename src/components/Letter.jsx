import React from "react";
import styled from "styled-components";

const Letter = ({ letter }) => {
  return (
    <StLetterContainer key={letter.id}>
      <StAvatarImage src={letter.avatar} alt="Avatar" />
      <StLetterTextContainer>
        <StNickname>{letter.nickname}</StNickname>
        <StCreatedAt>{letter.createdAt}</StCreatedAt>
        <StContent>
          {letter.content.length > 50
            ? `${letter.content.slice(0, 50)}...`
            : letter.content}
        </StContent>
      </StLetterTextContainer>
    </StLetterContainer>
  );
};

const StLetterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #b22222;
  border-radius: 3%;
  width: 450px;
  height: 230px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px 5px rgba(239, 105, 203, 0.8); /* 호버시 테두리에 빛이 나오도록 설정 */
  }
`;

const StAvatarImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%; 
  margin-bottom: 8px;
`;

const StLetterTextContainer = styled.div`
  flex: 1; 
`;

const StNickname = styled.p`
  font-weight: bold;
  color: #f5f5f5;
  margin-bottom: 10px;
  font-size: 20px;
`;

const StCreatedAt = styled.p`
  color: #e6e6fa; 
  margin-bottom: 5px; 
  font-size: 18px;
  margin-bottom: 20px;
`;

const StContent = styled.p`
  margin: 0; 
  padding: 10px;
  width: 40 0px;
  height: 45px;
  color: 	#fffaf0;
  background-color: #ff4500;
  line-height: 1.4;
  font-size: 18px;
`;

export default Letter;
